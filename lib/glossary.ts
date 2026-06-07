export interface GlossaryTerm {
  term: string;
  telugu?: string;
  definition: string;
  category: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "APGLI",
    telugu: "ఏపీజీఎల్ఐ",
    definition:
      "Andhra Pradesh Government Life Insurance — mandatory life insurance scheme for AP government employees with loan and claim facilities.",
    category: "Finance",
  },
  {
    term: "GPF",
    telugu: "జీపీఎఫ్",
    definition:
      "General Provident Fund — provident fund account for government servants; advances and final withdrawal per GPF rules.",
    category: "Finance",
  },
  {
    term: "CFMS",
    definition:
      "Comprehensive Financial Management System — AP treasury system for bill submission, payments, and DDO functions.",
    category: "Treasury",
  },
  {
    term: "DDO",
    telugu: "డీడీఓ",
    definition:
      "Drawing and Disbursing Officer — officer responsible for drawing pay and submitting bills to treasury.",
    category: "Treasury",
  },
  {
    term: "Service Register (SR)",
    telugu: "సర్వీస్ రిజిస్టర్",
    definition:
      "Official record of an employee's service history — promotions, increments, leave, probation, and other events.",
    category: "Establishment",
  },
  {
    term: "GO / G.O.",
    telugu: "ప్రభుత్వ ఉత్తర్వు",
    definition:
      "Government Order — official order issued by government departments; authoritative source for rules and policy.",
    category: "General",
  },
  {
    term: "GOIR",
    definition:
      "Government Orders Information Repository — official AP portal to search and download government orders.",
    category: "General",
  },
  {
    term: "Probation",
    telugu: "ప్రోబేషన్",
    definition:
      "Trial period after appointment; on satisfactory completion, probation is declared and service confirmed.",
    category: "Establishment",
  },
  {
    term: "ACR",
    definition:
      "Annual Confidential Report — performance assessment report required for promotion and probation declaration.",
    category: "Establishment",
  },
  {
    term: "EOL",
    definition:
      "Extraordinary Leave — leave without pay; may extend probation period when taken during probation.",
    category: "Leave",
  },
  {
    term: "EL",
    telugu: "ఆర్జిత సెలవు",
    definition: "Earned Leave — leave earned by service; encashable on retirement subject to rules.",
    category: "Leave",
  },
  {
    term: "PRC",
    definition:
      "Pay Revision Commission — revision of pay scales and DA for government employees.",
    category: "Finance",
  },
  {
    term: "EHS",
    definition:
      "Employee Health Scheme — medical benefits scheme for AP government employees and dependents.",
    category: "Health",
  },
  {
    term: "NIDHI",
    definition: "Payroll portal for AP government employees — pay slips and salary details.",
    category: "Finance",
  },
  {
    term: "Proceedings",
    telugu: "ప్రొసీడింగ్స్",
    definition:
      "Internal office note/order prepared by establishment section for administrative actions.",
    category: "Establishment",
  },
  {
    term: "Head of Office",
    definition:
      "Competent authority for establishment matters at institution level (e.g. Superintendent in hospitals).",
    category: "Establishment",
  },
  {
    term: "Treasury Bill",
    definition:
      "Bill submitted to treasury for payment of salary, allowances, or contingent expenses.",
    category: "Treasury",
  },
  {
    term: "UPS",
    definition:
      "Unified Pension Scheme — pension framework for central/state employees under revised rules.",
    category: "Finance",
  },
  {
    term: "Zone / Category",
    definition:
      "Promotion zones and categories under AP service rules determining seniority and promotion panels.",
    category: "Establishment",
  },
  {
    term: "Controlling Officer",
    definition:
      "Superior officer with supervisory and sanctioning authority over subordinate staff.",
    category: "General",
  },
];

export function searchGlossary(query: string): GlossaryTerm[] {
  const q = query.toLowerCase().trim();
  if (!q) return glossaryTerms;
  return glossaryTerms.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q) ||
      t.telugu?.includes(q) ||
      t.category.toLowerCase().includes(q)
  );
}
