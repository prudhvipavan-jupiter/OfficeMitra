import fs from "fs";
import path from "path";
import { ensureSchema, getSql, isDatabaseEnabled } from "./db/client";

const logFile = path.join(process.cwd(), "data", "admin-activity.json");

export interface AdminActivityEntry {
  action: string;
  detail: Record<string, string>;
  at: string;
}

export async function logAdminAction(
  action: string,
  detail: Record<string, string>
): Promise<void> {
  const entry: AdminActivityEntry = {
    action,
    detail,
    at: new Date().toISOString(),
  };

  if (isDatabaseEnabled()) {
    try {
      await ensureSchema();
      const sql = getSql();
      await sql`
        INSERT INTO admin_activity (action, detail, created_at)
        VALUES (${action}, ${JSON.stringify(detail)}::jsonb, NOW())
      `;
    } catch (e) {
      console.error("[AdminLog] DB log failed:", e);
    }
    return;
  }

  const dir = path.dirname(logFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const existing = fs.existsSync(logFile)
    ? (JSON.parse(fs.readFileSync(logFile, "utf-8")) as AdminActivityEntry[])
    : [];
  existing.unshift(entry);
  fs.writeFileSync(logFile, JSON.stringify(existing.slice(0, 200), null, 2));
}

export async function getAdminActivityLog(limit = 30): Promise<AdminActivityEntry[]> {
  if (isDatabaseEnabled()) {
    try {
      await ensureSchema();
      const sql = getSql();
      const rows = await sql`
        SELECT action, detail, created_at
        FROM admin_activity
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
      return rows.map((row) => ({
        action: row.action as string,
        detail: (row.detail ?? {}) as Record<string, string>,
        at: new Date(row.created_at as string).toISOString(),
      }));
    } catch (e) {
      console.error("[AdminLog] DB read failed:", e);
    }
  }

  if (!fs.existsSync(logFile)) return [];
  const entries = JSON.parse(fs.readFileSync(logFile, "utf-8")) as AdminActivityEntry[];
  return entries.slice(0, limit);
}
