import { loadDocumentById, loadTemplates } from "./cms/loaders";
import type { ToolKey } from "./tools/registry";

export interface ArticleResourceBundle {
  tools?: ToolKey[];
  templateIds?: string[];
  documentIds?: string[];
}

/** Links articles to tools, templates, and documents for the complete-case journey. */
export const articleResources: Record<string, ArticleResourceBundle> = {
  "probation-declaration": {
    tools: ["probation"],
    templateIds: ["probation-proceedings-template", "sr-entry-template"],
    documentIds: ["go-probation-rules", "form-probation-proceedings", "checklist-probation"],
  },
  "promotion-zone-category": {
    templateIds: ["promotion-proceedings-template"],
    documentIds: ["go-promotion-sr", "checklist-promotion"],
  },
  "service-register-maintenance": {
    templateIds: ["sr-correction-note", "sr-entry-template"],
    documentIds: ["manual-sr-maintenance"],
  },
  "apgli-loan-application": {
    tools: ["gpfRecovery"],
    templateIds: ["apgli-loan-application-template"],
    documentIds: ["go-apgli-scheme", "circular-apgli-premium"],
  },
  "gpf-advance": {
    tools: ["gpfRecovery", "gpfSubscription"],
    templateIds: ["gpf-advance-application-template"],
    documentIds: ["go-gpf-rules", "form-gpf-advance"],
  },
  "medical-reimbursement": {
    templateIds: ["medical-reimbursement-bill-template"],
    documentIds: ["circular-med-reimb-2024", "checklist-med-reimb"],
  },
  "el-encashment-retirement": {
    tools: ["elEncashment"],
    templateIds: ["el-encashment-application-template"],
    documentIds: ["go-leave-rules", "form-el-encashment"],
  },
  "bill-submission-treasury": {
    tools: ["payBillChecklist"],
    templateIds: [],
    documentIds: ["circular-treasury-bills", "form-bill-submission"],
  },
  "transfer-inter-district": {
    documentIds: ["circular-health-est"],
  },
  "relinquishment-promotion": {
    documentIds: ["go-promotion-sr"],
  },
  "pay-fixation-promotion": {
    tools: ["payEstimate", "incrementDue", "daArrears"],
    documentIds: ["go-da-revision"],
  },
  "apgli-premium-pay-bill": {
    tools: ["apgliPremium", "payBillChecklist"],
    documentIds: ["circular-apgli-premium"],
  },
};

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
