interface SeedReply {
  id: string;
  author: string;
  body: string;
  created_at: string;
  is_official: boolean;
}

export const seedDiscussions = [
  {
    id: "seed-discussion-001",
    created_at: "2026-05-15T10:00:00.000Z",
    status: "published" as const,
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
        body: "Yes — probation can be declared after completion date with documented reasons in proceedings. Verify all ACRs for the probation period, confirm no disciplinary cases, cite appointment order and completion date, and route through Head of Office. See our Probation Declaration procedure for checklist.",
        created_at: "2026-05-16T09:00:00.000Z",
        is_official: true,
      },
    ] satisfies SeedReply[],
    views: 42,
  },
  {
    id: "seed-discussion-002",
    created_at: "2026-05-20T08:30:00.000Z",
    status: "published" as const,
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
        body: "Check APGLI policy statement on the official portal first. Short premium periods typically need regularization before loan eligibility. Prepare a note with EOL period, recovery details, and current premium status. Verify applicable APGLI GOs before sanctioning.",
        created_at: "2026-05-21T10:00:00.000Z",
        is_official: true,
      },
    ] satisfies SeedReply[],
    views: 28,
  },
];

export async function seedDiscussionsIfEmpty(
  sql: ReturnType<typeof import("./client").getSql>
) {
  const rows = await sql`SELECT COUNT(*)::int AS count FROM discussions`;
  const count = rows[0]?.count ?? 0;
  if (count > 0) return;

  for (const d of seedDiscussions) {
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
