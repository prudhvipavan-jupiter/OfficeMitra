import fs from "fs";
import path from "path";
import { ensureSchema, getSql, isDatabaseEnabled } from "./client";

export interface ArticleFeedbackCounts {
  helpful: number;
  not_helpful: number;
}

const dataFile = path.join(process.cwd(), "data", "article-feedback.json");

function readJsonStore(): Record<string, ArticleFeedbackCounts> {
  if (!fs.existsSync(dataFile)) return {};
  return JSON.parse(fs.readFileSync(dataFile, "utf-8")) as Record<
    string,
    ArticleFeedbackCounts
  >;
}

function writeJsonStore(store: Record<string, ArticleFeedbackCounts>) {
  const dataDir = path.dirname(dataFile);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(dataFile, JSON.stringify(store, null, 2), "utf-8");
}

export async function getArticleFeedback(
  slug: string
): Promise<ArticleFeedbackCounts> {
  if (isDatabaseEnabled()) {
    await ensureSchema();
    const sql = getSql();
    const rows = await sql`
      SELECT helpful, not_helpful FROM article_feedback WHERE slug = ${slug} LIMIT 1
    `;
    const row = rows[0];
    if (!row) return { helpful: 0, not_helpful: 0 };
    return {
      helpful: Number(row.helpful),
      not_helpful: Number(row.not_helpful),
    };
  }

  const store = readJsonStore();
  return store[slug] ?? { helpful: 0, not_helpful: 0 };
}

export async function recordArticleFeedback(
  slug: string,
  helpful: boolean
): Promise<ArticleFeedbackCounts> {
  if (isDatabaseEnabled()) {
    await ensureSchema();
    const sql = getSql();
    const rows = helpful
      ? await sql`
          INSERT INTO article_feedback (slug, helpful, not_helpful)
          VALUES (${slug}, 1, 0)
          ON CONFLICT (slug) DO UPDATE SET helpful = article_feedback.helpful + 1
          RETURNING helpful, not_helpful
        `
      : await sql`
          INSERT INTO article_feedback (slug, helpful, not_helpful)
          VALUES (${slug}, 0, 1)
          ON CONFLICT (slug) DO UPDATE SET not_helpful = article_feedback.not_helpful + 1
          RETURNING helpful, not_helpful
        `;
    const row = rows[0];
    return {
      helpful: Number(row.helpful),
      not_helpful: Number(row.not_helpful),
    };
  }

  const store = readJsonStore();
  const current = store[slug] ?? { helpful: 0, not_helpful: 0 };
  if (helpful) current.helpful += 1;
  else current.not_helpful += 1;
  store[slug] = current;
  writeJsonStore(store);
  return current;
}
