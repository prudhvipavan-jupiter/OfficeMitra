export interface FaqItem {
  id: string;
  category: string;
  question: string;
  question_te?: string;
  answer: string;
  answer_te?: string;
  related_links?: { label: string; href: string }[];
}

export const faqItems: FaqItem[] = [
  {
    id: "probation-late",
    category: "Establishment",
    question: "Can probation be declared after the completion date has passed?",
    question_te: "Probation completion date crossed అయిన తర్వాత declare చేయవచ్చా?",
    answer:
      "Yes, with valid reasons documented in proceedings. Delay should be explained; verify ACRs and absence of disciplinary cases. Prepare proceedings citing appointment order and completion date.",
    answer_te:
      "అవును, proceedings లో కారణాలు document చేస్తే. ACRs మరియు disciplinary cases verify చేయండి.",
    related_links: [
      { label: "Probation article", href: "/knowledge/probation-declaration" },
      { label: "Procedure guide", href: "/procedures/probation-declaration-procedure" },
    ],
  },
  {
    id: "apgli-loan-limit",
    category: "Finance",
    question: "How is APGLI loan eligibility calculated?",
    answer:
      "Based on sum assured, premium payment history, and APGLI rules in force. Check current policy statement on APGLI portal and applicable GOs.",
    related_links: [{ label: "APGLI loan guide", href: "/knowledge/apgli-loan-application" }],
  },
  {
    id: "gpf-temporary-advance",
    category: "Finance",
    question: "What is the difference between temporary and non-temporary GPF advance?",
    answer:
      "Temporary advance is for specific short-term needs with faster recovery; non-temporary follows different sanction and documentation rules. Verify current GPF rules and account balance.",
    related_links: [{ label: "GPF advance guide", href: "/knowledge/gpf-advance" }],
  },
  {
    id: "sr-correction",
    category: "Establishment",
    question: "How do I correct a wrong Service Register entry?",
    answer:
      "Prepare a correction note citing the incorrect entry, supporting order, and correct particulars. Route through Head of Office for approval before amending the SR.",
    related_links: [
      { label: "SR maintenance", href: "/knowledge/service-register-maintenance" },
    ],
  },
  {
    id: "medical-reimbursement-docs",
    category: "Finance",
    question: "What documents are needed for medical reimbursement?",
    answer:
      "Bills, prescriptions, discharge summary (if inpatient), and eligibility proof per current medical/EHS rules. Use prescribed bill format.",
    related_links: [
      { label: "Medical reimbursement", href: "/knowledge/medical-reimbursement" },
    ],
  },
  {
    id: "el-encashment-retirement",
    category: "Leave",
    question: "How many days of EL can be encashed on retirement?",
    answer:
      "Subject to AP leave rules and maximum limits in force at retirement. Obtain updated leave account and follow treasury procedure.",
    related_links: [
      { label: "EL encashment guide", href: "/knowledge/el-encashment-retirement" },
    ],
  },
  {
    id: "expert-vs-community",
    category: "OfficeMitra",
    question: "What is the difference between Expert Assistance and Community?",
    answer:
      "Expert Assistance is private, personalized guidance for your institution (2–3 day response). Community is a public Q&A board where staff share questions and moderators publish answers for everyone.",
    related_links: [
      { label: "Expert Assistance", href: "/expert-assistance" },
      { label: "Community", href: "/community" },
    ],
  },
  {
    id: "official-go-source",
    category: "General",
    question: "Where should I verify Government Orders before acting?",
    answer:
      "Always verify on GOIR (goir.ap.gov.in) or official department sources. OfficeMitra provides guidance only — not legal advice.",
    related_links: [{ label: "Official Portals", href: "/official-links" }],
  },
  {
    id: "bill-submission-cfms",
    category: "Treasury",
    question: "How do I track a submitted treasury bill?",
    answer:
      "Use CFMS bill status after submission. Ensure correct head of account and sanctions are attached before submission.",
    related_links: [
      { label: "Bill submission guide", href: "/knowledge/bill-submission-treasury" },
      { label: "CFMS on Official Portals", href: "/official-links" },
    ],
  },
  {
    id: "health-dept-focus",
    category: "OfficeMitra",
    question: "Is OfficeMitra only for Health Department staff?",
    answer:
      "Knowledge content applies broadly to AP ministerial staff. Expert Assistance V1 is currently available for AP Health Department institutions only.",
    related_links: [{ label: "Health Department Hub", href: "/departments/health" }],
  },
];

export function searchFaq(query: string): FaqItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return faqItems;
  return faqItems.filter(
    (f) =>
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      f.question_te?.includes(q)
  );
}
