export type ArticleCategory =
  | "establishment"
  | "finance"
  | "leave"
  | "apgli"
  | "gpf"
  | "treasury"
  | "service-rules"
  | "conduct"
  | "health";

export const categoryLabels: Record<ArticleCategory, string> = {
  establishment: "Establishment",
  finance: "Finance",
  leave: "Leave",
  apgli: "APGLI",
  gpf: "GPF",
  treasury: "Treasury",
  "service-rules": "Service Rules",
  conduct: "Conduct & Disciplinary",
  health: "Health Department",
};

export interface ProcedureData {
  title: string;
  slug: string;
  category: ArticleCategory;
  summary: string;
  estimated_time?: string;
  content: string;
  related_articles?: string[];
  checklist?: string[];
  required_documents?: string[];
}
