/**
 * Initialize Postgres tables for OfficeMitra.
 * Run: npm run db:setup
 * Requires POSTGRES_URL or DATABASE_URL in environment.
 */
import { neon } from "@neondatabase/serverless";

const url = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
if (!url) {
  console.error("Set POSTGRES_URL or DATABASE_URL before running db:setup");
  process.exit(1);
}

const sql = neon(url);

async function main() {
  console.log("Creating tables...");

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

  console.log("Database ready.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
