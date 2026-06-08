import type { NeonQueryFunction } from "@neondatabase/serverless";

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
] as const;

export async function seedIntelSourcesIfEmpty(
  sql: NeonQueryFunction<false, false>
): Promise<void> {
  const rows = await sql`SELECT COUNT(*)::int AS c FROM intel_sources`;
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
