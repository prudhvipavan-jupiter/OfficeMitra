import { createHash } from "crypto";

export function makeFingerprint(sourceId: string, url: string, title: string): string {
  const raw = `${sourceId}|${url.trim().toLowerCase()}|${title.trim().toLowerCase()}`;
  return createHash("sha256").update(raw).digest("hex");
}

export function pageContentHash(html: string): string {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 8000);
  return createHash("sha256").update(text).digest("hex");
}
