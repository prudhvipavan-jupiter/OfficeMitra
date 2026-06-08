import type { IntelSource } from "./types";
import { pageContentHash } from "./fingerprint";

export interface DetectedItem {
  title: string;
  url: string;
  published_date?: string | null;
}

const USER_AGENT =
  "OfficeMitra-Intelligence/1.0 (+https://officemitra.vercel.app; AP gov metadata monitor)";

export async function fetchPage(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xhtml+xml" },
    signal: AbortSignal.timeout(25_000),
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function sameDomain(a: string, b: string): boolean {
  try {
    const na = new URL(a).hostname.replace(/^www\./, "");
    const nb = new URL(b).hostname.replace(/^www\./, "");
    return na === nb;
  } catch {
    return false;
  }
}

function isDocumentLink(url: string): boolean {
  return /\.(pdf|doc|docx)$/i.test(url);
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function parseHtmlLinks(
  html: string,
  baseUrl: string,
  selector: string,
  config: Record<string, unknown>
): DetectedItem[] {
  const pattern = String(config.link_pattern ?? "");
  const regex = pattern ? new RegExp(pattern, "i") : null;
  const maxItems = Number(config.max_items ?? 25);
  const seen = new Set<string>();
  const items: DetectedItem[] = [];

  const linkRe = /<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;

  while ((match = linkRe.exec(html)) !== null) {
    const href = match[1].trim();
    const title = stripTags(match[2]);
    if (!href || !title || title.length < 8) continue;

    let fullUrl: string;
    try {
      fullUrl = new URL(href, baseUrl).href;
    } catch {
      continue;
    }

    if (seen.has(fullUrl)) continue;
    if (!sameDomain(baseUrl, fullUrl) && !isDocumentLink(fullUrl)) continue;
    if (regex && !regex.test(fullUrl) && !regex.test(title)) continue;

    seen.add(fullUrl);
    items.push({ title: title.slice(0, 500), url: fullUrl });
    if (items.length >= maxItems) break;
  }

  return items;
}

export function parseRssItems(xml: string, config: Record<string, unknown>): DetectedItem[] {
  const maxItems = Number(config.max_items ?? 25);
  const items: DetectedItem[] = [];
  const itemRe = /<item[\s\S]*?<\/item>/gi;
  let block: RegExpExecArray | null;

  while ((block = itemRe.exec(xml)) !== null && items.length < maxItems) {
    const chunk = block[0];
    const title = chunk.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
    const link = chunk.match(/<link[^>]*>([\s\S]*?)<\/link>/i)?.[1]?.trim();
    const pub = chunk.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i)?.[1]?.trim();
    if (!title || !link) continue;
    items.push({
      title: stripTags(title).slice(0, 500),
      url: link.trim(),
      published_date: pub ? pub.slice(0, 10) : null,
    });
  }

  return items;
}

export async function checkIntelSource(source: IntelSource): Promise<DetectedItem[]> {
  const config = source.config ?? {};
  const method = source.check_method ?? "html_links";
  const pageUrl = source.feed_url ?? source.url;

  if (method === "rss" && source.feed_url) {
    const xml = await fetchPage(source.feed_url);
    return parseRssItems(xml, config);
  }

  const html = await fetchPage(pageUrl);

  if (method === "page_hash") {
    const hash = pageContentHash(html);
    const prev = String(config.last_page_hash ?? "");
    if (prev && prev === hash) return [];
    return [
      {
        title: `Content update detected — ${source.name}`,
        url: source.url,
      },
    ];
  }

  return parseHtmlLinks(html, source.url, source.link_selector ?? "a[href]", config);
}

export function getPageHashFromHtml(html: string): string {
  return pageContentHash(html);
}
