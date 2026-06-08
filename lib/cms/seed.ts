import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getDocuments as getFileDocuments } from "@/lib/documents";
import { getTemplates as getFileTemplates } from "@/lib/templates";
import { faqItems as fileFaqItems } from "@/lib/faq";
import { glossaryTerms as fileGlossaryTerms } from "@/lib/glossary";
import {
  cmsClearType,
  cmsSaveFile,
  cmsUpdate,
  cmsUpsert,
  cmsUsesDatabase,
} from "./store";
import type { CmsContentType } from "./types";

const contentDir = path.join(process.cwd(), "content");

const ALL_TYPES: CmsContentType[] = [
  "article",
  "procedure",
  "update",
  "document",
  "template",
  "faq",
  "glossary",
];

function readMarkdownDir(dir: string): { data: Record<string, unknown>; content: string }[] {
  if (!fs.existsSync(dir)) return [];
  const out: { data: Record<string, unknown>; content: string }[] = [];

  function walk(current: string) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".md")) {
        const raw = fs.readFileSync(full, "utf-8");
        const { data, content } = matter(raw);
        out.push({ data: data as Record<string, unknown>, content });
      }
    }
  }

  walk(dir);
  return out;
}

async function uploadPublicFile(
  recordId: string,
  field: string,
  publicPath: string,
  mimeType: string
): Promise<string | undefined> {
  if (!publicPath.startsWith("/downloads/")) return undefined;
  const disk = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  if (!fs.existsSync(disk)) return undefined;
  await cmsSaveFile(recordId, field, path.basename(disk), mimeType, fs.readFileSync(disk));
  return `/api/cms/file/${recordId}/${field}`;
}

async function seedMarkdownType(type: CmsContentType, dir: string, slugField = "slug"): Promise<number> {
  let count = 0;
  for (const { data, content } of readMarkdownDir(dir)) {
    const slug = String(data[slugField] ?? "");
    await cmsUpsert({
      content_type: type,
      slug,
      status: (data.status as "draft" | "published" | "archived") ?? "published",
      data,
      body: content,
    });
    count += 1;
  }
  return count;
}

async function syncDocuments(): Promise<number> {
  let count = 0;
  for (const doc of getFileDocuments()) {
    const record = await cmsUpsert({
      content_type: "document",
      slug: doc.id,
      status: "published",
      data: { ...doc },
    });
    const fileUrl = doc.file
      ? await uploadPublicFile(
          record.id,
          "file",
          doc.file,
          doc.file.endsWith(".pdf") ? "application/pdf" : "text/plain"
        )
      : undefined;
    if (fileUrl) {
      await cmsUpdate(record.id, { data: { ...doc, file: fileUrl } });
    }
    count += 1;
  }
  return count;
}

async function syncTemplates(): Promise<number> {
  let count = 0;
  for (const tpl of getFileTemplates()) {
    const record = await cmsUpsert({
      content_type: "template",
      slug: tpl.id,
      status: "published",
      data: { ...tpl },
    });
    const patch: Record<string, unknown> = { ...tpl };
    for (const field of ["file_pdf", "file_docx"] as const) {
      const fp = tpl[field];
      if (!fp) continue;
      const mime =
        field === "file_pdf"
          ? "application/pdf"
          : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const url = await uploadPublicFile(record.id, field, fp, mime);
      if (url) patch[field] = url;
    }
    if (patch.file_pdf !== tpl.file_pdf || patch.file_docx !== tpl.file_docx) {
      await cmsUpdate(record.id, { data: patch });
    }
    count += 1;
  }
  return count;
}

async function syncCmsType(type: CmsContentType): Promise<number> {
  switch (type) {
    case "article":
      return seedMarkdownType("article", path.join(contentDir, "articles"));
    case "procedure":
      return seedMarkdownType("procedure", path.join(contentDir, "procedures"));
    case "update":
      return seedMarkdownType("update", path.join(contentDir, "updates"));
    case "document":
      return syncDocuments();
    case "template":
      return syncTemplates();
    case "faq": {
      let count = 0;
      for (const item of fileFaqItems) {
        await cmsUpsert({
          content_type: "faq",
          slug: item.id,
          status: "published",
          data: { ...item },
        });
        count += 1;
      }
      return count;
    }
    case "glossary": {
      let count = 0;
      for (const item of fileGlossaryTerms) {
        await cmsUpsert({
          content_type: "glossary",
          slug: item.term.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          status: "published",
          data: { ...item },
        });
        count += 1;
      }
      return count;
    }
  }
}

export interface SyncCmsOptions {
  types?: CmsContentType[];
  /** Wipe each type before importing from git files. */
  force?: boolean;
  /** Skip types that already have CMS records (used on auto-start). */
  onlyEmpty?: boolean;
}

export async function syncCmsFromFiles(
  options: SyncCmsOptions = {}
): Promise<Record<string, number | string>> {
  const types = options.types ?? ALL_TYPES;
  const counts: Record<string, number | string> = {};

  for (const type of types) {
    if (options.onlyEmpty && !options.force) {
      const { cmsList } = await import("./store");
      const existing = await cmsList(type, { includeDeleted: true });
      if (existing.length > 0) {
        counts[type] = "skipped";
        continue;
      }
    }

    if (options.force) {
      await cmsClearType(type);
    }

    counts[type] = await syncCmsType(type);
  }

  return counts;
}

/** @deprecated Use syncCmsFromFiles */
export async function seedCmsFromFiles(force = false): Promise<Record<string, number | string>> {
  return syncCmsFromFiles({ force, onlyEmpty: !force });
}

export function cmsStorageMode(): "database" | "local" {
  return cmsUsesDatabase() ? "database" : "local";
}
