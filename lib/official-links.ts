export type PortalCategory =
  | "finance-treasury"
  | "establishment"
  | "health"
  | "insurance"
  | "recruitment"
  | "information";

export interface OfficialPortal {
  id: string;
  name: string;
  teluguName?: string;
  description: string;
  url: string;
  category: PortalCategory;
  tags: string[];
}

export const portalCategoryLabels: Record<
  PortalCategory,
  { en: string; te: string }
> = {
  "finance-treasury": {
    en: "Finance & Treasury",
    te: "ఫైనాన్స్ & ట్రెజరీ",
  },
  establishment: {
    en: "Establishment & HR",
    te: "ఎస్టాబ్లిష్‌మెంట్ & HR",
  },
  health: {
    en: "Health Department",
    te: "ఆరోగ్య శాఖ",
  },
  insurance: {
    en: "Insurance & Benefits",
    te: "బీమా & ప్రయోజనాలు",
  },
  recruitment: {
    en: "Recruitment",
    te: "నియామకాలు",
  },
  information: {
    en: "Orders & Information",
    te: "ఉత్తర్వులు & సమాచారం",
  },
};

export const officialPortals: OfficialPortal[] = [
  {
    id: "cfms-login",
    name: "CFMS Login",
    teluguName: "CFMS లాగిన్",
    description: "Comprehensive Financial Management System — bills, payments, DDO functions.",
    url: "https://cfms.ap.gov.in/",
    category: "finance-treasury",
    tags: ["cfms", "bill", "ddo", "treasury", "payment"],
  },
  {
    id: "cfms-bill-status",
    name: "CFMS Bill Status",
    teluguName: "CFMS బిల్ స్టాటస్",
    description: "Track submitted treasury bills and payment status.",
    url: "https://cfms.ap.gov.in/",
    category: "finance-treasury",
    tags: ["bill", "status", "treasury"],
  },
  {
    id: "nidhi-payroll",
    name: "NIDHI Payroll",
    teluguName: "నిధి పేరోల్",
    description: "AP government employee pay slips and payroll services.",
    url: "https://nidhi.ap.gov.in/",
    category: "finance-treasury",
    tags: ["payroll", "salary", "payslip", "nidhi"],
  },
  {
    id: "ap-treasury",
    name: "AP Treasury Department",
    teluguName: "ఆంధ్రప్రదేశ్ ట్రెజరీ",
    description: "Treasury department portal — circulars and finance resources.",
    url: "https://treasury.ap.gov.in/",
    category: "finance-treasury",
    tags: ["treasury", "finance", "circular"],
  },
  {
    id: "goir",
    name: "GOIR — Government Orders",
    teluguName: "GOIR — ప్రభుత్వ ఉత్తర్వులు",
    description: "Official repository to search and download Government Orders.",
    url: "https://goir.ap.gov.in/",
    category: "information",
    tags: ["go", "orders", "goir", "circular"],
  },
  {
    id: "ap-finance-dept",
    name: "AP Finance Department",
    teluguName: "ఆంధ్రప్రదేశ్ ఫైనాన్స్ శాఖ",
    description: "Finance department website — budget, accounts, and policy updates.",
    url: "https://finance.ap.gov.in/",
    category: "finance-treasury",
    tags: ["finance", "budget", "accounts"],
  },
  {
    id: "hrms-ap",
    name: "AP HRMS",
    teluguName: "AP HRMS",
    description: "Human Resource Management System for AP government employees.",
    url: "https://hrms.ap.gov.in/",
    category: "establishment",
    tags: ["hrms", "hr", "employee", "service"],
  },
  {
    id: "e-office-ap",
    name: "e-Office AP",
    teluguName: "e-Office AP",
    description: "Digital file management and office workflow system.",
    url: "https://eoffice.ap.gov.in/",
    category: "establishment",
    tags: ["eoffice", "files", "workflow"],
  },
  {
    id: "apservices-portal",
    name: "AP Seva Portal",
    teluguName: "AP సేవా పోర్టల్",
    description: "Citizen and employee services gateway for Andhra Pradesh.",
    url: "https://portal.ap.gov.in/",
    category: "information",
    tags: ["services", "portal", "citizen"],
  },
  {
    id: "ehs-portal",
    name: "Employee Health Scheme (EHS)",
    teluguName: "ఉద్యోగుల ఆరోగ్య పథకం (EHS)",
    description: "EHS enrollment, hospital lists, and medical benefit information.",
    url: "https://employeehealthscheme.ap.gov.in/",
    category: "health",
    tags: ["ehs", "medical", "hospital", "health"],
  },
  {
    id: "ehs-card",
    name: "EHS Health Card",
    teluguName: "EHS హెల్త్ కార్డ్",
    description: "View and download employee health card details.",
    url: "https://employeehealthscheme.ap.gov.in/ehs/",
    category: "health",
    tags: ["ehs", "card", "medical"],
  },
  {
    id: "ntr-vaidya-seva",
    name: "Dr. NTR Vaidya Seva",
    teluguName: "డాక్టర్ NTR వైద్య సేవ",
    description: "Health insurance scheme portal for eligible beneficiaries.",
    url: "https://ntrvaidyaseva.ap.gov.in/",
    category: "health",
    tags: ["health", "insurance", "hospital"],
  },
  {
    id: "ap-health-dept",
    name: "AP Health Department",
    teluguName: "ఆంధ్రప్రదేశ్ ఆరోగ్య శాఖ",
    description: "Health department official website — programmes and notifications.",
    url: "https://health.ap.gov.in/",
    category: "health",
    tags: ["health", "department", "medical"],
  },
  {
    id: "herb-portal",
    name: "NIDHI HERB",
    teluguName: "NIDHI HERB",
    description: "Health employee records and billing system for medical institutions.",
    url: "https://herb.ap.gov.in/",
    category: "health",
    tags: ["herb", "hospital", "billing", "health"],
  },
  {
    id: "apgli",
    name: "APGLI Portal",
    teluguName: "APGLI పోర్టల్",
    description: "Andhra Pradesh Government Life Insurance — policies, loans, claims.",
    url: "https://www.apgli.gov.in/",
    category: "insurance",
    tags: ["apgli", "insurance", "loan", "life"],
  },
  {
    id: "gis-ap",
    name: "Group Insurance Scheme (GIS)",
    teluguName: "గ్రూప్ ఇన్సూరెన్స్ స్కీమ్",
    description: "GIS enrollment and claim information for government employees.",
    url: "https://www.apgli.gov.in/",
    category: "insurance",
    tags: ["gis", "insurance", "group"],
  },
  {
    id: "gpf-treasury",
    name: "GPF / NPS Services",
    teluguName: "GPF / NPS సేవలు",
    description: "Provident fund and pension-related services via treasury systems.",
    url: "https://treasury.ap.gov.in/",
    category: "insurance",
    tags: ["gpf", "nps", "pension", "provident"],
  },
  {
    id: "appsc",
    name: "APPSC",
    teluguName: "APPSC",
    description: "Andhra Pradesh Public Service Commission — recruitment and notifications.",
    url: "https://psc.ap.gov.in/",
    category: "recruitment",
    tags: ["appsc", "recruitment", "exam", "notification"],
  },
  {
    id: "ap-govt-portal",
    name: "AP Government Portal",
    teluguName: "ఆంధ్రప్రదేశ్ ప్రభుత్వ పోర్టల్",
    description: "Main AP government web portal — departments and services directory.",
    url: "https://www.ap.gov.in/",
    category: "information",
    tags: ["government", "portal", "departments"],
  },
  {
    id: "rti-ap",
    name: "RTI AP Online",
    teluguName: "RTI AP ఆన్‌లైన్",
    description: "File and track Right to Information requests in Andhra Pradesh.",
    url: "https://rtionline.ap.gov.in/",
    category: "information",
    tags: ["rti", "information", "request"],
  },
  {
    id: "meekosam",
    name: "Meekosam (Grievance)",
    teluguName: "మీకోసం (ఫిర్యాదులు)",
    description: "Public grievance redressal system for AP government services.",
    url: "https://meekosam.ap.gov.in/",
    category: "information",
    tags: ["grievance", "complaint", "meekosam"],
  },
  {
    id: "income-tax",
    name: "Income Tax e-Filing",
    teluguName: "ఆదాయపు పన్ను e-Filing",
    description: "Central IT department portal for returns and Form 16.",
    url: "https://www.incometax.gov.in/",
    category: "finance-treasury",
    tags: ["income tax", "itr", "form 16"],
  },
  {
    id: "epension-ap",
    name: "AP e-Pension",
    teluguName: "AP e-Pension",
    description: "Pensioners portal for AP government retired employees.",
    url: "https://pensionersportal.gov.in/",
    category: "insurance",
    tags: ["pension", "retirement", "pensioner"],
  },
  {
    id: "digital-ap",
    name: "Digital AP",
    teluguName: "డిజిటల్ AP",
    description: "Digital governance initiatives and e-services for Andhra Pradesh.",
    url: "https://digital.ap.gov.in/",
    category: "information",
    tags: ["digital", "egov", "services"],
  },
  {
    id: "ap-labour",
    name: "AP Labour Department",
    teluguName: "AP Labour Department",
    description: "Labour welfare and compliance resources (where applicable).",
    url: "https://labour.ap.gov.in/",
    category: "establishment",
    tags: ["labour", "welfare"],
  },
  {
    id: "ccl-ap",
    name: "AP Commercial Taxes",
    teluguName: "AP Commercial Taxes",
    description: "Commercial tax department portal for registrations and filings.",
    url: "https://www.apct.gov.in/",
    category: "finance-treasury",
    tags: ["tax", "commercial", "gst"],
  },
  {
    id: "aadhaar-uidai",
    name: "UIDAI — Aadhaar",
    teluguName: "UIDAI — ఆధార్",
    description: "Aadhaar enrollment, updates, and verification services.",
    url: "https://uidai.gov.in/",
    category: "information",
    tags: ["aadhaar", "uid", "identity"],
  },
  {
    id: "pan-nsdl",
    name: "PAN — NSDL",
    teluguName: "PAN — NSDL",
    description: "Apply for or update PAN card online.",
    url: "https://www.onlineservices.nsdl.com/paam/",
    category: "information",
    tags: ["pan", "tax", "nsdl"],
  },
  {
    id: "prc-finance",
    name: "PRC / Pay Revision",
    teluguName: "PRC / Pay Revision",
    description: "Pay revision orders and salary-related GOs via finance portal.",
    url: "https://finance.ap.gov.in/",
    category: "finance-treasury",
    tags: ["prc", "pay", "salary", "da"],
  },
  {
    id: "e-procurement-ap",
    name: "AP e-Procurement",
    teluguName: "AP e-Procurement",
    description: "Government procurement and tender portal.",
    url: "https://eprocurement.ap.gov.in/",
    category: "finance-treasury",
    tags: ["procurement", "tender", "purchase"],
  },
];

export function filterPortals(query: string, category?: PortalCategory): OfficialPortal[] {
  const q = query.trim().toLowerCase();
  return officialPortals.filter((portal) => {
    if (category && portal.category !== category) return false;
    if (!q) return true;
    const haystack = [
      portal.name,
      portal.teluguName ?? "",
      portal.description,
      ...portal.tags,
      portalCategoryLabels[portal.category].en,
      portalCategoryLabels[portal.category].te,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
