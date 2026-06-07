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

  const countRows = await sql`SELECT COUNT(*)::int AS count FROM discussions`;
  if ((countRows[0]?.count ?? 0) === 0) {
    console.log("Seeding sample discussions...");
    const seeds = [
      {
        id: "seed-discussion-001",
        created_at: "2026-05-15T10:00:00.000Z",
        status: "published",
        author_name: "R. Kumar",
        designation: "Senior Assistant",
        institution: "District Hospital, Guntur",
        category: "establishment",
        title: "Probation declaration delayed by 6 months — how to proceed?",
        body: "Employee joined in Jan 2023, 24-month probation completed Jan 2025. Declaration was delayed due to pending ACR. ACRs are now complete. Can we declare probation now with proceedings explaining delay?",
        replies: [
          {
            id: "reply-001",
            author: "OfficeMitra Moderator",
            body: "Yes — probation can be declared after completion date with documented reasons in proceedings. Verify all ACRs for the probation period, confirm no disciplinary cases, cite appointment order and completion date, and route through Head of Office.",
            created_at: "2026-05-16T09:00:00.000Z",
            is_official: true,
          },
        ],
        views: 42,
      },
      {
        id: "seed-discussion-002",
        created_at: "2026-05-20T08:30:00.000Z",
        status: "published",
        author_name: "S. Lakshmi",
        designation: "Junior Assistant",
        institution: "Area Hospital, Vijayawada",
        category: "finance",
        title: "APGLI loan — premium short payment for 3 months",
        body: "Employee had APGLI premium short deduction for 3 months due to EOL. Now wants loan. Should we wait for regularization or can loan be processed with explanation?",
        replies: [
          {
            id: "reply-002",
            author: "OfficeMitra Moderator",
            body: "Check APGLI policy statement on the official portal first. Short premium periods typically need regularization before loan eligibility.",
            created_at: "2026-05-21T10:00:00.000Z",
            is_official: true,
          },
        ],
        views: 28,
      },
    ];

    for (const d of seeds) {
      await sql`
        INSERT INTO discussions (
          id, created_at, status, author_name, designation, institution,
          category, title, body, replies, views
        ) VALUES (
          ${d.id},
          ${d.created_at}::timestamptz,
          ${d.status},
          ${d.author_name},
          ${d.designation},
          ${d.institution},
          ${d.category},
          ${d.title},
          ${d.body},
          ${JSON.stringify(d.replies)}::jsonb,
          ${d.views}
        )
        ON CONFLICT (id) DO NOTHING
      `;
    }
  }

  console.log("Database ready.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
