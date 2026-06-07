import type { ArticleCategory } from "./categories";

export const popularSearches = [
  "Probation",
  "Promotion",
  "APGLI",
  "GPF",
  "Relinquishment",
  "Service Register",
];

export const popularProcedures = [
  {
    title: "Probation Declaration",
    slug: "probation-declaration-procedure",
    category: "establishment" as ArticleCategory,
    description: "Complete workflow for declaring probation of staff.",
  },
  {
    title: "Promotion Procedure",
    slug: "promotion-procedure",
    category: "establishment" as ArticleCategory,
    description: "Zone and category promotion processing steps.",
  },
  {
    title: "APGLI Loan",
    slug: "apgli-loan-procedure",
    category: "finance" as ArticleCategory,
    description: "Application and sanction procedure for APGLI loans.",
  },
  {
    title: "GPF Advance",
    slug: "gpf-advance-procedure",
    category: "finance" as ArticleCategory,
    description: "Temporary and non-temporary GPF advance workflow.",
  },
  {
    title: "Medical Reimbursement",
    slug: "medical-reimbursement-procedure",
    category: "finance" as ArticleCategory,
    description: "Processing medical reimbursement claims.",
  },
  {
    title: "Bill Submission",
    slug: "bill-submission-procedure",
    category: "treasury" as ArticleCategory,
    description: "Treasury bill submission procedure.",
  },
];
