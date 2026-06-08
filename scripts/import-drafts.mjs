#!/usr/bin/env node
/**
 * Import draft articles from content/articles into CMS (Postgres or local data/cms/).
 * Usage: node scripts/import-drafts.mjs [--publish]
 * Default: status draft. --publish sets published (not recommended for review workflow).
 */
import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { randomUUID } from "crypto";

const publish = process.argv.includes("--publish");
const cmsDir = path.join(process.cwd(), "data", "cms");
const storePath = path.join(cmsDir, "records.json");
const contentDir = path.join(process.cwd(), "content", "articles");

function ensureLocalDirs() {
  fs.mkdirSync(cmsDir, { recursive: true });
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
    return existing[0].id;
  }
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
  return record.id;
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

async function upsert(record) {
  const url = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
  if (url) return upsertDb(record);
  upsertLocal(record);
}

async function main() {
  const files = readMarkdownDir(contentDir);
  if (files.length === 0) {
    console.error("No articles found. Run: node scripts/generate-hero-articles.mjs");
    process.exit(1);
  }

  let draft = 0;
  let published = 0;

  for (const { data, content } of files) {
    const status = publish ? "published" : (data.status ?? "draft");
    await upsert({
      id: randomUUID(),
      content_type: "article",
      slug: String(data.slug ?? ""),
      status,
      data,
      body: content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    if (status === "draft") draft += 1;
    else published += 1;
  }

  const mode = process.env.POSTGRES_URL ?? process.env.DATABASE_URL ? "postgres" : "local";
  console.log(`Imported ${files.length} articles (${draft} draft, ${published} published) via ${mode}.`);
  console.log("Review at /admin/content/article — change status to Published when approved.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
