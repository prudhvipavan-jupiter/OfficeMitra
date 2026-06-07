#!/usr/bin/env node
/**
 * Seeds launch content: P0 articles, documents, templates, updates, download files.
 * Run: node scripts/seed-launch.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function write(filePath, content) {
  const full = path.join(root, filePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf-8");
  console.log("Wrote", filePath);
}

function articleSection(title, body) {
  return `## ${title}\n\n${body}\n`;
}

function buildArticle({
  title,
  slug,
  category,
  tags,
  summary,
  telugu_summary,
  procedure,
  overview,
  rules,
  gos,
  procedureSteps,
  checklist,
  draft,
  sr,
  audit,
  refs,
}) {
  const fm = `---
title: "${title}"
slug: ${slug}
category: ${category}
tags: [${tags.map((t) => t).join(", ")}]
summary: "${summary}"
telugu_summary: "${telugu_summary}"
status: published
published_at: 2026-06-01
updated_at: 2026-06-07
author: OfficeMitra
related_procedures: [${procedure}]
verified_go: "Verify current GO on GOIR before processing"
expert_assistance_cta: true
---

`;
  return (
    fm +
    articleSection("Overview", overview) +
    articleSection("Applicable Rules", rules) +
    articleSection("Government Orders", gos) +
    articleSection("Procedure", procedureSteps) +
    articleSection("Checklist", checklist) +
    articleSection("Sample Draft", draft) +
    articleSection("Service Register Entry", sr) +
    articleSection("Common Audit Objections", audit) +
    articleSection("References", refs)
  );
}

const articles = [
  {
    path: "content/articles/establishment/promotion-zone-category.md",
    data: {
      title: "Promotion — Zone and Category Procedure",
      slug: "promotion-zone-category",
      category: "establishment",
      tags: ["promotion", "establishment", "seniority"],
      summary:
        "How to process zone and category promotions in AP Health Department institutions — eligibility, proceedings, and SR entry.",
      telugu_summary:
        "జోన్ మరియు క్యాటగిరీ promotion ప్రక్రియ — అర్హత, proceedings మరియు SR entry.",
      procedure: "promotion-procedure",
      overview:
        "Zone and category promotion is processed when vacancies arise and eligible employees are considered as per seniority and rule position. The establishment section prepares the proposal, routes it through the competent authority, and updates records after approval.",
      rules:
        "- AP State and Subordinate Service Rules\n- Relevant service-specific promotion rules\n- Seniority rules applicable to the category\n- Reservation rules where applicable",
      gos:
        "Verify latest promotion-related GOs on [GOIR](https://goir.ap.gov.in/). Cross-check department circulars for Health Department categories before finalizing proceedings.",
      procedureSteps:
        "1. Verify vacancy and recruitment rules\n2. Prepare eligibility / seniority list\n3. Draft promotion proceedings\n4. Obtain approval from competent authority\n5. Issue promotion orders\n6. Update Service Register and service book",
      checklist:
        "- [ ] Vacancy position verified\n- [ ] Seniority list prepared\n- [ ] ACRs and disciplinary status checked\n- [ ] Proceedings drafted\n- [ ] Orders issued\n- [ ] SR entry made",
      draft:
        "**Subject:** Establishment — Promotion — Reg.\n\nProceedings for promotion of Sri/Smt. ___ from ___ to ___ vide vacancy No. ___ dated ___.",
      sr:
        "*Promoted from ___ to ___ vide Proc.No. ___ dated ___.*",
      audit:
        "1. Promotion before vacancy exists\n2. Seniority errors\n3. Missing ACR scrutiny\n4. SR not updated after order",
      refs:
        "- Related procedure: [Promotion Procedure](/procedures/promotion-procedure)\n- Document: Promotion Rules Reference Sheet",
    },
  },
  {
    path: "content/articles/establishment/service-register-maintenance.md",
    data: {
      title: "Service Register — Maintenance and Corrections",
      slug: "service-register-maintenance",
      category: "establishment",
      tags: ["service-register", "establishment", "audit"],
      summary:
        "Guidelines for maintaining and correcting Service Register entries in government offices.",
      telugu_summary:
        "Service Register నిర్వహణ మరియు corrections — సరైన entries మరియు audit objections.",
      procedure: "service-register-maintenance-procedure",
      overview:
        "The Service Register (SR) is the primary record of an employee's service history. Errors in SR entries are among the most common audit objections. Proper maintenance at the time of each event prevents costly corrections later.",
      rules:
        "- AP Financial Code and Service Register instructions\n- Departmental manuals on SR maintenance\n- Treasury and establishment circulars",
      gos:
        "Refer to Service Register Maintenance Manual and latest finance/establishment circulars on SR corrections.",
      procedureSteps:
        "1. Record every service event on date of occurrence\n2. Use correct format and reference order numbers\n3. For corrections, prepare note with supporting documents\n4. Route correction proposal to competent authority\n5. Make correction entry without overwriting — score out and authenticate",
      checklist:
        "- [ ] Event recorded promptly\n- [ ] Order number and date cited\n- [ ] Signed by competent authority\n- [ ] Cross-checked with service book",
      draft:
        "**Note:** Proposal for correction of SR entry of Sri/Smt. ___ at Sl.No. ___ — Reg.",
      sr:
        "Correction entry format: score out incorrect entry, write correct entry, cite correction order number and date.",
      audit:
        "1. Overwriting without authentication\n2. Missing entries for promotion/transfer\n3. Date discrepancies with orders\n4. Unsigned entries",
      refs:
        "- Related procedure: [SR Maintenance Procedure](/procedures/service-register-maintenance-procedure)",
    },
  },
  {
    path: "content/articles/finance/apgli-loan-application.md",
    data: {
      title: "APGLI Loan — Application and Sanction",
      slug: "apgli-loan-application",
      category: "finance",
      tags: ["apgli", "finance", "loan"],
      summary:
        "Complete guide to APGLI loan application, sanction, and recovery through pay bills.",
      telugu_summary:
        "APGLI loan application మరియు sanction procedure — documents మరియు pay bill recovery.",
      procedure: "apgli-loan-procedure",
      overview:
        "APGLI policyholders may apply for loans subject to scheme rules and premium payment history. The establishment section forwards applications through the DDO; recovery is effected through monthly pay bills after sanction.",
      rules:
        "- APGLI Scheme rules\n- Loan eligibility and ceiling limits\n- Recovery through pay bill instructions",
      gos:
        "Verify latest APGLI circulars on [apgli.ap.gov.in](https://www.apgli.ap.gov.in/) and scheme amendments before processing.",
      procedureSteps:
        "1. Verify subscription and eligibility\n2. Collect application with enclosures\n3. Forward to DDO for sanction\n4. After sanction, arrange disbursement\n5. Ensure recovery entries in pay bill",
      checklist:
        "- [ ] Application complete\n- [ ] Premium paid up to date\n- [ ] Sanction obtained\n- [ ] Recovery schedule in pay bill",
      draft:
        "Forwarding letter for APGLI loan application of Sri/Smt. ___ — Reg.",
      sr:
        "Not applicable unless loan affects service benefits — verify scheme rules.",
      audit:
        "1. Loan without proper sanction\n2. Recovery not started in pay bill\n3. Exceeding eligible amount",
      refs:
        "- Related procedure: [APGLI Loan Procedure](/procedures/apgli-loan-procedure)",
    },
  },
  {
    path: "content/articles/finance/gpf-advance.md",
    data: {
      title: "GPF Advance — Temporary and Non-Temporary",
      slug: "gpf-advance",
      category: "finance",
      tags: ["gpf", "finance", "advance"],
      summary:
        "How to process GPF temporary and non-temporary advances — eligibility, forms, and sanction.",
      telugu_summary:
        "GPF advance (temporary/non-temporary) — application, sanction మరియు recovery.",
      procedure: "gpf-advance-procedure",
      overview:
        "Government servants subscribed to GPF may apply for advances for specified purposes. Temporary advances are recovered in installments; non-temporary advances follow separate rules. Processing is through the DDO and AG/GPF authorities as applicable.",
      rules:
        "- AP GPF Rules\n- Purpose-wise advance limits\n- Recovery schedules",
      gos:
        "Refer to latest GPF rules on AG AP portal and verify purpose eligibility before forwarding.",
      procedureSteps:
        "1. Verify GPF account and balance\n2. Complete advance application with purpose\n3. Route through DDO\n4. After sanction, record recovery in pay bill\n5. Update GPF register",
      checklist:
        "- [ ] Application with purpose\n- [ ] Account balance verified\n- [ ] Sanction order\n- [ ] Recovery commenced",
      draft:
        "Application for GPF advance of Rs. ___ for the purpose of ___ — Reg.",
      sr:
        "Record advance sanction if required by departmental instructions.",
      audit:
        "1. Advance for ineligible purpose\n2. Recovery not effected\n3. Missing sanction on file",
      refs:
        "- Related procedure: [GPF Advance Procedure](/procedures/gpf-advance-procedure)",
    },
  },
  {
    path: "content/articles/finance/medical-reimbursement.md",
    data: {
      title: "Medical Reimbursement — Processing Guide",
      slug: "medical-reimbursement",
      category: "finance",
      tags: ["medical", "reimbursement", "finance", "health"],
      summary:
        "Processing medical reimbursement claims in Health Department institutions — bills, approval, and treasury.",
      telugu_summary:
        "Medical reimbursement claims processing — bills, approval మరియు treasury submission.",
      procedure: "medical-reimbursement-procedure",
      overview:
        "Employees and dependents may claim medical reimbursement as per AP rules. Hospital establishment sections must verify bills, prescriptions, and eligibility before routing for approval and payment.",
      rules:
        "- Medical reimbursement rules for AP government employees\n- Health Department circulars\n- Ceiling and eligibility conditions",
      gos:
        "Verify latest medical reimbursement circulars from Finance/Health Department before processing claims.",
      procedureSteps:
        "1. Verify eligibility and ceiling\n2. Check bills and prescriptions\n3. Prepare claim in prescribed format\n4. Route for approval\n5. Submit to treasury for payment",
      checklist:
        "- [ ] Prescriptions attached\n- [ ] Original bills verified\n- [ ] Within ceiling limits\n- [ ] Approval obtained",
      draft:
        "Medical reimbursement bill of Sri/Smt. ___ for treatment during ___ — Reg.",
      sr:
        "Generally not required unless specific departmental instruction applies.",
      audit:
        "1. Claims without prescriptions\n2. Exceeding ceiling\n3. Duplicate claims for same period",
      refs:
        "- Related procedure: [Medical Reimbursement Procedure](/procedures/medical-reimbursement-procedure)",
    },
  },
  {
    path: "content/articles/leave/el-encashment-retirement.md",
    data: {
      title: "EL Encashment on Retirement",
      slug: "el-encashment-retirement",
      category: "leave",
      tags: ["leave", "el", "encashment", "retirement"],
      summary:
        "Procedure for earned leave encashment when a government servant retires or exits service.",
      telugu_summary:
        "Retirement/samayam poyinappudu EL encashment procedure మరియు documents.",
      procedure: "el-encashment-procedure",
      overview:
        "On retirement, resignation, or death in service, unused Earned Leave may be encashed subject to rules. Establishment must verify leave account, prepare proposal, and coordinate with pay section for payment.",
      rules:
        "- AP Leave Rules\n- Encashment limits on retirement\n- Calculation methodology",
      gos:
        "Refer to AP Leave Rules and latest finance circulars on leave encashment at retirement.",
      procedureSteps:
        "1. Verify leave account balance\n2. Calculate encashable EL\n3. Prepare encashment proposal\n4. Obtain approval\n5. Include in final pay/settlement bill",
      checklist:
        "- [ ] Leave account verified\n- [ ] Calculation checked\n- [ ] Retirement order on file\n- [ ] Encashment included in settlement",
      draft:
        "Proposal for encashment of ___ days EL of Sri/Smt. ___ on retirement — Reg.",
      sr:
        "*EL encashment ___ days vide Proc.No. ___ dated ___.*",
      audit:
        "1. Wrong EL balance used\n2. Encashment beyond eligible limit\n3. Missing leave account extract",
      refs:
        "- Related procedure: [EL Encashment Procedure](/procedures/el-encashment-procedure)",
    },
  },
  {
    path: "content/articles/treasury/bill-submission-treasury.md",
    data: {
      title: "Bill Submission — Treasury Procedure",
      slug: "bill-submission-treasury",
      category: "treasury",
      tags: ["treasury", "bill", "finance"],
      summary:
        "How to prepare and submit contingent and other bills to treasury — sanctions, heads of account, and tracking.",
      telugu_summary:
        "Treasury ku bill submission — sanctions, head of account మరియు tracking.",
      procedure: "bill-submission-procedure",
      overview:
        "All payments from government funds require proper bills submitted to treasury with administrative and financial sanctions, correct head of account, and supporting vouchers. DDOs and bill clerks must follow treasury procedures to avoid returns.",
      rules:
        "- AP Financial Code\n- Treasury code and bill forms\n- Delegation of financial powers",
      gos:
        "Refer to CFMS/treasury user guides and latest finance circulars on bill submission.",
      procedureSteps:
        "1. Collect vouchers and sanctions\n2. Prepare bill with correct HoA\n3. DDO certification\n4. Submit to treasury\n5. Track payment status and update registers",
      checklist:
        "- [ ] Sanctions attached\n- [ ] HoA correct\n- [ ] Vouchers complete\n- [ ] DDO signed\n- [ ] Treasury acknowledgment retained",
      draft:
        "Office note for submission of contingent bill No. ___ for Rs. ___ — Reg.",
      sr:
        "Not applicable unless payment relates to individual employee benefits.",
      audit:
        "1. Bills without sanction\n2. Wrong head of account\n3. Missing vouchers\n4. Duplicate payments",
      refs:
        "- Related procedure: [Bill Submission Procedure](/procedures/bill-submission-procedure)",
    },
  },
];

for (const { path: p, data } of articles) {
  write(p, buildArticle(data));
}

// Update probation with telugu
const probationPath = path.join(root, "content/articles/establishment/probation-declaration.md");
let probation = fs.readFileSync(probationPath, "utf-8");
if (!probation.includes("telugu_summary")) {
  probation = probation.replace(
    "summary:",
    'telugu_summary: "Probation declaration procedure — eligibility, proceedings, SR entry."\nupdated_at: 2026-06-07\nsummary:'
  );
  fs.writeFileSync(probationPath, probation);
}

// Service register procedure
write(
  "content/procedures/establishment/service-register-maintenance-procedure.md",
  `---
title: "Service Register Maintenance — Step-by-Step"
slug: service-register-maintenance-procedure
category: establishment
summary: "Workflow for SR entries and authenticated corrections."
estimated_time: "1-2 working days"
status: published
published_at: 2026-06-01
related_articles: [service-register-maintenance]
---

## Step 1: Record Events Promptly

Enter promotion, transfer, leave, increment, and probation events on the date of effect.

## Step 2: Verify Against Orders

Cross-check each entry with the corresponding order number and date.

## Step 3: Prepare Correction Proposal

For errors, prepare a note citing the incorrect entry and supporting correct order.

## Step 4: Obtain Approval

Route to Superintendent or competent authority for correction approval.

## Step 5: Make Authenticated Correction

Score out wrong entry, enter correction with order reference, authenticate.
`
);

write(
  "content/procedures/leave/el-encashment-procedure.md",
  `---
title: "EL Encashment on Retirement — Step-by-Step"
slug: el-encashment-procedure
category: leave
summary: "Workflow for EL encashment at retirement."
estimated_time: "3-5 working days"
status: published
published_at: 2026-06-01
related_articles: [el-encashment-retirement]
---

## Step 1: Obtain Leave Account

Get updated leave account from leave section.

## Step 2: Calculate Encashable EL

Apply rules for maximum encashable days on retirement.

## Step 3: Prepare Proposal

Draft encashment proposal with calculation annexure.

## Step 4: Route for Approval

Submit to competent authority for approval.

## Step 5: Include in Settlement

Coordinate with pay section for inclusion in final settlement bill.
`
);

// Documents metadata - 20 items
const documents = [
  ["go-probation-rules", "GO Ms.No.123 — Probation Rules Amendment", "go", "GO Ms.No.123", "2020-05-15", "General Administration", "establishment", 2020, "Amendment to probation rules for AP state services", ["probation-declaration"]],
  ["go-promotion-sr", "GO Ms.No.45 — Promotion and Seniority", "go", "GO Ms.No.45", "2019-03-10", "General Administration", "establishment", 2019, "Rules on promotion and seniority fixation", ["promotion-zone-category"]],
  ["go-leave-rules", "AP Leave Rules — Extract", "manual", "Leave Rules", "2022-01-01", "Finance Department", "leave", 2022, "Earned leave and encashment provisions", ["el-encashment-retirement"]],
  ["go-apgli-scheme", "APGLI Scheme Rules — Summary", "manual", "APGLI Rules", "2021-06-01", "Finance Department", "finance", 2021, "APGLI loan and subscription rules summary", ["apgli-loan-application"]],
  ["go-gpf-rules", "GPF Rules — Advance Provisions", "manual", "GPF Rules", "2020-08-15", "Finance Department", "finance", 2020, "GPF advance purposes and limits", ["gpf-advance"]],
  ["circular-med-reimb-2024", "Medical Reimbursement Circular 2024", "circular", "Circular 456/2024", "2024-08-01", "Health Department", "finance", 2024, "Revised medical reimbursement procedure", ["medical-reimbursement"]],
  ["manual-sr-maintenance", "Service Register Maintenance Manual", "manual", "SR Manual", "2023-01-10", "Finance Department", "establishment", 2023, "SR maintenance and correction guidelines", ["service-register-maintenance"]],
  ["circular-treasury-bills", "Treasury Bill Submission Circular", "circular", "Circular 112/2023", "2023-04-01", "Finance Department", "treasury", 2023, "Bill submission through CFMS/treasury", ["bill-submission-treasury"]],
  ["form-probation-proceedings", "Probation Proceedings Format", "form", "Form EST-01", "2023-01-01", "Health Department", "establishment", 2023, "Standard probation declaration format", ["probation-declaration"]],
  ["form-gpf-advance", "GPF Advance Application Form", "form", "GPF Form-3", "2022-01-01", "AG AP", "finance", 2022, "GPF advance application", ["gpf-advance"]],
  ["checklist-promotion", "Promotion Processing Checklist", "checklist", "CHK-PROMO", "2024-01-01", "OfficeMitra", "establishment", 2024, "Checklist for zone/category promotion", ["promotion-zone-category"]],
  ["checklist-probation", "Probation Declaration Checklist", "checklist", "CHK-PROB", "2024-01-01", "OfficeMitra", "establishment", 2024, "Probation processing checklist", ["probation-declaration"]],
  ["go-da-revision", "DA Revision GO — Reference", "go", "GO Ms.No.78", "2025-01-15", "Finance Department", "finance", 2025, "DA rate revision effective date", []],
  ["circular-apgli-premium", "APGLI Premium Deduction Circular", "circular", "Circular 89/2025", "2025-03-01", "Finance Department", "finance", 2025, "Premium deduction in pay bills", ["apgli-loan-application"]],
  ["manual-cfms-ess", "CFMS Employee Self Service Guide", "manual", "CFMS ESS", "2024-06-01", "APCFSS", "finance", 2024, "CFMS ESS for personnel administration", []],
  ["form-el-encashment", "EL Encashment Application", "form", "Leave Form-E", "2022-01-01", "Finance Department", "leave", 2022, "EL encashment on retirement application", ["el-encashment-retirement"]],
  ["go-conduct-rules", "Conduct Rules — Extract", "go", "Conduct Rules", "2018-01-01", "General Administration", "service-rules", 2018, "Disciplinary procedure overview", []],
  ["circular-health-est", "Health Dept Establishment Circular", "circular", "HD/Est/2024/12", "2024-11-01", "Health Department", "establishment", 2024, "Establishment processing in hospitals", []],
  ["checklist-med-reimb", "Medical Reimbursement Checklist", "checklist", "CHK-MED", "2024-01-01", "OfficeMitra", "finance", 2024, "Medical claim verification checklist", ["medical-reimbursement"]],
  ["form-bill-submission", "Contingent Bill Format", "form", "Bill Form-T", "2023-01-01", "Treasury", "treasury", 2023, "Contingent bill submission format", ["bill-submission-treasury"]],
];

const docMeta = documents.map(([id, title, type, number, date, department, category, year, subject, related]) => ({
  id, title, type, number, date, department, category, year, subject,
  related_articles: related,
  file: `/downloads/documents/${id}.txt`,
}));

write("content/documents/metadata.json", JSON.stringify(docMeta, null, 2));

for (const [id, title] of documents.map((d) => [d[0], d[1]])) {
  write(
    `public/downloads/documents/${id}.txt`,
    `${title}\n\nOfficeMitra Reference Document\n========================\n\nThis is a reference summary for administrative guidance.\nVerify the official document on GOIR (https://goir.ap.gov.in/) before taking official action.\n\n© OfficeMitra — TheOfficeMitra.com\n`
  );
}

// Templates - 8 items
const templates = [
  ["probation-proceedings-template", "Probation Declaration Proceedings", "establishment", "Standard proceedings for probation declaration.", "Fill employee name, designation, appointment order ref, probation period.", ["probation-declaration"], ["probation-declaration-procedure"]],
  ["promotion-proceedings-template", "Promotion Proceedings", "establishment", "Proceedings format for zone/category promotion.", "Include vacancy ref, seniority, and promoted employee details.", ["promotion-zone-category"], ["promotion-procedure"]],
  ["sr-entry-template", "Service Register Entry — Probation", "establishment", "SR entry for probation completion.", "Reference proceeding number and date.", ["probation-declaration"], ["probation-declaration-procedure"]],
  ["sr-correction-note", "SR Correction Note", "establishment", "Note for authenticated SR correction.", "Cite incorrect entry and correction order.", ["service-register-maintenance"], ["service-register-maintenance-procedure"]],
  ["apgli-loan-application-template", "APGLI Loan Application Covering Letter", "finance", "Forwarding letter for APGLI loan.", "Attach application and premium statement.", ["apgli-loan-application"], ["apgli-loan-procedure"]],
  ["gpf-advance-application-template", "GPF Advance Application", "finance", "GPF advance application format.", "State purpose and amount clearly.", ["gpf-advance"], ["gpf-advance-procedure"]],
  ["medical-reimbursement-bill-template", "Medical Reimbursement Bill", "finance", "Bill format for medical claims.", "Attach prescriptions and original bills.", ["medical-reimbursement"], ["medical-reimbursement-procedure"]],
  ["el-encashment-application-template", "EL Encashment Application", "leave", "Application for EL encashment on retirement.", "Include leave account extract and calculation.", ["el-encashment-retirement"], ["el-encashment-procedure"]],
];

const tplMeta = templates.map(([id, title, category, description, usage_notes, articles, procs]) => ({
  id, title, category, description, usage_notes,
  related_articles: articles,
  related_procedures: procs,
  file_docx: `/downloads/templates/${id}.txt`,
  file_pdf: `/downloads/templates/${id}.txt`,
}));

write("content/templates/metadata.json", JSON.stringify(tplMeta, null, 2));

for (const [id, title, , description] of templates) {
  write(
    `public/downloads/templates/${id}.txt`,
    `${title}\n\n${description}\n\n--- TEMPLATE BODY ---\n\n[Institution Name]\n[Date]\n\nSubject: _______________\n\nReference: _______________\n\n---\n\nOfficeMitra Template — verify format with your controlling officer.\n`
  );
}

// Updates
const updates = [
  {
    slug: "apgli-premium-june-2026",
    title: "APGLI Premium Deduction — Pay Bill Update",
    date: "2026-06-01",
    category: "finance",
    what_changed: "Reminder to verify APGLI premium rates in June 2026 pay bills.",
    who_is_affected: "All APGLI subscribers in Health Department institutions.",
    action_required: "Update deduction schedules in pay bills from June 2026.",
  },
  {
    slug: "medical-reimbursement-2024-circular",
    title: "Medical Reimbursement Circular — Implementation",
    date: "2024-09-01",
    category: "health",
    what_changed: "Revised documentation requirements for medical reimbursement claims.",
    who_is_affected: "All employees claiming medical reimbursement through institutions.",
    action_required: "Update local checklists and verify prescriptions and bills per circular.",
  },
  {
    slug: "cfms-ess-reminder",
    title: "CFMS ESS — Employee Data Update Reminder",
    date: "2026-05-15",
    category: "establishment",
    what_changed: "Periodic reminder to keep CFMS employee master data current.",
    who_is_affected: "DDOs and establishment staff in all departments.",
    action_required: "Verify new appointments and transfers updated in CFMS within 7 days.",
  },
  {
    slug: "leave-encashment-retirement",
    title: "EL Encashment at Retirement — Checklist Update",
    date: "2026-04-01",
    category: "establishment",
    what_changed: "Clarification on leave account verification before retirement settlement.",
    who_is_affected: "Establishment sections processing retirements.",
    action_required: "Obtain leave account extract before preparing encashment proposal.",
  },
];

for (const u of updates) {
  write(
    `content/updates/2026/${u.slug}.md`,
    `---
title: "${u.title}"
slug: ${u.slug}
date: ${u.date}
category: ${u.category}
what_changed: "${u.what_changed}"
who_is_affected: "${u.who_is_affected}"
action_required: "${u.action_required}"
status: published
---

See linked articles and documents in OfficeMitra for detailed procedure guidance.
`
  );
}

console.log("\nLaunch seed complete.");
