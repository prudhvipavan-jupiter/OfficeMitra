import type { Article, Procedure, UpdateEntry } from "@/lib/content";
import { getArticles as fileArticles, getProcedures as fileProcedures, getUpdates as fileUpdates } from "@/lib/content";
import type { DocumentRecord } from "@/lib/documents";
import { getDocuments as fileDocuments } from "@/lib/documents";
import type { FaqItem } from "@/lib/faq";
import { faqItems as fileFaq } from "@/lib/faq";
import type { GlossaryTerm } from "@/lib/glossary";
import { glossaryTerms as fileGlossary } from "@/lib/glossary";
import type { TemplateRecord } from "@/lib/templates";
import { getTemplates as fileTemplates } from "@/lib/templates";
import { cmsFileUrl, cmsHasRecords, cmsList } from "./store";

let bootPromise = import("./auto-sync").then(({ ensureCmsAutoSync }) => ensureCmsAutoSync());

async function ensureBootstrapped() {
  await bootPromise;
}

async function cmsActive(type: Parameters<typeof cmsHasRecords>[0]): Promise<boolean> {
  return cmsHasRecords(type);
}

function resolveFileUrl(contentId: string, field: string, fallback?: string): string | undefined {
  return `/api/cms/file/${contentId}/${field}`;
}

export async function loadDocuments(): Promise<DocumentRecord[]> {
  await ensureBootstrapped();
  if (!(await cmsActive("document"))) return fileDocuments();

  const records = await cmsList("document", { status: "published" });
  return records.map((r) => {
    const doc = r.data as unknown as DocumentRecord;
    return {
      ...doc,
      file: doc.file?.startsWith("/api/cms/")
        ? doc.file
        : resolveFileUrl(r.id, "file") ?? doc.file,
    };
  });
}

export async function loadDocumentById(id: string): Promise<DocumentRecord | undefined> {
  const docs = await loadDocuments();
  return docs.find((d) => d.id === id);
}

export async function loadTemplates(): Promise<TemplateRecord[]> {
  if (!(await cmsActive("template"))) return fileTemplates();

  const records = await cmsList("template", { status: "published" });
  return records.map((r) => {
    const tpl = r.data as unknown as TemplateRecord;
    return {
      ...tpl,
      file_pdf: tpl.file_pdf?.startsWith("/api/cms/")
        ? tpl.file_pdf
        : resolveFileUrl(r.id, "file_pdf") ?? tpl.file_pdf,
      file_docx: tpl.file_docx?.startsWith("/api/cms/")
        ? tpl.file_docx
        : resolveFileUrl(r.id, "file_docx") ?? tpl.file_docx,
    };
  });
}

export async function loadArticles(): Promise<Article[]> {
  if (!(await cmsActive("article"))) return fileArticles();

  const records = await cmsList("article", { status: "published" });
  return records
    .map((r) => ({ ...(r.data as unknown as Omit<Article, "content">), content: r.body ?? "" } as Article))
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
}

export async function loadArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await loadArticles();
  return articles.find((a) => a.slug === slug);
}

export async function loadProcedures(): Promise<Procedure[]> {
  if (!(await cmsActive("procedure"))) return fileProcedures();

  const records = await cmsList("procedure", { status: "published" });
  return records.map((r) => ({ ...(r.data as unknown as Omit<Procedure, "content">), content: r.body ?? "" } as Procedure));
}

export async function loadProcedureBySlug(slug: string): Promise<Procedure | undefined> {
  const items = await loadProcedures();
  return items.find((p) => p.slug === slug);
}

export async function loadUpdates(): Promise<UpdateEntry[]> {
  if (!(await cmsActive("update"))) return fileUpdates();

  const records = await cmsList("update", { status: "published" });
  return records
    .map((r) => ({ ...(r.data as unknown as Omit<UpdateEntry, "content">), content: r.body ?? "" } as UpdateEntry))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function loadUpdateBySlug(slug: string): Promise<UpdateEntry | undefined> {
  const items = await loadUpdates();
  return items.find((u) => u.slug === slug);
}

export async function loadFaqItems(): Promise<FaqItem[]> {
  if (!(await cmsActive("faq"))) return fileFaq;

  const records = await cmsList("faq", { status: "published" });
  return records.map((r) => r.data as unknown as FaqItem);
}

export async function loadGlossaryTerms(): Promise<GlossaryTerm[]> {
  if (!(await cmsActive("glossary"))) return fileGlossary;

  const records = await cmsList("glossary", { status: "published" });
  return records.map((r) => r.data as unknown as GlossaryTerm);
}

export { cmsFileUrl };
