/**
 * Detailed editorial briefing content — full guides, not one-line summaries.
 */
import { formatDocumentsMarkdown } from "./document-links";
import type { IntelDraft } from "./draft-generator";

interface BriefingTopic {
  title: string;
  category: string;
  url: string;
  knowledgeSlug: string;
  build: () => Omit<IntelDraft, "title"> & { title: string };
}

function section(title: string, body: string): string {
  return `## ${title}\n\n${body.trim()}\n`;
}

const TOPICS: BriefingTopic[] = [
  {
    title: "Probation Declaration — Complete Procedure Guide for Establishment Staff",
    category: "Establishment",
    url: "https://goir.ap.gov.in/",
    knowledgeSlug: "probation-declaration",
    build() {
      return {
        title: this.title,
        summary:
          "A comprehensive walkthrough for declaring probation of government servants in AP Health Department institutions — from ACR scrutiny to proceedings format, competent authority approval, and authenticated Service Register entry.",
        what_changed:
          "This guide consolidates the standard probation declaration workflow under FR 9 and AP State & Subordinate Service Rules. Establishment sections must verify completion of the probation period, satisfactory ACRs, and absence of pending disciplinary proceedings before issuing confirmation orders.",
        who_is_affected:
          "Establishment assistants, Superintendents, and Head Office staff in District Hospitals, Area Hospitals, and PHCs; DDO sections for pay fixation after confirmation; employees completing two-year probation as direct recruits.",
        action_required:
          "1. List all employees completing probation this quarter\n2. Collect and scrutinize ACRs for the full probation period\n3. Verify vigilance/disciplinary clearance\n4. Draft proceedings citing FR 9 and applicable service rules\n5. Obtain Superintendent/Competent Authority signature\n6. Make SR entry on date of order with proceeding number\n7. Forward copies to AG, DDO, and personal file",
        reference_source: "Verify latest probation GOs on GOIR and Health Department service rules before issuing orders.",
        department_impact: "Establishment",
        keywords: ["probation", "establishment", "ACR", "service register", "confirmation", "FR 9"],
        body: [
          section(
            "Overview",
            "Probation declaration is one of the most important establishment functions. After a direct recruit completes the prescribed probation period (generally two years), the competent authority must pass orders declaring that the employee has satisfactorily completed probation. Failure to declare probation on time leads to pay fixation delays, seniority disputes, and audit objections."
          ),
          section(
            "Applicable rules",
            "- Fundamental Rule 9 (Probation)\n- AP State and Subordinate Service Rules, 1996\n- AP Medical and Health Department Service Rules\n- Service Register maintenance instructions\n- Relevant vigilance clearance norms"
          ),
          section(
            "Step-by-step procedure",
            "1. **Verify appointment order** — Note date of joining and category of post\n2. **Calculate probation period** — Usually two years from date of joining for direct recruits\n3. **Obtain ACRs** — Performance records for each year of probation; minimum rating as per rules\n4. **Check disciplinary status** — Confirm no pending charge memo, suspension, or vigilance enquiry\n5. **Prepare draft proceedings** — Cite appointment order, probation period, ACR summary, and rule position\n6. **Route for approval** — Superintendent or competent authority as per delegation\n7. **Issue orders** — Signed proceedings with effective date of confirmation\n8. **Update records** — SR entry, service book, seniority register, and intimation to DDO for increment if due"
          ),
          section(
            "Practical example",
            "Sri Rama Rao, Staff Nurse, joined District Hospital Kurnool on 01-04-2024. After two years, establishment verified ACRs for 2024-25 and 2025-26 (both 'Good'). No disciplinary proceedings were pending. Smt. Lakshmi, Superintendent, issued Proc.No. 112/Estt/2026 dated 05-04-2026 declaring probation with effect from 01-04-2026. SR entry: *Probation declared vide Proc.No. 112/Estt/2026 dated 05-04-2026.*"
          ),
          section(
            "Checklist",
            "- [ ] Appointment order and joining report on file\n- [ ] Probation period correctly calculated\n- [ ] ACRs for full probation period obtained\n- [ ] No pending disciplinary/vigilance issues\n- [ ] Proceedings drafted with rule citations\n- [ ] Competent authority signature obtained\n- [ ] SR entry made with order number and date\n- [ ] DDO informed for pay bill updates if applicable"
          ),
          section(
            "Sample draft proceedings",
            "**OFFICE OF THE SUPERINTENDENT — DISTRICT HOSPITAL**\n\n**Sub:** Establishment — Probation — Declaration — Orders — Issued.\n\n**Ref:** Appointment order dated ___; Joining report dated ___.\n\nSri/Smt. ___ was appointed as ___ and joined on ___. The employee has completed the prescribed probation period satisfactorily. ACRs have been scrutinized. No disciplinary proceedings are pending.\n\n**Therefore,** the employee is declared to have completed probation with effect from ___.\n\nSd/- Superintendent"
          ),
          section(
            "Common audit objections",
            "1. Probation declared before completion of prescribed period\n2. ACRs not scrutinized or missing for probation years\n3. Declaration while disciplinary proceedings pending\n4. SR entry omitted or back-dated incorrectly\n5. Orders issued by authority not competent to confirm"
          ),
          formatDocumentsMarkdown(this.title, this.url),
        ].join("\n"),
      };
    },
  },
  {
    title: "Earned Leave Rules — Detailed Guide for Leave Account Maintenance",
    category: "Leave",
    url: "https://goir.ap.gov.in/",
    knowledgeSlug: "earned-leave-rules",
    build() {
      return {
        title: this.title,
        summary:
          "Complete explanation of Earned Leave accrual, sanction procedure, half-yearly leave account maintenance, and common audit objections under AP Leave Rules for ministerial staff.",
        what_changed:
          "Operational guide covering how EL credits at 15 days per year (with pro-rata rules), how to sanction EL applications, and how to maintain leave accounts in sync with Service Registers.",
        who_is_affected:
          "All ministerial staff, leave sanctioning authorities, establishment sections maintaining leave accounts, and DDO staff reflecting EL in pay bills.",
        action_required:
          "Reconcile leave accounts with SR; process pending EL applications within 7 days; verify EL balance before sanctioning; update leave register after every sanction.",
        reference_source: "Verify AP Leave Rules and latest amendments on GOIR.",
        department_impact: "Leave",
        keywords: ["earned leave", "EL", "leave account", "AP leave rules", "sanction"],
        body: [
          section(
            "Overview",
            "Earned Leave (EL) is the primary leave type for AP government servants. Ministerial staff must understand accrual rates, maximum accumulation limits, sanction procedure, and leave account maintenance to avoid audit objections and employee grievances."
          ),
          section(
            "Key rules",
            "- AP Leave Rules (Fundamental Rules 82-85 as adapted)\n- Maximum accumulation: 300 days (240 days for certain categories — verify current rules)\n- Accrual: 15 days per year credited half-yearly\n- Pro-rata credit for broken periods\n- EL cannot be combined with certain leave types without specific sanction"
          ),
          section(
            "Procedure for EL sanction",
            "1. Employee submits application with dates and EL balance required\n2. Establishment verifies EL balance in leave account\n3. Check overlapping applications and previous sanctions\n4. Obtain recommending officer endorsement\n5. Sanctioning authority approes (Head of Office / delegated authority)\n6. Update leave account register immediately\n7. Communicate sanction to employee and DDO for pay bill if LWP not involved"
          ),
          section(
            "Leave account maintenance",
            "Maintain leave account in prescribed format showing: opening balance, credits (half-yearly), debits (sanctions), closing balance. Cross-check with service register leave entries. Reconcile annually before increment proceedings."
          ),
          section(
            "Practical example",
            "Smt. Lakshmi, Senior Assistant, DH Kurnool had EL balance 45 days on 01-01-2026. She applied for 10 days EL from 15-03-2026. Establishment verified balance, obtained Superintendent's sanction vide Proc.No. 45/Leave/2026, debited 10 days, closing balance 35 days. Entry made in leave account and SR."
          ),
          formatDocumentsMarkdown(this.title, this.url),
        ].join("\n"),
      };
    },
  },
  {
    title: "APGLI Loan Application — Documents, Sanction & Pay Bill Recovery",
    category: "APGLI",
    url: "https://www.apgli.ap.gov.in/",
    knowledgeSlug: "apgli-loan-application",
    build() {
      return {
        title: this.title,
        summary:
          "Detailed guide to APGLI policy loan application — eligibility, required forms, sanction routing through DDO, premium verification, and monthly recovery through CFMS pay bills.",
        what_changed:
          "Step-by-step APGLI loan workflow for Health Department staff including portal verification, document checklist, and recovery schedule preparation.",
        who_is_affected:
          "Employees holding APGLI policies, establishment staff preparing loan applications, DDO section verifying premium payments, and pay bill clerks processing recoveries.",
        action_required:
          "Verify policy status on APGLI portal; collect Form 8, salary certificate, and proceeding; route through competent authority; ensure recovery starts from next pay bill.",
        reference_source: "APGLI portal and latest premium circulars on apgli.ap.gov.in",
        department_impact: "APGLI",
        keywords: ["APGLI", "loan", "premium", "Form 8", "recovery", "pay bill"],
        body: [
          section(
            "Overview",
            "APGLI policy holders can apply for loans against their policy subject to premium payment regularity and policy terms. Establishment and finance sections must ensure correct documentation, proper sanction, and timely recovery through monthly pay bills."
          ),
          section(
            "Required documents",
            "- APGLI loan application (Form 8 or portal-generated form)\n- Latest pay slip / salary certificate\n- Policy bond copy or policy number verification\n- Office certificate confirming employee status\n- Previous loan clearance certificate (if applicable)\n- Proceeding from competent authority"
          ),
          section(
            "Sanction procedure",
            "1. Employee submits application with documents\n2. Establishment verifies service status and policy number\n3. DDO verifies premium deductions in pay bills\n4. Forward to APGLI department / portal submission\n5. On sanction, note loan amount and recovery instalments\n6. Communicate to pay bill section for monthly deduction\n7. Update personal file and recovery register"
          ),
          section(
            "Pay bill recovery",
            "Recovery typically in equal monthly instalments. DDO must ensure recovery code is correctly entered in CFMS pay bill. Verify recovery balance quarterly. On final instalment, obtain clearance from APGLI."
          ),
          formatDocumentsMarkdown(this.title, this.url),
        ].join("\n"),
      };
    },
  },
  {
    title: "GPF Advance — Eligibility, Application & Treasury Processing",
    category: "GPF",
    url: "https://www.apfinance.ap.gov.in/",
    knowledgeSlug: "gpf-advance",
    build() {
      return {
        title: this.title,
        summary:
          "Full guide to GPF temporary and non-temporary advance — eligibility limits, application format, sanction authority, bill preparation, and AG account verification.",
        what_changed:
          "Consolidated GPF advance procedure under AP GPF Rules with document checklist and treasury bill format guidance.",
        who_is_affected:
          "All GPF subscribers, DDO bill section, establishment staff preparing applications, and treasury dealing staff.",
        action_required:
          "Verify GPF balance on AG portal; prepare application with office certificate; obtain sanction; prepare GPF advance bill for treasury.",
        reference_source: "AP GPF Rules on AP Finance portal and AG Andhra Pradesh website",
        department_impact: "GPF",
        keywords: ["GPF", "advance", "AG", "treasury", "subscription"],
        body: [
          section(
            "Overview",
            "General Provident Fund advances are governed by AP GPF Rules. Temporary advances are for specific purposes with simpler sanction; non-temporary advances have higher limits but stricter scrutiny. Establishment must verify subscription regularity before forwarding applications."
          ),
          section(
            "Types of advance",
            "**Temporary advance** — For illness, marriage, education, etc.; recoverable in instalments; limit based on balance.\n\n**Non-temporary advance** — For housing, vehicle, etc.; higher amounts; may require mortgage/hypothecation; longer recovery period."
          ),
          section(
            "Application procedure",
            "1. Employee submits Form with purpose and amount\n2. Verify GPF account balance (AG slip or online)\n3. Check no previous advance outstanding beyond limits\n4. Obtain sanction from competent authority\n5. Prepare GPF advance bill with budget head\n6. Submit to treasury through CFMS\n7. Record recovery schedule in GPF recovery register"
          ),
          section(
            "Treasury objections to avoid",
            "- Incorrect GPF account number\n- Sanction authority not competent for amount\n- Missing office certificate\n- Recovery schedule not indicated\n- Budget head incorrect"
          ),
          formatDocumentsMarkdown(this.title, this.url),
        ].join("\n"),
      };
    },
  },
  {
    title: "Service Register Maintenance — Audit-Safe Entries & Corrections",
    category: "Establishment",
    url: "https://goir.ap.gov.in/",
    knowledgeSlug: "service-register-maintenance",
    build() {
      return {
        title: this.title,
        summary:
          "How to maintain Service Registers correctly — entry format, authentication, correction procedure, and avoiding the most common AG audit objections.",
        what_changed:
          "Best-practice guide for SR entries at every service event: appointment, increment, promotion, transfer, leave, and retirement.",
        who_is_affected:
          "Establishment assistants, record keepers, superintendents, and audit-facing staff in all government offices.",
        action_required:
          "Audit all SR entries against orders issued in last 12 months; prepare correction notes for discrepancies.",
        reference_source: "Service Register instructions on GOIR and Finance Department manuals",
        department_impact: "Establishment",
        keywords: ["service register", "SR", "audit", "correction", "establishment"],
        body: [
          section(
            "Overview",
            "The Service Register is the primary authenticated record of an employee's service history. AG audit scrutinizes SR entries against original orders. Errors and omissions are among the highest-frequency audit paras."
          ),
          section(
            "Correct entry format",
            "Every entry must cite: **event description**, **order number**, **order date**, and **effective date**. Entries must be signed by competent authority. Never overwrite — score out incorrect entries, write correction, cite correction order."
          ),
          section(
            "Events requiring SR entry",
            "- Appointment and joining\n- Probation declaration / confirmation\n- Increment and pay fixation\n- Promotion and transfer\n- Leave exceeding 60 days (where required)\n- Suspension and reinstatement\n- Retirement / termination"
          ),
          section(
            "Correction procedure",
            "1. Identify error with supporting original order\n2. Prepare correction note\n3. Obtain competent authority approval\n4. Make correction entry (score-out method)\n5. Authenticate with signature and date"
          ),
          formatDocumentsMarkdown(this.title, this.url),
        ].join("\n"),
      };
    },
  },
  {
    title: "CFMS Bill Processing — Avoiding Treasury Objections",
    category: "Finance",
    url: "https://cfms.ap.gov.in/",
    knowledgeSlug: "cfms-bill-processing",
    build() {
      return {
        title: this.title,
        summary:
          "Detailed CFMS bill submission guide for DDO staff — bill types, mandatory enclosures, budget head verification, BCR balance check, and resolving treasury objections.",
        what_changed:
          "Operational checklist for contingent bills, pay bills, and GPF/APGLI bills through CFMS with common objection prevention.",
        who_is_affected:
          "DDO assistants, bill clerks, treasury liaison staff, and budget controlling officers.",
        action_required:
          "Pre-check all bills against BCR; verify enclosures; upload to CFMS only after internal checklist completion.",
        reference_source: "CFMS help documents and AP Treasury circulars",
        department_impact: "Finance",
        keywords: ["CFMS", "treasury", "bill", "BCR", "DDO", "objection"],
        body: [
          section(
            "Overview",
            "CFMS (Comprehensive Financial Management System) is the mandatory platform for bill submission in AP. Treasury objections delay payments and create audit findings. Proper pre-submission verification prevents rejections."
          ),
          section(
            "Pre-submission checklist",
            "- [ ] Budget head correct and has allotment balance in BCR\n- [ ] Sanction order attached and valid\n- [ ] Invoice/claim verified and arithmetic checked\n- [ ] TDS deducted where applicable\n- [ ] Vendor/beneficiary bank details verified in CFMS\n- [ ] Previous bill payments adjusted if advance involved\n- [ ] DDO code and HO login credentials active"
          ),
          section(
            "Common treasury objections",
            "1. Insufficient budget allotment\n2. Wrong sub-head or object head\n3. Missing sanction copy\n4. Arithmetic errors in claim\n5. Duplicate bill submission\n6. Expired sanction validity"
          ),
          formatDocumentsMarkdown(this.title, this.url),
        ].join("\n"),
      };
    },
  },
  {
    title: "Increment Sanction — Proceedings, Pay Fixation & Pay Bill Update",
    category: "Establishment",
    url: "https://goir.ap.gov.in/",
    knowledgeSlug: "increment-sanction",
    build() {
      return {
        title: this.title,
        summary:
          "Annual increment procedure — identifying due dates, batch proceedings format, pay fixation under relevant pay scales, and reflecting increment in CFMS pay bills.",
        what_changed:
          "Establishment workflow for timely increment sanction without arrears disputes.",
        who_is_affected:
          "Establishment and DDO staff processing annual increments for ministerial and nursing categories.",
        action_required:
          "Prepare increment due list for current month; batch proceedings for HO approval; update pay fixation and SR.",
        reference_source: "Latest pay revision GOs on GOIR",
        department_impact: "Establishment",
        keywords: ["increment", "pay fixation", "pay scale", "proceedings"],
        body: [
          section("Overview", "Annual increment must be sanctioned on due date to avoid arrears claims. Establishment prepares list; competent authority passes proceedings; DDO reflects in pay bill."),
          section("Procedure", "1. Extract increment due report from service registers\n2. Verify no break in service or suspension period\n3. Prepare batch proceedings\n4. Obtain approval\n5. Issue individual orders or batch order\n6. SR entry and pay fixation memo to DDO\n7. Update CFMS employee pay details"),
          formatDocumentsMarkdown(this.title, this.url),
        ].join("\n"),
      };
    },
  },
  {
    title: "Relinquishment of Promotion under Rule 28 — Procedure & SR Entry",
    category: "Establishment",
    url: "https://goir.ap.gov.in/",
    knowledgeSlug: "relinquishment-promotion-rule-28",
    build() {
      return {
        title: this.title,
        summary:
          "When an employee declines promotion under Rule 28 of AP State & Subordinate Service Rules — application format, proceedings, seniority implications, and SR recording.",
        what_changed:
          "Guide for establishment staff processing Rule 28 relinquishment requests with sample proceedings.",
        who_is_affected:
          "Employees offered promotion who wish to decline; establishment staff processing promotion panels.",
        action_required:
          "Accept written relinquishment application; prepare proceedings; update promotion panel and SR.",
        reference_source: "AP State & Subordinate Service Rules Rule 28 on GOIR",
        department_impact: "Establishment",
        keywords: ["Rule 28", "relinquishment", "promotion", "seniority"],
        body: [
          section("Overview", "Rule 28 allows a government servant to relinquish promotion offered. The application must be voluntary, in writing, and before acceptance of promotion. Establishment must document carefully for seniority and future promotion panels."),
          section("Procedure", "1. Receive written application from employee\n2. Verify identity and promotion offer details\n3. Prepare proceedings noting relinquishment\n4. Obtain competent authority orders\n5. Update promotion panel — remove from current panel\n6. SR entry citing Rule 28 proceedings\n7. Inform employee of seniority consequences"),
          formatDocumentsMarkdown(this.title, this.url),
        ].join("\n"),
      };
    },
  },
  {
    title: "Charge Memo Preparation — Disciplinary Proceedings under CCA Rules",
    category: "Conduct",
    url: "https://goir.ap.gov.in/",
    knowledgeSlug: "charge-memo-preparation",
    build() {
      return {
        title: this.title,
        summary:
          "How to draft charge memos under AP Civil Services (Classification, Control & Appeal) Rules — articles cited, statement of imputation, enquiry procedure, and documentation.",
        what_changed:
          "Disciplinary initiation guide for Heads of Office and establishment staff assisting in charge memo preparation.",
        who_is_affected:
          "Disciplinary authorities, establishment staff, and employees against whom proceedings may be initiated.",
        action_required:
          "Ensure charge memo cites specific rule articles; attach supporting documents; follow CCA Rules timelines.",
        reference_source: "AP CCS (CCA) Rules on GOIR and GAD circulars",
        department_impact: "Conduct",
        keywords: ["charge memo", "CCA rules", "disciplinary", "enquiry"],
        body: [
          section("Overview", "Charge memo is the formal start of minor/major penalty proceedings. It must clearly state articles of charges, statement of imputation of misconduct, and list of documents relied upon."),
          section("Charge memo contents", "- Name, designation, office of charged employee\n- Article(s) of charge with rule violated\n- Statement of imputation of misconduct in specific terms\n- List of documents and witnesses\n- Specimen copy of CCA Rules supplied to employee"),
          section("After issue", "Employee submits written statement of defence. Enquiry officer appointed for major penalties. Minor penalties may follow summary procedure. Maintain strict timeline compliance."),
          formatDocumentsMarkdown(this.title, this.url),
        ].join("\n"),
      };
    },
  },
  {
    title: "Budget Control Register (BCR) — Monthly Reconciliation Guide",
    category: "Finance",
    url: "https://www.apfinance.ap.gov.in/",
    knowledgeSlug: "bcr-maintenance",
    build() {
      return {
        title: this.title,
        summary:
          "How to maintain BCR — allotment entries, expenditure debits, savings surrender, re-appropriation, and monthly reconciliation with CFMS reports.",
        what_changed:
          "DDO guide for BCR maintenance under AP Financial Code with month-end reconciliation steps.",
        who_is_affected:
          "DDO, accounts staff, budget controlling officers in hospitals and district offices.",
        action_required:
          "Complete monthly BCR reconciliation with CFMS expenditure report by 5th of following month.",
        reference_source: "AP Financial Code and budget circulars on AP Finance portal",
        department_impact: "Finance",
        keywords: ["BCR", "budget", "allotment", "surrender", "CFMS"],
        body: [
          section("Overview", "Budget Control Register tracks budget allotment vs expenditure for each head of account. AG audit verifies BCR against treasury accounts. Monthly reconciliation prevents overspending and audit paras."),
          section("BCR columns", "Opening allotment | Additions (re-appropriation in) | Reductions (surrender/re-appropriation out) | Expenditure debited | Closing balance"),
          section("Monthly procedure", "1. Download CFMS expenditure report\n2. Match each bill against BCR head\n3. Debit expenditure in BCR\n4. Identify savings for surrender\n5. Prepare surrender/re-appropriation proposals if needed\n6. Sign BCR after reconciliation\n7. File monthly certificate"),
          formatDocumentsMarkdown(this.title, this.url),
        ].join("\n"),
      };
    },
  },
];

