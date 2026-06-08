#!/usr/bin/env node
/**
 * Generate 50 draft articles + hero SVG images from content pipeline topics.
 * Run: node scripts/generate-hero-articles.mjs
 * Then: node scripts/import-drafts.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { allTopics } from "./content-pipeline/topics/all-topics.mjs";
import { buildArticleMarkdown, buildHeroSvg } from "./content-pipeline/builder.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const scrapedPath = path.join(root, "scripts/content-pipeline/scraped/sources.json");

function loadScrapedNotes() {
  if (!fs.existsSync(scrapedPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(scrapedPath, "utf-8"));
  } catch {
    return {};
  }
}

function scrapedSummaryForTopic(topic, scraped) {
  const hits = [];
  for (const url of topic.scrapedSources ?? []) {
    const row = scraped[url];
    if (row?.ok && row.title) hits.push(`${row.title} (${url})`);
  }
  return hits.slice(0, 2).join("; ");
}

function write(filePath, content) {
  const full = path.join(root, filePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf-8");
}

const scraped = loadScrapedNotes();
let articleCount = 0;
let imageCount = 0;

for (const topic of allTopics) {
  const notes = scrapedSummaryForTopic(topic, scraped);
  const markdown = buildArticleMarkdown(topic, notes);
  const articlePath = `content/articles/${topic.category}/${topic.slug}.md`;
  write(articlePath, markdown);
  articleCount += 1;

  const svg = buildHeroSvg(topic);
  write(`public/images/articles/${topic.slug}.svg`, svg);
  imageCount += 1;
}

// Manifest for admin review
const manifest = allTopics.map((t) => ({
  slug: t.slug,
  title: t.title,
  category: t.category,
  priority: t.priority ?? 2,
  status: "draft",
  path: `content/articles/${t.category}/${t.slug}.md`,
  image: `/images/articles/${t.slug}.svg`,
}));

write(
  "scripts/content-pipeline/manifest.json",
  JSON.stringify({ generated_at: new Date().toISOString(), count: manifest.length, articles: manifest }, null, 2)
);

console.log(`Generated ${articleCount} draft articles and ${imageCount} hero images.`);
console.log("Week 1 priority:", manifest.filter((a) => a.priority === 1).length);
console.log("Next: node scripts/import-drafts.mjs");
