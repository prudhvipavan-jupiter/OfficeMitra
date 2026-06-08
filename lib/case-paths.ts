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

export const casePaths: CasePath[] = [
  {
    id: "probation",
    category: "establishment",
    articleSlug: "probation-declaration",
    procedureSlug: "probation-declaration-procedure",
    tool: "probation",
    faqHref: "/faq?q=probation",
    expertPrefill: "probation-declaration",
  },
  {
    id: "promotion",
    category: "establishment",
    articleSlug: "promotion-zone-category",
    procedureSlug: "promotion-procedure",
    faqHref: "/faq?q=promotion",
    expertPrefill: "promotion-zone-category",
  },
  {
    id: "apgli",
    category: "finance",
    articleSlug: "apgli-loan-application",
    procedureSlug: "apgli-loan-procedure",
    tool: "gpfRecovery",
    expertPrefill: "apgli-loan-application",
  },
  {
    id: "gpf",
    category: "finance",
    articleSlug: "gpf-advance",
    procedureSlug: "gpf-advance-procedure",
    tool: "gpfRecovery",
    expertPrefill: "gpf-advance",
  },
  {
    id: "medical",
    category: "finance",
    articleSlug: "medical-reimbursement",
    procedureSlug: "medical-reimbursement-procedure",
    expertPrefill: "medical-reimbursement",
  },
  {
    id: "sr",
    category: "establishment",
    articleSlug: "service-register-maintenance",
    procedureSlug: "service-register-maintenance-procedure",
    faqHref: "/faq?q=service+register",
    expertPrefill: "service-register-maintenance",
  },
  {
    id: "el",
    category: "leave",
    articleSlug: "el-encashment-retirement",
    procedureSlug: "el-encashment-procedure",
    tool: "elEncashment",
    expertPrefill: "el-encashment-retirement",
  },
  {
    id: "bill",
    category: "treasury",
    articleSlug: "bill-submission-treasury",
    procedureSlug: "bill-submission-procedure",
    tool: "payBillChecklist",
    expertPrefill: "bill-submission-treasury",
  },
];