function dayIndex(): number {
  const start = new Date(Date.UTC(2026, 0, 1));
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / 86_400_000);
}

export function getBriefingTopicForDay(offset = 0): BriefingTopic {
  const idx = (dayIndex() + offset) % TOPICS.length;
  return TOPICS[idx];
}

export function getBriefingTopicsForDay(count: number): BriefingTopic[] {
  const out: BriefingTopic[] = [];
  for (let i = 0; i < count && i < TOPICS.length; i++) {
    out.push(getBriefingTopicForDay(i));
  }
  return out;
}

export function buildDetailedBriefingDraft(topic: BriefingTopic): IntelDraft {
  const draft = topic.build();
  return {
    title: draft.title,
    summary: draft.summary,
    what_changed: draft.what_changed,
    who_is_affected: draft.who_is_affected,
    action_required: draft.action_required,
    reference_source: draft.reference_source,
    department_impact: draft.department_impact,
    keywords: draft.keywords,
    body: draft.body,
  };
}

export function buildDetailedBriefingByTitle(title: string): IntelDraft | null {
  const topic = TOPICS.find((t) => t.title === title || title.includes(t.title.slice(0, 30)));
  if (!topic) return null;
  return buildDetailedBriefingDraft(topic);
}

export { TOPICS as BRIEFING_TOPICS };
