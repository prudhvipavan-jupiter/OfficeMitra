import { loadDocumentById, loadTemplates } from "./cms/loaders";
import type { ToolKey } from "./tools/registry";

export interface ArticleResourceBundle {
  tools?: ToolKey[];
  templateIds?: string[];
  documentIds?: string[];
}

export const articleResources: Record<string, ArticleResourceBundle> = {};

export async function getArticleResources(slug: string) {
  const bundle = articleResources[slug];
  if (!bundle) return null;

  const allTemplates = await loadTemplates();
  const templates = (bundle.templateIds ?? [])
    .map((id) => allTemplates.find((t) => t.id === id))
    .filter(Boolean);

  const documents = (
    await Promise.all((bundle.documentIds ?? []).map((id) => loadDocumentById(id)))
  ).filter(Boolean);

  return {
    tools: bundle.tools ?? [],
    templates,
    documents,
  };
}
