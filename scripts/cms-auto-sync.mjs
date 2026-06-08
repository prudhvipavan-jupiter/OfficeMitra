/**
 * Manual CMS sync from git files (uses POSTGRES_URL or local data/cms/).
 * Usage: npm run cms:sync [-- --force]
 */
import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { randomUUID } from "crypto";

const force = process.argv.includes("--force");
const cmsDir = path.join(process.cwd(), "data", "cms");
const storePath = path.join(cmsDir, "records.json");
const filesDir = path.join(cmsDir, "files");
const filesMetaPath = path.join(cmsDir, "files.json");

function ensureLocalDirs() {
  fs.mkdirSync(cmsDir, { recursive: true });
  fs.mkdirSync(filesDir, { recursive: true });
}

function readLocalRecords() {
  ensureLocalDirs();
  if (!fs.existsSync(storePath)) return [];
  return JSON.parse(fs.readFileSync(storePath, "utf-8"));
}

function writeLocalRecords(records) {
  ensureLocalDirs();
  fs.writeFileSync(storePath, JSON.stringify(records, null, 2));
}

function upsertLocal(record) {
  const records = readLocalRecords();
  const idx = records.findIndex(
    (r) => r.content_type === record.content_type && r.slug === record.slug
  );
  if (idx >= 0) {
    records[idx] = { ...records[idx], ...record, updated_at: new Date().toISOString() };
  } else {
    records.push(record);
  }
  writeLocalRecords(records);
}

async function upsertDb(record) {
  const url = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
  if (!url) throw new Error("POSTGRES_URL not set");
  const sql = neon(url);
  const existing = await sql`
    SELECT id FROM cms_content
    WHERE content_type = ${record.content_type} AND slug = ${record.slug}
    LIMIT 1
  `;
  if (existing[0]) {
    await sql`
      UPDATE cms_content SET
        status = ${record.status},
        data = ${JSON.stringify(record.data)}::jsonb,
        body = ${record.body},
        updated_at = NOW()
      WHERE id = ${existing[0].id}
    `;
  } else {
    await sql`
      INSERT INTO cms_content (id, content_type, slug, status, data, body, created_at, updated_at)
      VALUES (
        ${record.id},
        ${record.content_type},
        ${record.slug},
        ${record.status},
        ${JSON.stringify(record.data)}::jsonb,
        ${record.body},
        NOW(),
        NOW()
      )
    `;
  }
}

async function upsert(record) {
  const url = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
  if (url) return upsertDb(record);
  upsertLocal(record);
}

function readMarkdownDir(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".md")) {
        const raw = fs.readFileSync(full, "utf-8");
        const { data, content } = matter(raw);
        out.push({ data, content });
      }
    }
  }
  walk(dir);
  return out;
}

const contentDir = path.join(process.cwd(), "content");

async function main() {
  if (force && !(process.env.POSTGRES_URL ?? process.env.DATABASE_URL)) {
    writeLocalRecords([]);
  }

  let count = 0;
  for (const { data, content } of readMarkdownDir(path.join(contentDir, "articles"))) {
    await upsert({
      id: randomUUID(),
      content_type: "article",
      slug: String(data.slug ?? ""),
      status: data.status ?? "published",
      data,
      body: content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    count += 1;
  }

  console.log(`CMS sync complete (${count} articles synced).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
