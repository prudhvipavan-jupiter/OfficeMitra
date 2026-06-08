import fs from "fs";
import path from "path";
import type { ArticleCategory } from "@/lib/categories";
import { ensureSchema, getSql, isDatabaseEnabled } from "./client";

export type DiscussionStatus = "pending" | "published" | "closed" | "resolved";

export interface DiscussionReply {
  id: string;
  author: string;
  body: string;
  created_at: string;
  is_official: boolean;
}

export interface DiscussionRecord {
  id: string;
  created_at: string;
  status: DiscussionStatus;
  author_name: string;
  designation: string;
  institution: string;
  category: ArticleCategory | "general";
  title: string;
  body: string;
  replies: DiscussionReply[];
  views: number;
}

const dataFile = path.join(process.cwd(), "data", "discussions.json");

function readJsonStore(): DiscussionRecord[] {
  const dataDir = path.dirname(dataFile);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, "[]", "utf-8");
  }
  return JSON.parse(fs.readFileSync(dataFile, "utf-8")) as DiscussionRecord[];
}

function writeJsonStore(records: DiscussionRecord[]) {
  const dataDir = path.dirname(dataFile);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(dataFile, JSON.stringify(records, null, 2), "utf-8");
}

function rowToRecord(row: Record<string, unknown>): DiscussionRecord {
  const replies =
    typeof row.replies === "string"
      ? (JSON.parse(row.replies) as DiscussionReply[])
      : (row.replies as DiscussionReply[]) ?? [];

  return {
    id: String(row.id),
    created_at: new Date(row.created_at as string | Date).toISOString(),
    status: row.status as DiscussionStatus,
    author_name: String(row.author_name),
    designation: String(row.designation),
    institution: String(row.institution),
    category: row.category as DiscussionRecord["category"],
    title: String(row.title),
    body: String(row.body),
    replies,
    views: Number(row.views ?? 0),
  };
}

export async function createDiscussion(
  data: Omit<
    DiscussionRecord,
    "id" | "created_at" | "status" | "replies" | "views"
  >
): Promise<DiscussionRecord> {
  const id = crypto.randomUUID();
  const created_at = new Date().toISOString();

  if (isDatabaseEnabled()) {
    await ensureSchema();
    const sql = getSql();
    await sql`
      INSERT INTO discussions (
        id, created_at, status, author_name, designation, institution,
        category, title, body, replies, views
      ) VALUES (
        ${id}, ${created_at}::timestamptz, 'pending',
        ${data.author_name}, ${data.designation}, ${data.institution},
        ${data.category}, ${data.title}, ${data.body}, '[]'::jsonb, 0
      )
    `;
    return {
      id,
      created_at,
      status: "pending",
      replies: [],
      views: 0,
      ...data,
    };
  }

  const records = readJsonStore();
  const record: DiscussionRecord = {
    id,
    created_at,
    status: "pending",
    replies: [],
    views: 0,
    ...data,
  };
  records.unshift(record);
  writeJsonStore(records);
  return record;
}

export async function getDiscussions(filter?: {
  status?: DiscussionStatus;
  category?: string;
}): Promise<DiscussionRecord[]> {
  if (isDatabaseEnabled()) {
    await ensureSchema();
    const sql = getSql();

    const rows =
      filter?.status && filter?.category
        ? await sql`
            SELECT * FROM discussions
            WHERE status = ${filter.status} AND category = ${filter.category}
            ORDER BY created_at DESC
          `
        : filter?.status
          ? await sql`
              SELECT * FROM discussions
              WHERE status = ${filter.status}
              ORDER BY created_at DESC
            `
          : filter?.category
            ? await sql`
                SELECT * FROM discussions
                WHERE category = ${filter.category}
                ORDER BY created_at DESC
              `
            : await sql`SELECT * FROM discussions ORDER BY created_at DESC`;

    return rows.map((row) => rowToRecord(row as Record<string, unknown>));
  }

  let records = readJsonStore();
  if (filter?.status) records = records.filter((r) => r.status === filter.status);
  if (filter?.category)
    records = records.filter((r) => r.category === filter.category);
  return records.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getDiscussionById(
  id: string
): Promise<DiscussionRecord | undefined> {
  if (isDatabaseEnabled()) {
    await ensureSchema();
    const sql = getSql();
    const rows = await sql`SELECT * FROM discussions WHERE id = ${id} LIMIT 1`;
    const row = rows[0];
    return row ? rowToRecord(row as Record<string, unknown>) : undefined;
  }
  return readJsonStore().find((r) => r.id === id);
}

export async function incrementDiscussionViews(id: string): Promise<void> {
  if (isDatabaseEnabled()) {
    await ensureSchema();
    const sql = getSql();
    await sql`UPDATE discussions SET views = views + 1 WHERE id = ${id}`;
    return;
  }

  const records = readJsonStore();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return;
  records[idx].views += 1;
  writeJsonStore(records);
}

export async function updateDiscussion(
  id: string,
  updates: Partial<
    Pick<DiscussionRecord, "status" | "replies"> & {
      add_reply?: Omit<DiscussionReply, "id" | "created_at">;
    }
  >
): Promise<DiscussionRecord | undefined> {
  const current = await getDiscussionById(id);
  if (!current) return undefined;

  let replies = current.replies;
  if (updates.add_reply) {
    replies = [
      ...replies,
      {
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        ...updates.add_reply,
      },
    ];
  } else if (updates.replies) {
    replies = updates.replies;
  }

  const status = updates.status ?? current.status;

  if (isDatabaseEnabled()) {
    await ensureSchema();
    const sql = getSql();
    const rows = await sql`
      UPDATE discussions SET
        status = ${status},
        replies = ${JSON.stringify(replies)}::jsonb
      WHERE id = ${id}
      RETURNING *
    `;
    const row = rows[0];
    return row ? rowToRecord(row as Record<string, unknown>) : undefined;
  }

  const records = readJsonStore();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return undefined;

  records[idx] = { ...current, status, replies };
  writeJsonStore(records);
  return records[idx];
}
