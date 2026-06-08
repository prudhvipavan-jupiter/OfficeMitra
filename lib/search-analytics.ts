import fs from "fs";
import path from "path";
import { ensureSchema, getSql, isDatabaseEnabled } from "./db/client";

const logFile = path.join(process.cwd(), "data", "search-queries.json");

export async function logSearchQuery(query: string, resultCount: number): Promise<void> {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return;

  const entry = { query: q, resultCount, at: new Date().toISOString() };

  if (isDatabaseEnabled()) {
    try {
      await ensureSchema();
      const sql = getSql();
      await sql`
        INSERT INTO search_queries (query, result_count, searched_at)
        VALUES (${q}, ${resultCount}, NOW())
      `;
    } catch (e) {
      console.error("[SearchAnalytics] DB log failed:", e);
    }
    return;
  }

  const dir = path.dirname(logFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const existing = fs.existsSync(logFile)
    ? (JSON.parse(fs.readFileSync(logFile, "utf-8")) as typeof entry[])
    : [];
  existing.unshift(entry);
  fs.writeFileSync(logFile, JSON.stringify(existing.slice(0, 500), null, 2));
}
