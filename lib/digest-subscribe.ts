import fs from "fs";
import path from "path";
import { ensureSchema, getSql, isDatabaseEnabled } from "./db/client";

const dataFile = path.join(process.cwd(), "data", "digest-subscribers.json");

export async function subscribeToDigest(email: string): Promise<{ ok: boolean; error?: string }> {
  const normalized = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return { ok: false, error: "invalid_email" };
  }

  if (isDatabaseEnabled()) {
    await ensureSchema();
    const sql = getSql();
    const existing = await sql`
      SELECT email FROM digest_subscribers WHERE email = ${normalized} LIMIT 1
    `;
    if (existing.length > 0) return { ok: true };

    await sql`
      INSERT INTO digest_subscribers (email, subscribed_at)
      VALUES (${normalized}, NOW())
    `;
    return { ok: true };
  }

  const dir = path.dirname(dataFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const list = fs.existsSync(dataFile)
    ? (JSON.parse(fs.readFileSync(dataFile, "utf-8")) as string[])
    : [];
  if (!list.includes(normalized)) {
    list.push(normalized);
    fs.writeFileSync(dataFile, JSON.stringify(list, null, 2));
  }
  return { ok: true };
}
