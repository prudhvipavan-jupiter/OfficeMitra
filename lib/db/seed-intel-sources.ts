import type { NeonQueryFunction } from "@neondatabase/serverless";

const EDITORIAL_SOURCE = {
  id: "00000000-0000-4000-8000-000000000001",
  name: "OfficeMitra Editorial Briefings",
  url: "https://officemitra.vercel.app",
  category: "OfficeMitra",
  check_method: "html_links" as const,
  link_selector: null,
  config: { internal: true },
  active: false,
};

const DEFAULT_INTEL_SOURCES = [
  {
    name: "GOIR — Government Orders Repository",
    url: "https://goir.ap.gov.in/",
    category: "Andhra Pradesh Government",
    check_method: "html_links",
    link_selector: "a[href]",
    config: { link_pattern: "goir|order|g.o|go-", max_items: 25 },
  },
  {
    name: "AP Health Department",
    url: "https://health.ap.gov.in/",
    category: "Health Department",
    check_method: "html_links",
    link_selector: "a[href]",
    config: { link_pattern: "circular|notification|order|proceedings", max_items: 20 },
  },
  {
    name: "AP Finance Department",
    url: "https://finance.ap.gov.in/",
    category: "Finance Department",
    check_method: "html_links",
    link_selector: "a[href]",
    config: { link_pattern: "circular|notification|order|budget|treasury", max_items: 20 },
  },
  {
    name: "APPSC — Recruitment",
    url: "https://psc.ap.gov.in/",
    category: "APPSC",
    check_method: "html_links",
    link_selector: "a[href]",
    config: { link_pattern: "notification|recruit|exam|syllabus", max_items: 20 },
  },
  {
    name: "APMSIDC",
    url: "https://apmsidc.ap.gov.in/",
    category: "APMSIDC",
    check_method: "page_hash",
    link_selector: null,
    config: {},
  },
  {
    name: "AP Treasury",
    url: "https://treasury.ap.gov.in/",
    category: "Treasury",
    check_method: "html_links",
    link_selector: "a[href]",
    config: { link_pattern: "circular|notification|order|cfms", max_items: 20 },
  },
  {
    name: "General Administration Department",
    url: "https://gad.ap.gov.in/",
    category: "General Administration Department",
    check_method: "html_links",
    link_selector: "a[href]",
    config: { link_pattern: "circular|notification|order|service", max_items: 20 },
  },
  {
    name: "APGLI Portal",
    url: "https://www.apgli.ap.gov.in/",
    category: "APGLI",
    check_method: "html_links",
    link_selector: "a[href]",
    config: { link_pattern: "circular|notification|order|premium|loan", max_items: 20 },
  },
  {
    name: "CFMS Portal",
    url: "https://cfms.ap.gov.in/",
    category: "Finance Department",
    check_method: "html_links",
    link_selector: "a[href]",
    config: { link_pattern: "circular|notification|order|bill|help", max_items: 20 },
  },
] as const;

/** Ensures editorial briefing source exists (required for daily auto-fill). */
export async function ensureEditorialIntelSource(
  sql: NeonQueryFunction<false, false>
): Promise<void> {
  const existing = await sql`
    SELECT 1 FROM intel_sources WHERE id = ${EDITORIAL_SOURCE.id} LIMIT 1
  `;
  if (existing[0]) return;

  await sql`
    INSERT INTO intel_sources (id, name, url, category, active, check_method, feed_url, link_selector, config)
    VALUES (
      ${EDITORIAL_SOURCE.id},
      ${EDITORIAL_SOURCE.name},
      ${EDITORIAL_SOURCE.url},
      ${EDITORIAL_SOURCE.category},
      ${EDITORIAL_SOURCE.active},
      ${EDITORIAL_SOURCE.check_method},
      NULL,
      ${EDITORIAL_SOURCE.link_selector},
      ${JSON.stringify(EDITORIAL_SOURCE.config)}::jsonb
    )
  `;
}

export async function seedIntelSourcesIfEmpty(
  sql: NeonQueryFunction<false, false>
): Promise<void> {
  await ensureEditorialIntelSource(sql);

  const rows = await sql`
    SELECT COUNT(*)::int AS c FROM intel_sources
    WHERE id <> ${EDITORIAL_SOURCE.id}
  `;
  if (Number(rows[0]?.c ?? 0) > 0) return;

  for (const source of DEFAULT_INTEL_SOURCES) {
    await sql`
      INSERT INTO intel_sources (name, url, category, check_method, feed_url, link_selector, config)
      VALUES (
        ${source.name},
        ${source.url},
        ${source.category},
        ${source.check_method},
        NULL,
        ${source.link_selector},
        ${JSON.stringify(source.config)}::jsonb
      )
    `;
  }
}
