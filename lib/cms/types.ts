export type CmsContentType =
  | "article"
  | "procedure"
  | "update"
  | "document"
  | "template"
  | "faq"
  | "glossary";

export type CmsStatus = "draft" | "published" | "archived" | "deleted";

export interface CmsRecord {
  id: string;
  content_type: CmsContentType;
  slug: string | null;
  status: CmsStatus;
  data: Record<string, unknown>;
  body: string | null;
  created_at: string;
  updated_at: string;
}

export interface CmsFileRecord {
  id: string;
  content_id: string;
  field: string;
  filename: string;
  mime_type: string;
  size: number;
  created_at: string;
}

export const CMS_TYPE_LABELS: Record<CmsContentType, string> = {
  article: "Knowledge articles",
  procedure: "Procedures",
  update: "Updates",
  document: "Documents",
  template: "Templates",
  faq: "FAQ",
  glossary: "Glossary",
};

export const CMS_TYPE_PATHS: Record<CmsContentType, string> = {
  article: "/knowledge",
  procedure: "/procedures",
  update: "/updates",
  document: "/documents",
  template: "/templates",
  faq: "/faq",
  glossary: "/glossary",
};
