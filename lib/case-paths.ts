import type { ToolKey } from "./tools/registry";

export interface CasePath {
  id: string;
  category: string;
  articleSlug: string;
  procedureSlug?: string;
  tool?: ToolKey;
  faqHref?: string;
  expertPrefill?: string;
}

export const casePaths: CasePath[] = [];
