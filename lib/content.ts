import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getDocuments } from "./documents";
import { getTemplates } from "./templates";
import type { ArticleCategory } from "./categories";
export type { ArticleCategory } from "./categories";
export { categoryLabels } from "./categories";

const contentDir = path.join(process.cwd(), "content");
export { popularProcedures } from "./constants";

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  category: ArticleCategory;
  tags?: string[];
  summary: string;
  telugu_summary?: string;
  telugu_overview?: string;
  status: "draft" | "published" | "archived";
  published_at: string;
  updated_at?: string;
  author?: string;
  related_procedures?: string[];
  verified_go?: string;
  verified_at?: string;
  expert_assistance_cta?: boolean;
}

export interface Article extends ArticleFrontmatter {
  content: string;
}

export interface ProcedureFrontmatter {
  title: string;
  slug: string;
  category: ArticleCategory;
  summary: string;
  estimated_time?: string;
  status: "draft" | "published" | "archived";
  published_at: string;
  related_articles?: string[];
  checklist?: string[];
  required_documents?: string[];
  sr_reminder?: string;
}

export interface Procedure extends ProcedureFrontmatter {
  content: string;
}

export interface UpdateFrontmatter {
  title: string;
  slug: string;
  date: string;
  category: "finance" | "establishment" | "health" | "appsc";
  what_changed: string;
  who_is_affected: string;
  action_required: string;
  status: "draft" | "published" | "archived";
}

export interface UpdateEntry extends UpdateFrontmatter {
  content: string;
}

function readMarkdownFiles<T>(
  dir: string,
  transform: (data: Record<string, unknown>, content: string) => T | null
): T[] {
  if (!fs.existsSync(dir)) return [];

  const results: T[] = [];

  function walk(current: string) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith(".md")) {
        const raw = fs.readFileSync(full, "utf-8");
        const { data, content } = matter(raw);
        const item = transform(data as Record<string, unknown>, content);
        if (item) results.push(item);
      }
    }
  }

  walk(dir);
  return results;
}

export function getArticles(): Article[] {
  return readMarkdownFiles<Article>(
    path.join(contentDir, "articles"),
    (data, content) => {
      if (data.status !== "published") return null;
      return { ...(data as unknown as ArticleFrontmatter), content };
    }
  ).sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

export function getProcedures(): Procedure[] {
  return readMarkdownFiles<Procedure>(
    path.join(contentDir, "procedures"),
    (data, content) => {
      if (data.status !== "published") return null;
      return { ...(data as unknown as ProcedureFrontmatter), content };
    }
  );
}

export function getProcedureBySlug(slug: string): Procedure | undefined {
  return getProcedures().find((p) => p.slug === slug);
}

export function getUpdates(): UpdateEntry[] {
  return readMarkdownFiles<UpdateEntry>(
    path.join(contentDir, "updates"),
    (data, content) => {
      if (data.status !== "published") return null;
      return { ...(data as unknown as UpdateFrontmatter), content };
    }
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function searchContent(query: string) {
  const q = query.toLowerCase().trim();
  if (!q)
    return { articles: [], procedures: [], documents: [], templates: [], updates: [] };

  const articles = getArticles().filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q) ||
      a.telugu_summary?.toLowerCase().includes(q) ||
      a.telugu_overview?.toLowerCase().includes(q) ||
      a.tags?.some((t) => t.toLowerCase().includes(q))
  );

  const procedures = getProcedures().filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
  );

  const documents = getDocuments().filter(
    (d) =>
      d.title.toLowerCase().includes(q) ||
      d.subject.toLowerCase().includes(q) ||
      d.number.toLowerCase().includes(q)
  );

  const templates = getTemplates().filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
  );

  const updates = getUpdates().filter(
    (u) =>
      u.title.toLowerCase().includes(q) ||
      u.what_changed.toLowerCase().includes(q) ||
      u.action_required.toLowerCase().includes(q)
  );

  return { articles, procedures, documents, templates, updates };
}

export function extractHeadings(content: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  const regex = /^## (.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text });
  }
  return headings;
}
