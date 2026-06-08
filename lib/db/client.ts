import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let sql: NeonQueryFunction<false, false> | null = null;
let schemaReady: Promise<void> | null = null;

export function isDatabaseEnabled(): boolean {
  return !!(process.env.POSTGRES_URL ?? process.env.DATABASE_URL);
}

let warnedMissingDb = false;

export function warnIfMissingDatabaseInProduction(): void {
  if (warnedMissingDb || isDatabaseEnabled() || process.env.NODE_ENV !== "production") {
    return;
  }
  warnedMissingDb = true;
  console.error(
    "[OfficeMitra] POSTGRES_URL is not set — expert requests, community posts, and feedback will NOT persist on Vercel."
  );
}

function getConnectionString(): string {
  const url = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
  if (!url) throw new Error("Database URL not configured");
  return url;
}

export function getSql(): NeonQueryFunction<false, false> {
  if (!sql) sql = neon(getConnectionString());
  return sql;
}

export async function ensureSchema(): Promise<void> {
  if (!isDatabaseEnabled()) return;
  if (!schemaReady) {
    schemaReady = runMigrations();
  }
  await schemaReady;
}

async function runMigrations() {
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS expert_requests (
      id TEXT PRIMARY KEY,
      reference_number TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      status TEXT NOT NULL DEFAULT 'pending',
      name TEXT NOT NULL,
      designation TEXT NOT NULL,
      institution TEXT NOT NULL,
      department TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      service_type TEXT NOT NULL,
      case_summary TEXT NOT NULL,
      related_article_slug TEXT,
      response_notes TEXT,
      responded_at TIMESTAMPTZ
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS discussions (
      id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      status TEXT NOT NULL DEFAULT 'pending',
      author_name TEXT NOT NULL,
      designation TEXT NOT NULL,
      institution TEXT NOT NULL,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      replies JSONB NOT NULL DEFAULT '[]'::jsonb,
      views INTEGER NOT NULL DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS article_feedback (
      slug TEXT PRIMARY KEY,
      helpful INTEGER NOT NULL DEFAULT 0,
      not_helpful INTEGER NOT NULL DEFAULT 0
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_expert_requests_ref ON expert_requests(reference_number)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_discussions_status ON discussions(status, created_at DESC)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS search_queries (
      id SERIAL PRIMARY KEY,
      query TEXT NOT NULL,
      result_count INTEGER NOT NULL DEFAULT 0,
      searched_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS digest_subscribers (
      email TEXT PRIMARY KEY,
      subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS admin_activity (
      id SERIAL PRIMARY KEY,
      action TEXT NOT NULL,
      detail JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS cms_content (
      id TEXT PRIMARY KEY,
      content_type TEXT NOT NULL,
      slug TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      data JSONB NOT NULL DEFAULT '{}'::jsonb,
      body TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS cms_files (
      id TEXT PRIMARY KEY,
      content_id TEXT NOT NULL,
      field TEXT NOT NULL,
      filename TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size INTEGER NOT NULL DEFAULT 0,
      data_base64 TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_cms_content_type ON cms_content(content_type, status, updated_at DESC)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS intel_sources (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      category TEXT NOT NULL,
      active BOOLEAN NOT NULL DEFAULT true,
      check_method TEXT NOT NULL DEFAULT 'html_links',
      feed_url TEXT,
      link_selector TEXT,
      config JSONB NOT NULL DEFAULT '{}'::jsonb,
      last_checked TIMESTAMPTZ,
      last_update_found TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS intel_detected_updates (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      source_id UUID NOT NULL REFERENCES intel_sources(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      source_url TEXT NOT NULL,
      published_date DATE,
      fingerprint TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'NEW',
      detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      ai_title TEXT,
      ai_summary TEXT,
      ai_what_changed TEXT,
      ai_who_affected TEXT,
      ai_action_required TEXT,
      ai_reference_source TEXT,
      ai_department_impact TEXT,
      ai_keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
      ai_body TEXT,
      admin_notes TEXT,
      reviewed_at TIMESTAMPTZ,
      reviewed_by TEXT,
      published_at TIMESTAMPTZ,
      published_slug TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS intel_monitoring_runs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      finished_at TIMESTAMPTZ,
      status TEXT NOT NULL DEFAULT 'running',
      sources_checked INTEGER NOT NULL DEFAULT 0,
      items_found INTEGER NOT NULL DEFAULT 0,
      drafts_generated INTEGER NOT NULL DEFAULT 0,
      error_message TEXT,
      details JSONB NOT NULL DEFAULT '{}'::jsonb
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS intel_activity_log (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_type TEXT NOT NULL,
      message TEXT NOT NULL,
      metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_intel_sources_active ON intel_sources(active)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_intel_updates_status ON intel_detected_updates(status, detected_at DESC)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_intel_runs_started ON intel_monitoring_runs(started_at DESC)
  `;

  const { seedIntelSourcesIfEmpty } = await import("./seed-intel-sources");
  await seedIntelSourcesIfEmpty(sql);

  const { seedDiscussionsIfEmpty } = await import("./seed-discussions");
  await seedDiscussionsIfEmpty(sql);
}
