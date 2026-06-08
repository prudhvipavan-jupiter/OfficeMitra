import { getDiscussions } from "./db/discussions";
import {
  loadArticles,
  loadDocuments,
  loadFaqItems,
  loadGlossaryTerms,
  loadProcedures,
  loadTemplates,
  loadUpdates,
} from "./cms/loaders";
import type { FaqItem } from "./faq";
import type { GlossaryTerm } from "./glossary";
import { toolDefinitions, toolSearchTitles, type ToolKey } from "./tools/registry";

export interface UnifiedSearchResults {
  articles: Awaited<ReturnType<typeof searchContentAsync>>["articles"];
  procedures: Awaited<ReturnType<typeof searchContentAsync>>["procedures"];
  documents: Awaited<ReturnType<typeof searchContentAsync>>["documents"];
  templates: Awaited<ReturnType<typeof searchContentAsync>>["templates"];
  updates: Awaited<ReturnType<typeof searchContentAsync>>["updates"];
  faq: FaqItem[];
  glossary: GlossaryTerm[];
  community: {
    id: string;
    title: string;
    body: string;
    category: string;
  }[];
  tools: { key: ToolKey; href: string; title: string }[];
}

async function searchContentAsync(query: string) {
  const q = query.toLowerCase().trim();
  const [articles, procedures, documents, templates, updates] = await Promise.all([
    loadArticles(),
    loadProcedures(),
    loadDocuments(),
    loadTemplates(),
    loadUpdates(),
  ]);
  if (!q) return { articles: [], procedures: [], documents: [], templates: [], updates: [] };

  return {
    articles: articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        a.telugu_summary?.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q))
    ),
    procedures: procedures.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
    ),
    documents: documents.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.subject.toLowerCase().includes(q) ||
        d.number.toLowerCase().includes(q)
    ),
    templates: templates.filter(
      (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    ),
    updates: updates.filter(
      (u) =>
        u.title.toLowerCase().includes(q) ||
        u.what_changed.toLowerCase().includes(q) ||
        u.action_required.toLowerCase().includes(q)
    ),
  };
}

export async function searchAll(query: string): Promise<UnifiedSearchResults> {
  const q = query.toLowerCase().trim();
  const base = await searchContentAsync(query);

  if (!q) {
    return {
      ...base,
      faq: [],
      glossary: [],
      community: [],
      tools: [],
    };
  }

  const [faqAll, glossaryAll] = await Promise.all([loadFaqItems(), loadGlossaryTerms()]);
  const faq = faqAll.filter(
    (f) =>
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q)
  );
  const glossary = glossaryAll.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
  );

  const discussions = await getDiscussions({ status: "published" });
  const resolved = await getDiscussions({ status: "resolved" });
  const community = [...discussions, ...resolved]
    .filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.body.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
    )
    .slice(0, 10)
    .map((d) => ({
      id: d.id,
      title: d.title,
      body: d.body,
      category: d.category,
    }));

  const tools = toolDefinitions
    .filter(({ key }) => {
      const title = toolSearchTitles[key].toLowerCase();
      return title.includes(q) || key.toLowerCase().includes(q);
    })
    .map(({ key, href }) => ({
      key,
      href,
      title: toolSearchTitles[key],
    }));

  return {
    ...base,
    faq,
    glossary,
    community,
    tools,
  };
}

export function countSearchResults(results: UnifiedSearchResults): number {
  return (
    results.articles.length +
    results.procedures.length +
    results.documents.length +
    results.templates.length +
    results.updates.length +
    results.faq.length +
    results.glossary.length +
    results.community.length +
    results.tools.length
  );
}
