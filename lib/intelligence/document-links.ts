/** Official document and portal links for intelligence updates. */

export interface OfficialDocument {
  label: string;
  url: string;
  type: "go" | "circular" | "form" | "manual" | "portal";
}

export function isPdfUrl(url: string): boolean {
  return /\.pdf(\?|$)/i.test(url);
}

export function primaryDocumentUrl(sourceUrl: string): string | null {
  if (isPdfUrl(sourceUrl)) return sourceUrl;
  return null;
}

const TOPIC_DOCUMENTS: Record<string, OfficialDocument[]> = {
  probation: [
    { label: "GOIR — Search probation & service rules", url: "https://goir.ap.gov.in/", type: "portal" },
    { label: "AP Health Department portal", url: "https://health.ap.gov.in/", type: "portal" },
  ],
  "earned-leave": [
    { label: "AP Leave Rules (verify on GOIR)", url: "https://goir.ap.gov.in/", type: "go" },
    { label: "AP Finance — Establishment circulars", url: "https://www.apfinance.ap.gov.in/", type: "portal" },
  ],
  apgli: [
    { label: "APGLI official portal", url: "https://www.apgli.ap.gov.in/", type: "portal" },
    { label: "APGLI policy & loan forms", url: "https://www.apgli.ap.gov.in/APGLI/Home/Forms", type: "form" },
  ],
  gpf: [
    { label: "AP Finance — GPF section", url: "https://www.apfinance.ap.gov.in/", type: "portal" },
    { label: "AG Andhra Pradesh — GPF accounts", url: "https://www.ag.ap.gov.in/", type: "portal" },
  ],
  "service-register": [
    { label: "GOIR — Service Register instructions", url: "https://goir.ap.gov.in/", type: "manual" },
  ],
  cfms: [
    { label: "CFMS employee & DDO portal", url: "https://cfms.ap.gov.in/", type: "portal" },
    { label: "AP Treasury circulars", url: "https://treasury.ap.gov.in/", type: "circular" },
  ],
  increment: [
    { label: "GOIR — Increment & pay revision orders", url: "https://goir.ap.gov.in/", type: "go" },
  ],
  "rule-28": [
    { label: "GOIR — AP State & Subordinate Service Rules", url: "https://goir.ap.gov.in/", type: "go" },
  ],
  "charge-memo": [
    { label: "GOIR — AP Civil Services (CCA) Rules", url: "https://goir.ap.gov.in/", type: "go" },
    { label: "General Administration Department", url: "https://gad.ap.gov.in/", type: "portal" },
  ],
  bcr: [
    { label: "AP Financial Code & budget circulars", url: "https://www.apfinance.ap.gov.in/", type: "manual" },
    { label: "CFMS — Budget & expenditure", url: "https://cfms.ap.gov.in/", type: "portal" },
  ],
};

const TITLE_TO_TOPIC: [RegExp, string][] = [
  [/probation/i, "probation"],
  [/earned leave|EL /i, "earned-leave"],
  [/apgli/i, "apgli"],
  [/gpf/i, "gpf"],
  [/service register|SR /i, "service-register"],
  [/cfms|treasury objection|bill submission/i, "cfms"],
  [/increment/i, "increment"],
  [/rule 28|relinquishment/i, "rule-28"],
  [/charge memo|disciplinary/i, "charge-memo"],
  [/bcr|budget control/i, "bcr"],
];

export function documentsForTitle(title: string): OfficialDocument[] {
  for (const [re, key] of TITLE_TO_TOPIC) {
    if (re.test(title)) return TOPIC_DOCUMENTS[key] ?? [];
  }
  return [{ label: "GOIR — Official Government Orders", url: "https://goir.ap.gov.in/", type: "portal" }];
}

export function relatedKnowledgeSlug(title: string): string | null {
  const map: [RegExp, string][] = [
    [/probation/i, "probation-declaration"],
    [/earned leave/i, "earned-leave-rules"],
    [/apgli/i, "apgli-loan-application"],
    [/gpf advance/i, "gpf-advance"],
    [/service register/i, "service-register-maintenance"],
    [/cfms|treasury objection/i, "cfms-bill-processing"],
    [/increment/i, "increment-sanction"],
    [/rule 28|relinquishment/i, "relinquishment-promotion-rule-28"],
    [/charge memo/i, "charge-memo-preparation"],
    [/bcr|budget control/i, "bcr-maintenance"],
  ];
  for (const [re, slug] of map) {
    if (re.test(title)) return slug;
  }
  return null;
}

export function formatDocumentsMarkdown(title: string, sourceUrl: string): string {
  const docs = documentsForTitle(title);
  const pdf = primaryDocumentUrl(sourceUrl);
  const lines = ["## Official documents & links", ""];

  if (pdf) {
    lines.push(`- **[Download detected document (PDF)](${sourceUrl})**`);
    lines.push("");
  }

  lines.push(`- **[View on official source portal](${sourceUrl})**`);
  lines.push("");

  for (const doc of docs) {
    const icon =
      doc.type === "form" ? "Form" : doc.type === "go" ? "GO" : doc.type === "manual" ? "Manual" : "Portal";
    lines.push(`- [${doc.label}](${doc.url}) — *${icon}*`);
  }

  const slug = relatedKnowledgeSlug(title);
  if (slug) {
    lines.push("");
    lines.push(`- **[Read full OfficeMitra guide → /knowledge/${slug}](/knowledge/${slug})**`);
  }

  lines.push("");
  lines.push(
    "*Always verify the latest GO/circular number and date on the official portal before acting on this information.*"
  );

  return lines.join("\n");
}
