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

  const { seedDiscussionsIfEmpty } = await import("./seed-discussions");
  await seedDiscussionsIfEmpty(sql);
}
