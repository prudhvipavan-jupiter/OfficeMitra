/**
 * OfficeMitra — 50 article topics for AP Health Department ministerial staff knowledge base.
 * Imported by generate-hero-articles.mjs
 */

export const allTopics = [
  // ─── Category 1: establishment (15) ───────────────────────────────────────
  {
    title: "Probation Declaration Procedure",
    slug: "probation-declaration",
    category: "establishment",
    tags: ["probation", "establishment", "service-rules", "health-department"],
    summary:
      "Step-by-step guide to declaring probation for newly appointed government servants in AP Health Department institutions, including eligibility verification, proceedings format, and Service Register entry.",
    telugu_summary:
      "కొత్తగా నియమించబడిన ప్రభుత్వ ఉద్యోగుల probation declaration procedure, proceedings format మరియు SR entry.",
    priority: 1,
    primaryRules: [
      "AP State and Subordinate Service Rules, 1996",
      "Fundamental Rule 9 (Probation)",
      "AP Medical and Health Department Service Rules",
      "AP Leave Rules (for probation period leave)",
      "AP Service Register Maintenance Instructions",
    ],
    procedureSteps: [
      "Verify appointment order and date of joining of the employee",
      "Confirm probation period as per category rules (generally two years for direct recruits)",
      "Scrutinize ACR/performance records for the probation period",
      "Prepare probation declaration proceedings citing FR 9 and applicable service rules",
      "Route draft proceedings through controlling officer for approval",
      "Issue probation declaration order signed by competent authority",
      "Make authenticated entry in Service Register and update service book",
      "Forward copy to DDO, AG office, and maintain in personal file",
    ],
    checklist: [
      "Appointment order and joining report on file",
      "Probation period correctly calculated from date of joining",
      "ACRs for probation period obtained and scrutinized",
      "No pending disciplinary proceedings or vigilance clearance issues",
      "Proceedings drafted in prescribed format with rule citations",
      "Competent authority signature obtained",
      "SR entry made on date of order with order number cited",
      "Employee acknowledgment obtained where required",
    ],
    example:
      "Sri Rama Rao, Staff Nurse, was appointed to District Hospital Kurnool vide G.O.Ms.No. 245 Health dated 15-03-2024 and joined on 01-04-2024. After completing two years of probation, the establishment section at DH Kurnool verified his ACRs for 2024-25 and 2025-26, both graded 'Good'. No disciplinary proceedings were pending.\n\nSmt. Lakshmi, Superintendent, prepared probation declaration proceedings recommending declaration of probation with effect from 01-04-2026. The Superintendent, DH Kurnool approved and issued Proc.No. 112/Estt/2026 dated 05-04-2026. The SR entry was made: 'Probation declared vide Proc.No. 112/Estt/2026 dated 05-04-2026.'",
    sampleDraft: `OFFICE OF THE SUPERINTENDENT
DISTRICT HOSPITAL, KURNOOL

Proc.No. ___/Estt/2026                          Date: ___

PROCEEDINGS OF THE SUPERINTENDENT

Sub: Establishment – Probation – Declaration of probation in respect of Sri ___ ___ , Staff Nurse – Orders – Issued.

Ref: 1. G.O.Ms.No. ___ Health, dated ___
     2. Appointment order No. ___ dated ___
     3. Joining report dated ___

Sri/Smt. ___ was appointed as ___ in this institution vide reference 2 above and joined duty on ___. The employee has completed the prescribed probation period of two years satisfactorily. ACRs for the probation period have been scrutinized and found satisfactory. No disciplinary proceedings are pending.

NOW, THEREFORE, the Superintendent is pleased to declare that Sri/Smt. ___ has satisfactorily completed the period of probation and is confirmed in the post with effect from ___.

Sd/- Superintendent
District Hospital, Kurnool`,
    srEntry:
      "Probation declared vide Proc.No. ___/Estt/___ dated ___. Confirmed in the post of ___ with effect from ___.",
    auditObjections: [
      "Probation declared before completion of prescribed period",
      "ACRs for probation period not scrutinized or missing",
      "Declaration issued while disciplinary proceedings pending",
      "SR entry not made or made with incorrect effective date",
      "Proceedings issued by authority not competent for confirmation",
    ],
    goReferences:
      "Verify probation-related G.O.Ms. on [GOIR AP](https://goir.ap.gov.in/) — search 'probation declaration' and 'Medical Health Service Rules'. Cross-check latest Finance Department instructions on [AP Finance](https://www.apfinance.ap.gov.in/) regarding confirmation benefits and increment eligibility after probation.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Relinquishment of Promotion under Rule 28",
    slug: "relinquishment-promotion-rule-28",
    category: "establishment",
    tags: ["promotion", "rule-28", "relinquishment", "establishment"],
    summary:
      "How to process an employee's request to relinquish promotion under Rule 28 of AP State and Subordinate Service Rules, including documentation, competent authority approval, and seniority implications.",
    telugu_summary:
      "Rule 28 under promotion relinquishment request process, documentation మరియు seniority implications.",
    priority: 1,
    primaryRules: [
      "AP State and Subordinate Service Rules, 1996 — Rule 28",
      "AP State and Subordinate Service Rules — Rule 27 (Seniority)",
      "Relevant category-specific promotion rules",
      "AP Reservation Rules for SC/ST/BC",
      "Fundamental Rules on pay fixation on promotion",
    ],
    procedureSteps: [
      "Receive written request from employee to relinquish offered promotion",
      "Verify promotion order/proceedings against which relinquishment is sought",
      "Examine whether relinquishment is within permissible time and circumstances under Rule 28",
      "Prepare note explaining seniority and future promotion implications for employee",
      "Route through controlling officer to competent authority for orders",
      "Issue orders accepting relinquishment and cancel or withhold promotion",
      "Update seniority register, promotion panel records, and Service Register",
      "Inform DDO and AG office if pay fixation or post reversion is involved",
    ],
    checklist: [
      "Written relinquishment request with employee signature on file",
      "Copy of promotion order/proceedings attached",
      "Rule 28 applicability verified for the category and circumstances",
      "Employee counseled regarding seniority and future promotion impact",
      "Competent authority orders obtained",
      "Promotion proceedings cancelled or modified as per orders",
      "Seniority list corrected if required",
      "SR entry made citing relinquishment order",
    ],
    example:
      "Smt. Lakshmi, Pharmacist at Area Hospital Nandyal, was promoted to Senior Pharmacist vide Proc.No. 89/Estt/2025 dated 12-06-2025. She submitted a written request on 20-06-2025 stating personal reasons and requested to continue in the existing post under Rule 28.\n\nThe establishment section prepared a note explaining that relinquishment would retain her in the Pharmacist cadre and she would remain at the bottom of the seniority list for the next promotion cycle. The Superintendent accepted the relinquishment vide Proc.No. 95/Estt/2025 dated 25-06-2025. SR entry was made and the promotion panel was updated accordingly.",
    sampleDraft: `OFFICE OF THE SUPERINTENDENT
AREA HOSPITAL, NANDYAL

Proc.No. ___/Estt/2025                          Date: ___

PROCEEDINGS OF THE SUPERINTENDENT

Sub: Establishment – Promotion – Relinquishment of promotion under Rule 28 by Smt. ___ – Orders – Issued.

Ref: 1. Promotion Proc.No. ___ dated ___
     2. Representation of Smt. ___ dated ___

Smt. ___ , Pharmacist, was promoted to Senior Pharmacist vide reference 1. The employee has submitted a representation (reference 2) requesting to relinquish the said promotion under Rule 28 of AP State and Subordinate Service Rules, 1996, citing personal reasons.

After careful consideration, the Superintendent accepts the relinquishment. The promotion order stands cancelled. The employee shall continue in the post of Pharmacist. Seniority shall be regulated as per Rule 27 read with Rule 28.

Sd/- Superintendent`,
    srEntry:
      "Relinquished promotion to ___ under Rule 28 vide Proc.No. ___ dated ___. Continues in the post of ___.",
    auditObjections: [
      "Relinquishment accepted without written request from employee",
      "Promotion panel not corrected after relinquishment",
      "Seniority not regulated as per Rule 27/28",
      "Pay drawn at promoted scale without valid promotion order",
      "Relinquishment processed after expiry of permissible period",
    ],
    goReferences:
      "Rule 28 is contained in AP State and Subordinate Service Rules available on [GOIR](https://goir.ap.gov.in/). Search for latest clarificatory G.Os on promotion relinquishment and reservation roster implications. Finance Department pay fixation orders on [AP Finance](https://www.apfinance.ap.gov.in/) apply if any pay was fixed on promotion before relinquishment.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Promotion Process – Step by Step",
    slug: "promotion-process-step-by-step",
    category: "establishment",
    tags: ["promotion", "seniority", "panel", "establishment"],
    summary:
      "Complete end-to-end promotion processing workflow for AP Health Department staff — from vacancy identification through panel preparation, proceedings, pay fixation, and record updates.",
    telugu_summary:
      "Health Department staff promotion process — vacancy identification నుండి panel preparation, proceedings, pay fixation వరకు step-by-step guide.",
    priority: 1,
    primaryRules: [
      "AP State and Subordinate Service Rules, 1996",
      "AP Medical and Health Department Service Rules",
      "AP Reservation Rules (for roster vacancies)",
      "Fundamental Rule 22 (Pay on promotion)",
      "AP Leave Rules (for eligibility during promotion period)",
    ],
    procedureSteps: [
      "Identify vacancy and verify recruitment/promotion quota as per rules",
      "Prepare eligibility list checking minimum service, qualifications, and ACR gradings",
      "Prepare draft seniority list and circulate for objections if required",
      "Constitute promotion panel/DPC as per rules and record proceedings",
      "Prepare promotion proceedings naming selected candidates with effective date",
      "Obtain approval from competent appointing authority",
      "Issue promotion orders and communicate to employees and DDO",
      "Effect pay fixation under FR 22, update SR, service book, and seniority register",
      "Fill reservation roster point if applicable and update vacancy position",
    ],
    checklist: [
      "Vacancy position verified against sanctioned strength and roster",
      "Eligibility criteria checked for all candidates",
      "ACRs for prescribed period obtained and graded satisfactorily",
      "Disciplinary/vigilance clearance obtained",
      "Seniority list finalized after objection period",
      "DPC/panel minutes recorded and signed",
      "Promotion orders issued by competent authority",
      "Pay fixation memo prepared and SR updated",
    ],
    example:
      "A Senior Staff Nurse vacancy arose at District Hospital Kurnool due to retirement of Smt. Padma. The establishment section verified the vacancy against roster point No. 45 (OC — General). Sri Rama Rao, Staff Nurse with 8 years service and ACRs graded 'Very Good' for three years, topped the seniority list.\n\nThe Departmental Promotion Committee met on 10-01-2026 and recommended his promotion. Proc.No. 15/Estt/2026 was issued promoting him to Senior Staff Nurse with effect from 01-02-2026. Pay was fixed under FR 22 option (b). SR entry and roster update were completed within 15 days.",
    sampleDraft: `OFFICE OF THE SUPERINTENDENT
DISTRICT HOSPITAL, KURNOOL

Proc.No. ___/Estt/2026                          Date: ___

PROCEEDINGS OF THE SUPERINTENDENT

Sub: Establishment – Promotion – Promotion of Sri ___ from Staff Nurse to Senior Staff Nurse – Orders – Issued.

Ref: 1. Vacancy report dated ___
     2. DPC Minutes dated ___
     3. Seniority list dated ___

In pursuance of the recommendations of the Departmental Promotion Committee (reference 2) and as per seniority (reference 3), the Superintendent is pleased to promote the following:

Sl.No.  Name              From              To                    With effect from
1.      Sri ___           Staff Nurse       Senior Staff Nurse    ___

Pay shall be fixed under FR 22 as per option exercised by the employee.

Sd/- Superintendent`,
    srEntry:
      "Promoted from ___ to ___ with effect from ___ vide Proc.No. ___/Estt/___ dated ___. Pay fixed under FR 22.",
    auditObjections: [
      "Promotion before vacancy exists or without DPC recommendation",
      "Seniority errors in eligibility list",
      "ACRs not scrutinized or below minimum grading accepted",
      "Reservation roster point not filled correctly",
      "Pay fixation not done or SR not updated after promotion",
    ],
    goReferences:
      "Latest promotion-related G.O.Ms. for Medical and Health categories on [GOIR](https://goir.ap.gov.in/). Pay fixation instructions on [AP Finance](https://www.apfinance.ap.gov.in/) — search FR 22 and promotion pay fixation. Reservation roster instructions issued by GAD/BC Welfare available through GOIR.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Preparation of Seniority Lists",
    slug: "seniority-list-preparation",
    category: "establishment",
    tags: ["seniority", "establishment", "promotion", "panel"],
    summary:
      "Guidelines for preparing, publishing, and finalizing seniority lists for AP government employees as per Rule 27 of AP State and Subordinate Service Rules, including inter-se seniority and objection handling.",
    telugu_summary:
      "Rule 27 prakaram seniority lists preparation, publication, objections handling మరియు finalization procedure.",
    priority: 2,
    primaryRules: [
      "AP State and Subordinate Service Rules, 1996 — Rule 27",
      "AP State and Subordinate Service Rules — Rule 28",
      "Category-specific recruitment rules (direct vs promotees)",
      "AP Reservation Rules for roster seniority",
      "Instructions on preparation of common seniority lists",
    ],
    procedureSteps: [
      "Collect date of birth, date of entry into service, and appointment order details for all incumbents",
      "Classify employees as direct recruits, promotees, or appointees under special rules",
      "Apply Rule 27 principles to determine inter-se seniority within each category",
      "Prepare draft seniority list in serial order with relevant dates shown",
      "Publish draft list inviting objections within prescribed period (typically 15 days)",
      "Scrutinize objections received and pass speaking orders on each",
      "Finalize seniority list after objection period and issue authenticated copy",
      "Maintain seniority register and update on every new appointment or promotion",
    ],
    checklist: [
      "Complete data collected for all employees in the category",
      "Direct recruit vs promotee classification verified",
      "Date of commencement of probation/joining correctly recorded",
      "Draft list published with objection deadline notified",
      "All objections disposed with speaking orders",
      "Final list signed by competent authority",
      "Copies circulated to all concerned employees",
      "Seniority register updated and preserved for audit",
    ],
    example:
      "At Community Health Centre, Markapur, the Superintendent directed preparation of a seniority list for Pharmacists (5 incumbents). Smt. Lakshmi prepared the draft using date of joining in the category as the primary criterion. One objection was received from Sri Venkatesh claiming seniority based on earlier temporary service.\n\nAfter verification of temporary service counting rules, the objection was rejected vide Proc.No. 78/Estt/2025. The final seniority list was published on 01-12-2025 and used for the subsequent promotion panel.",
    sampleDraft: `OFFICE OF THE SUPERINTENDENT
COMMUNITY HEALTH CENTRE, MARKAPUR

Proc.No. ___/Estt/2025                          Date: ___

FINAL SENIORITY LIST — PHARMACISTS

(as on ___)

Sl.No.  Name              Date of Birth   Date of Joining   Remarks
1.      Smt. ___          ___             ___               Direct recruit
2.      Sri ___           ___             ___               Promotee

This seniority list is finalized after considering objections received during the period ___ to ___. Objections disposed vide Proc.No. ___ dated ___.

Sd/- Superintendent`,
    srEntry:
      "Seniority in the cadre of ___ fixed at Sl.No. ___ vide seniority list Proc.No. ___ dated ___.",
    auditObjections: [
      "Seniority prepared without considering Rule 27 principles",
      "Temporary service counted without rule authority",
      "Objections not invited or not disposed properly",
      "Seniority list not updated after new appointments",
      "Inter-se seniority between direct recruits and promotees incorrect",
    ],
    goReferences:
      "Rule 27 of AP State and Subordinate Service Rules on [GOIR](https://goir.ap.gov.in/). G.O.Ms. on common seniority lists and counting of temporary service. Department-specific seniority instructions for Medical and Health categories issued by Commissioner of Health.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://health.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
    ],
  },
  {
    title: "Transfer Procedure for Government Employees",
    slug: "transfer-procedure",
    category: "establishment",
    tags: ["transfer", "joining-time", "establishment", "posting"],
    summary:
      "Procedure for processing transfers of AP government employees including transfer orders, joining time, relief and joining reports, and consequential record updates in Health Department institutions.",
    telugu_summary:
      "Government employees transfer procedure — transfer orders, joining time, relief/joining reports మరియు record updates.",
    priority: 2,
    primaryRules: [
      "AP State and Subordinate Service Rules — Transfer provisions",
      "Fundamental Rule 15 (Joining Time on transfer)",
      "AP Leave Rules (leave during joining time)",
      "AP Medical and Health Department transfer policy G.Os",
      "Conduct Rules — permission for outside duties during transfer period",
    ],
    procedureSteps: [
      "Receive transfer order from appointing authority or process internal transfer proposal",
      "Issue reliving orders to employee and communicate to outgoing institution",
      "Employee submits relief report; outgoing DDO closes pay and leave account",
      "Calculate joining time admissible under FR 15 from date of relief",
      "Employee joins new institution within joining time and submits joining report",
      "Incoming institution issues joining acceptance and updates establishment records",
      "Update Service Register, service book, and send intimation to AG/DDO",
      "Transfer personal file, leave account, and APGLI/GPF records to new office",
    ],
    checklist: [
      "Valid transfer order from competent authority on file",
      "Relief report obtained from outgoing institution with date of relief",
      "Pay and leave account closed by outgoing DDO",
      "Joining time calculated correctly under FR 15",
      "Joining report received within admissible joining time",
      "SR entry made at both outgoing and incoming institutions",
      "Personal file transferred with acknowledgment",
      "DDO intimation sent for pay drawal at new station",
    ],
    example:
      "Sri Rama Rao, Lab Technician at District Hospital Kurnool, was transferred to Area Hospital Dhone vide G.O.Rt.No. 1234 dated 15-08-2025. He was relieved on 31-08-2025 and availed 15 days joining time under FR 15. He joined Area Hospital Dhone on 15-09-2025.\n\nSmt. Lakshmi at AH Dhone accepted joining, made SR entry, and requested the DDO Kurnool to transfer pay drawal. The personal file was sent by RPAD and acknowledgment obtained.",
    sampleDraft: `OFFICE OF THE SUPERINTENDENT
DISTRICT HOSPITAL, KURNOOL

Proc.No. ___/Estt/2025                          Date: ___

OFFICE MEMORANDUM

Sub: Establishment – Transfer – Relieving of Sri ___ – Orders – Issued.

Ref: G.O.Rt.No. ___ dated ___

Sri ___ , Lab Technician, is hereby relieved of his duties at this institution with effect from the forenoon of ___ to enable him to join as Lab Technician at Area Hospital, Dhone, vide reference above.

He is granted joining time under FR 15 as admissible. Service Register entry made.

Sd/- Superintendent`,
    srEntry:
      "Transferred to ___ vide G.O.Rt.No. ___ dated ___. Relieved on ___. Joined ___ on ___.",
    auditObjections: [
      "Transfer without valid G.O./transfer order",
      "Joining time exceeded without extension orders",
      "SR entry not made at outgoing or incoming institution",
      "Pay drawn from two stations during overlapping period",
      "Personal file not transferred causing service verification gaps",
    ],
    goReferences:
      "Transfer policy G.O.Ms. for Medical and Health Department on [GOIR](https://goir.ap.gov.in/). FR 15 joining time rules in Fundamental Rules. Latest transfer guidelines and ban period orders from General Administration Department.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://health.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
    ],
  },
  {
    title: "Joining Time Rules Explained",
    slug: "joining-time-rules",
    category: "establishment",
    tags: ["joining-time", "FR-15", "transfer", "establishment"],
    summary:
      "Detailed explanation of joining time admissible under Fundamental Rule 15 for AP government employees on transfer, including calculation, extension, and pay implications for Health Department staff.",
    telugu_summary:
      "FR 15 under joining time rules — calculation, extension, pay implications on transfer.",
    priority: 2,
    primaryRules: [
      "Fundamental Rule 15 (Joining Time)",
      "Fundamental Rule 15-A (Extension of joining time)",
      "AP Leave Rules (HPL/EL during joining time)",
      "AP State and Subordinate Service Rules — Transfer",
      "AP Medical and Health Department transfer G.Os",
    ],
    procedureSteps: [
      "Determine date of relief from outgoing institution",
      "Identify distance/category of transfer to ascertain admissible joining time under FR 15",
      "Calculate last date for joining at new station including holidays if admissible",
      "Inform employee of joining time limit and consequences of late joining",
      "If employee requests extension, process under FR 15-A with valid reasons",
      "Record joining date on joining report and verify if within admissible period",
      "If late joining beyond extended period, process as deemed suspension or break in service as per rules",
      "Make SR entry noting joining time availed and date of joining new post",
    ],
    checklist: [
      "Date of relief clearly recorded on relief report",
      "Distance and FR 15 category verified for joining time calculation",
      "Employee informed of last date for joining",
      "Extension application processed if received within time",
      "Joining report date verified against admissible joining time",
      "Pay for joining time period regulated correctly",
      "Late joining cases processed as per rules with competent authority orders",
      "SR entry made with joining time details",
    ],
    example:
      "Smt. Lakshmi, Staff Nurse, was transferred from Vijayawada to District Hospital Kurnool (classified as outside district). She was relieved on 30-06-2025. Under FR 15, she was entitled to 15 days joining time plus travel allowance for the journey.\n\nShe requested 5 days extension due to children's school admission, which was granted under FR 15-A vide Proc.No. 201/Estt/2025. She joined DH Kurnool on 20-07-2025 within the extended period. Joining time was treated as duty for pay purposes.",
    sampleDraft: `OFFICE OF THE SUPERINTENDENT
DISTRICT HOSPITAL, KURNOOL

Proc.No. ___/Estt/2025                          Date: ___

OFFICE MEMORANDUM

Sub: Establishment – Joining Time – Extension under FR 15-A to Smt. ___ – Orders – Issued.

Ref: Application dated ___

Smt. ___ , Staff Nurse, was relieved on ___ for transfer to this institution. Admissible joining time under FR 15 expires on ___. The employee has requested extension of ___ days citing ___.

The request is accepted. Extended joining time granted up to ___. Joining after this date shall be treated as per FR 15-A provisions.

Sd/- Superintendent`,
    srEntry:
      "Joined on ___ after availing ___ days joining time under FR 15 (extended vide Proc.No. ___ dated ___).",
    auditObjections: [
      "Joining time granted beyond FR 15 limits without FR 15-A authority",
      "Pay drawn for period beyond admissible joining time",
      "Late joining treated as duty without extension orders",
      "Joining time not calculated from correct date of relief",
      "Break in service not regularized for late joining cases",
    ],
    goReferences:
      "Fundamental Rules (FR 15 and FR 15-A) available through [AP Finance](https://www.apfinance.ap.gov.in/). Clarificatory G.Os on joining time on [GOIR](https://goir.ap.gov.in/). Transfer-related joining time instructions in Medical and Health Department circulars.",
    scrapedSources: [
      "https://www.apfinance.ap.gov.in/",
      "https://goir.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Service Verification Procedure",
    slug: "service-verification",
    category: "establishment",
    tags: ["service-verification", "audit", "establishment", "AG"],
    summary:
      "How to prepare and respond to service verification queries from AG Audit, including compilation of service book, orders, SR extracts, and submission timelines for Health Department employees.",
    telugu_summary:
      "AG Audit service verification queries ki service book, orders, SR extracts compile chesi respond chese procedure.",
    priority: 2,
    primaryRules: [
      "AP Service Verification Instructions issued by AG AP",
      "AP Service Register Maintenance Rules",
      "Fundamental Rules on service counting",
      "AP Leave Rules (for verification of leave periods)",
      "AP State and Subordinate Service Rules — Counting of service",
    ],
    procedureSteps: [
      "Receive service verification proforma/questionnaire from AG Audit or employee",
      "Extract Service Register entries from date of appointment to present",
      "Compile chronological set of appointment, promotion, transfer, and increment orders",
      "Verify leave account for breaks in service or extraordinary leave periods",
      "Prepare service book/certified service particulars as per AG format",
      "Route through Superintendent/DHO for certification and signature",
      "Submit to AG Audit within stipulated time with covering letter",
      "Follow up on objections raised and submit compliance report",
    ],
    checklist: [
      "Complete set of appointment and promotion orders compiled",
      "SR certified extract prepared and signed by competent authority",
      "Leave account extract attached showing no unauthorized breaks",
      "Pay fixation orders for all promotions included",
      "Retirement/death orders included if applicable",
      "Service book pages certified and serially arranged",
      "Covering letter with contact details of establishment officer",
      "Copy retained in audit compliance register",
    ],
    example:
      "AG Audit raised service verification for Sri Rama Rao, Senior Pharmacist, District Hospital Kurnool, for the period 2010-2025. Smt. Lakshmi, establishment clerk, compiled 47 orders including two promotions, three transfers, and annual increments.\n\nOne discrepancy was found — a 2018 transfer SR entry was missing. Correction was made vide Proc.No. 55/Estt/2025 before submission. Certified service particulars were submitted to AG within 30 days. Audit closed the objection after verification.",
    sampleDraft: `OFFICE OF THE SUPERINTENDENT
DISTRICT HOSPITAL, KURNOOL

Lr.No. ___/Estt/2025                              Date: ___

To
The Senior Audit Officer
Audit Office, Kurnool

Sub: Service Verification – Sri ___ , Senior Pharmacist – Reg.

Ref: Your letter No. ___ dated ___

Certified service particulars of Sri ___ for the period ___ to ___ are enclosed herewith:

Enclosures:
1. Certified SR extract
2. Appointment order
3. Promotion orders (2 Nos.)
4. Transfer orders (3 Nos.)
5. Leave account extract
6. Pay fixation orders

Sd/- Superintendent
District Hospital, Kurnool`,
    srEntry:
      "Service verified up to ___ vide certification Proc.No. ___ dated ___ for AG Audit.",
    auditObjections: [
      "Service verification not submitted within stipulated time",
      "Missing orders for promotion or transfer periods",
      "SR entries not matching with order dates",
      "Unauthorized break in service not explained",
      "Certification by unauthorized officer",
    ],
    goReferences:
      "AG AP service verification circulars on [AP Finance](https://www.apfinance.ap.gov.in/) under AG section. Service verification proforma and instructions on [GOIR](https://goir.ap.gov.in/) search 'service verification'. Health Department instructions from Commissioner of Health on audit compliance.",
    scrapedSources: [
      "https://www.apfinance.ap.gov.in/",
      "https://goir.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Declaration of Approved Probation",
    slug: "approved-probation-declaration",
    category: "establishment",
    tags: ["probation", "approved-probation", "establishment", "confirmation"],
    summary:
      "Procedure for declaring approved probation for employees who complete probation satisfactorily, distinct from initial probation declaration, including ACR scrutiny and confirmation orders.",
    telugu_summary:
      "Probation satisfactorily complete chesina employees ki approved probation declaration procedure మరియు confirmation orders.",
    priority: 2,
    primaryRules: [
      "Fundamental Rule 9 and FR 9-A (Approved probation)",
      "AP State and Subordinate Service Rules, 1996",
      "AP Medical and Health Department Service Rules",
      "AP ACR/APAR Instructions",
      "AP Service Register Maintenance Instructions",
    ],
    procedureSteps: [
      "Identify employees completing probation period in the current quarter",
      "Obtain and scrutinize ACRs/APARs for the entire probation period",
      "Verify no disciplinary proceedings, penalties, or vigilance cases pending",
      "Prepare approved probation declaration proceedings for satisfactory cases",
      "For unsatisfactory cases, prepare extension of probation or termination proposal",
      "Obtain orders from competent authority for declaration or extension",
      "Communicate orders to employee and update establishment records",
      "Make SR entry and inform DDO for grant of regular increment benefits",
    ],
    checklist: [
      "Probation period completion date verified for each employee",
      "ACRs for all years of probation obtained",
      "Minimum grading requirements met as per service rules",
      "Disciplinary status verified from personal file",
      "Proceedings drafted distinguishing satisfactory vs unsatisfactory cases",
      "Competent authority orders obtained",
      "Employee communicated of declaration or extension",
      "SR and service book updated promptly",
    ],
    example:
      "Three Staff Nurses at Area Hospital Nandyal completed probation in March 2026. Smt. Lakshmi scrutinized ACRs — two employees had 'Good' grading throughout; one had 'Average' in the first year improving to 'Good'.\n\nApproved probation was declared for all three vide Proc.No. 45/Estt/2026 dated 10-04-2026 as their overall performance was satisfactory. SR entries were made and DDO was intimated for regular increment processing from the date of declaration.",
    sampleDraft: `OFFICE OF THE SUPERINTENDENT
AREA HOSPITAL, NANDYAL

Proc.No. ___/Estt/2026                          Date: ___

PROCEEDINGS OF THE SUPERINTENDENT

Sub: Establishment – Approved Probation – Declaration in respect of Staff Nurses – Orders – Issued.

The following employees having satisfactorily completed the prescribed period of probation and whose ACRs have been found satisfactory, are hereby declared to have passed probation:

Sl.No.  Name              Designation    Probation completed on
1.      Smt. ___          Staff Nurse    ___
2.      Sri ___           Staff Nurse    ___

Sd/- Superintendent`,
    srEntry:
      "Approved probation declared vide Proc.No. ___ dated ___. Passed probation with effect from ___.",
    auditObjections: [
      "Approved probation declared without ACR scrutiny",
      "Probation extended but not recorded in SR",
      "Declaration by incompetent authority",
      "Increment granted before approved probation declaration",
      "Unsatisfactory ACR grading ignored without extension orders",
    ],
    goReferences:
      "FR 9 and FR 9-A on [AP Finance](https://www.apfinance.ap.gov.in/). Probation-related G.O.Ms. on [GOIR](https://goir.ap.gov.in/). ACR grading requirements in Medical and Health Department service rules.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Compassionate Appointment Guidelines",
    slug: "compassionate-appointment",
    category: "establishment",
    tags: ["compassionate-appointment", "recruitment", "establishment", "welfare"],
    summary:
      "Guidelines for processing compassionate appointment cases in AP government when a government servant dies in harness or retires on medical grounds, including eligibility, documentation, and Health Department procedures.",
    telugu_summary:
      "Government employee death/medical retirement taruvata compassionate appointment cases process chese guidelines మరియు documents.",
    priority: 2,
    primaryRules: [
      "AP Compassionate Appointment Scheme/Rules",
      "AP State and Subordinate Service Rules — Direct recruitment",
      "AP Reservation Rules for roster compliance",
      "AP Medical and Health Department recruitment rules",
      "Relevant court orders on compassionate appointments",
    ],
    procedureSteps: [
      "Receive application from eligible family member within prescribed time limit",
      "Verify death certificate/retirement on medical grounds order of deceased employee",
      "Check eligibility criteria — dependency, age, educational qualification, and relationship",
      "Verify no other family member already employed under compassionate quota",
      "Prepare case with financial condition affidavit and family particulars",
      "Forward to District Collector/appointing authority through DHO with recommendation",
      "After G.O. issuance, issue appointment order and process joining formalities",
      "Complete probation declaration schedule and all establishment records",
    ],
    checklist: [
      "Application received within time limit from scheme",
      "Death certificate or medical retirement order verified",
      "Eligibility criteria met (relationship, age, qualification)",
      "Financial condition and dependency established",
      "No prior compassionate appointment in family verified",
      "Roster point identified for category and reservation",
      "G.O. for appointment obtained from competent authority",
      "Appointment order, joining report, and SR opened",
    ],
    example:
      "Sri Venkatesh, Class IV employee at District Hospital Kurnool, died in harness on 12-01-2025. His widow Smt. Parvathi applied for compassionate appointment for their son Sri Kiran (age 22, Intermediate pass) on 15-02-2025.\n\nSmt. Lakshmi verified eligibility, prepared the case with income certificate and dependency affidavit, and forwarded through DHO Kurnool to the Collector. G.O.Ms.No. 567 dated 20-06-2025 appointed Sri Kiran as Attender. Joining was processed and probation period commenced from 01-07-2025.",
    sampleDraft: `OFFICE OF THE DISTRICT MEDICAL & HEALTH OFFICER
KURNOOL

Lr.No. ___/Estt/2025                              Date: ___

To
The District Collector
Kurnool

Sub: Compassionate Appointment – Case of Sri ___ (son of late Sri ___ , Attender, DH Kurnool) – Forwarding – Reg.

The application of Sri ___ for compassionate appointment on account of death in harness of his father late Sri ___ , Attender, District Hospital Kurnool, is forwarded with the following enclosures for consideration:

1. Application form
2. Death certificate
3. Educational certificates
4. Income certificate
5. Dependency affidavit

Recommended for favorable consideration.

Sd/- DMHO, Kurnool`,
    srEntry:
      "Appointed on compassionate grounds vide G.O.Ms.No. ___ dated ___. Joined on ___. Probation period ___ years.",
    auditObjections: [
      "Appointment without valid G.O. or after expiry of time limit",
      "Eligibility criteria not verified (age, qualification, dependency)",
      "Roster point not adjusted for compassionate appointment",
      "Multiple compassionate appointments in same family without authority",
      "Probation not declared after appointment",
    ],
    goReferences:
      "Latest compassionate appointment G.O.Ms. on [GOIR](https://goir.ap.gov.in/) — search 'compassionate appointment'. Amendments and court compliance orders updated periodically. Health Department recruitment rules on [health.ap.gov.in](https://health.ap.gov.in/).",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://health.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
    ],
  },
  {
    title: "Increment Sanction Procedure",
    slug: "increment-sanction",
    category: "establishment",
    tags: ["increment", "pay", "establishment", "DDO"],
    summary:
      "Annual increment sanction procedure for AP government employees including eligibility verification, withholding conditions, proceedings format, and pay bill entries for Health Department DDOs.",
    telugu_summary:
      "Annual increment sanction procedure — eligibility verification, withholding conditions, proceedings format మరియు pay bill entries.",
    priority: 1,
    primaryRules: [
      "Fundamental Rule 24 (Increment)",
      "Fundamental Rule 26 (Withholding of increment)",
      "AP Pay Revision Rules and Schedules",
      "AP Leave Rules (increment during leave)",
      "AP ACR/APAR Instructions for increment linkage",
    ],
    procedureSteps: [
      "Prepare increment due statement from Service Register for July (or prescribed month)",
      "Verify employee is on duty or eligible leave on increment date",
      "Check for penalty orders withholding increment or stoppage",
      "Verify approved probation declared for employees in probation",
      "Prepare increment sanction proceedings listing eligible employees",
      "Obtain DDO/Superintendent approval and issue increment orders",
      "Communicate to employees and make SR entries",
      "Update pay fixation and reflect in next monthly pay bill through CFMS",
    ],
    checklist: [
      "Increment due list prepared from SR as on increment date",
      "Suspension/dismissal/retirement status checked",
      "Penalty orders scrutinized for increment withholding",
      "Approved probation verified for recent appointees",
      "Proceedings list all employees with old and new pay",
      "SR entries made citing increment order number and date",
      "Pay bill updated in CFMS with revised pay",
      "Withheld increments documented with reasons",
    ],
    example:
      "On 01-07-2025, 42 employees at District Hospital Kurnool were due for annual increment. Smt. Lakshmi prepared the due list from SR. Two employees were on EOL without pay — their increment was postponed. One employee had minor penalty with increment stoppage for one year.\n\nProc.No. 156/Estt/2025 dated 05-07-2025 sanctioned increments for 39 employees. SR entries were made and DDO updated CFMS pay bills for July 2025.",
    sampleDraft: `OFFICE OF THE SUPERINTENDENT
DISTRICT HOSPITAL, KURNOOL

Proc.No. ___/Estt/2025                          Date: ___

PROCEEDINGS OF THE SUPERINTENDENT

Sub: Establishment – Annual Increment – Sanction of increment to staff for July 2025 – Orders – Issued.

The following employees are sanctioned annual increment with effect from 01-07-2025:

Sl.No.  Name              Designation    Existing Pay    Revised Pay
1.      Sri Rama Rao      Lab Tech       Rs. ___         Rs. ___
2.      Smt. Lakshmi      Staff Nurse    Rs. ___         Rs. ___

Sd/- Superintendent
(for DDO)`,
    srEntry:
      "Annual increment to Rs. ___ sanctioned with effect from ___ vide Proc.No. ___/Estt/___ dated ___.",
    auditObjections: [
      "Increment granted during suspension or dismissal period",
      "Increment given before approved probation declaration",
      "Withheld increment granted without penalty revocation",
      "SR not updated after increment sanction",
      "Pay bill not revised in CFMS after increment date",
    ],
    goReferences:
      "FR 24 and FR 26 on [AP Finance](https://www.apfinance.ap.gov.in/). Pay revision G.O.Ms. with increment schedules on GOIR. CFMS increment processing instructions on [cfms.ap.gov.in](https://cfms.ap.gov.in/).",
    scrapedSources: [
      "https://www.apfinance.ap.gov.in/",
      "https://goir.ap.gov.in/",
      "https://cfms.ap.gov.in/",
    ],
  },
  {
    title: "Pay Fixation under FR 22-B",
    slug: "pay-fixation-fr-22b",
    category: "establishment",
    tags: ["pay-fixation", "FR-22", "promotion", "establishment"],
    summary:
      "How to effect pay fixation under Fundamental Rule 22-B when AP government employees are promoted or appointed to higher posts, including option exercise, fixation memo, and arrears calculation.",
    telugu_summary:
      "Promotion/appointment taruvata FR 22-B under pay fixation — option exercise, fixation memo మరియు arrears calculation.",
    priority: 2,
    primaryRules: [
      "Fundamental Rule 22 and FR 22-B (Pay fixation on promotion)",
      "Fundamental Rule 23 (Option for date of increment)",
      "AP Pay Revision Rules and Pay Scales",
      "AP State and Subordinate Service Rules — Promotion",
      "Finance Department pay fixation instructions",
    ],
    procedureSteps: [
      "Issue promotion/appointment order with direction to exercise FR 22 option",
      "Obtain option form from employee within prescribed period (3 months)",
      "Calculate pay under option (a) — date of promotion, and option (b) — date of next increment",
      "Prepare pay fixation memo showing old pay, new pay, and option chosen",
      "Obtain DDO approval on fixation memo and communicate to employee",
      "Make SR entry recording pay fixation details",
      "Calculate arrears if any and include in pay bill",
      "Submit fixation memo to AG office as per instructions",
    ],
    checklist: [
      "Promotion order issued with FR 22 option direction",
      "Option form received within 3 months",
      "Pay calculated correctly under chosen option",
      "Fixation memo prepared and approved by DDO",
      "Employee communicated of fixation and option",
      "SR entry made with fixation details",
      "Arrears bill prepared if applicable",
      "Fixation memo filed in personal file and AG copy sent",
    ],
    example:
      "Sri Rama Rao was promoted from Staff Nurse (Rs. 30,000-70,000) to Senior Staff Nurse (Rs. 35,000-90,000) with effect from 01-02-2026. He exercised option (b) — fixation from date of next increment (01-07-2026).\n\nSmt. Lakshmi calculated pay under both options, prepared fixation memo showing revised pay of Rs. 36,500 from 01-07-2026, and obtained DDO approval. Arrears from 01-02-2026 to 30-06-2026 at promotional scale were paid in March 2026 pay bill.",
    sampleDraft: `PAY FIXATION MEMO

Name: Sri ___                    Designation: Senior Staff Nurse
Promotion order: Proc.No. ___ dated ___    Effective date: ___

Option exercised: FR 22(b) — fixation from date of next increment (01-07-___)

Existing pay: Rs. ___    Revised pay: Rs. ___    Scale: ___

Arrears due: Rs. ___ for the period ___ to ___

Sd/- DDO                    Date: ___`,
    srEntry:
      "Pay fixed at Rs. ___ under FR 22(b) with effect from ___ vide fixation memo No. ___ dated ___.",
    auditObjections: [
      "Pay fixation done without option form from employee",
      "Wrong option applied or option exercised after 3 months without extension",
      "Fixation memo not approved by DDO",
      "Arrears overpaid due to incorrect fixation calculation",
      "SR not updated with fixation details",
    ],
    goReferences:
      "FR 22 and FR 22-B on [AP Finance](https://www.apfinance.ap.gov.in/). Pay fixation clarifications and calculator instructions in pay revision G.O.Ms. on [GOIR](https://goir.ap.gov.in/).",
    scrapedSources: [
      "https://www.apfinance.ap.gov.in/",
      "https://goir.ap.gov.in/",
      "https://cfms.ap.gov.in/",
    ],
  },
  {
    title: "Preparation of Promotion Panels",
    slug: "promotion-panel-preparation",
    category: "establishment",
    tags: ["promotion-panel", "DPC", "seniority", "establishment"],
    summary:
      "Procedure for preparing promotion panels and convening Departmental Promotion Committees (DPC) for AP Health Department categories, including agenda preparation, eligibility scrutiny, and minutes recording.",
    telugu_summary:
      "Promotion panels preparation మరియు DPC convening procedure — agenda, eligibility scrutiny, minutes recording.",
    priority: 2,
    primaryRules: [
      "AP State and Subordinate Service Rules — DPC provisions",
      "AP Medical and Health Department Service Rules",
      "AP Reservation Rules for panel composition",
      "AP ACR/APAR Instructions for DPC scrutiny",
      "Instructions on Departmental Promotion Committee proceedings",
    ],
    procedureSteps: [
      "Identify vacancies requiring DPC consideration",
      "Prepare eligibility list from finalized seniority list",
      "Collect ACRs for prescribed period and check minimum grading",
      "Verify vigilance and disciplinary clearance for each candidate",
      "Prepare DPC agenda with candidate details and vacancy position",
      "Convene DPC with prescribed composition including minority member",
      "Record minutes with recommendations for each vacancy",
      "Process promotion proceedings based on DPC recommendations",
    ],
    checklist: [
      "Vacancy position and roster point identified",
      "Finalized seniority list used for panel preparation",
      "ACRs for required years obtained and graded",
      "Vigilance clearance obtained from concerned authority",
      "DPC composition as per rules verified",
      "Agenda circulated to all DPC members before meeting",
      "Minutes signed by all members including minority member",
      "Panel valid for prescribed period noted",
    ],
    example:
      "District Hospital Kurnool had two Senior Staff Nurse vacancies. Smt. Lakshmi prepared the promotion panel with five eligible candidates from the finalized seniority list. ACRs for 2022-23 to 2024-25 were graded 'Good' or above for all candidates.\n\nDPC met on 15-01-2026 under the chairmanship of the Superintendent. Two candidates were recommended for promotion. Minutes were recorded and signed. Promotion proceedings were issued within 15 days of DPC meeting.",
    sampleDraft: `DEPARTMENTAL PROMOTION COMMITTEE — MINUTES

Date: ___    Venue: District Hospital, Kurnool
Chairman: Superintendent    Members: ___, ___

Agenda: Promotion to Senior Staff Nurse — 2 vacancies (Roster point ___)

Recommendations:
Sl.No.  Name              ACR Grading    Recommendation
1.      Sri Rama Rao      Very Good      Recommended
2.      Smt. ___          Good           Recommended

Minutes recorded by: ___    Signed by all members.`,
    srEntry:
      "Considered for promotion to ___ by DPC dated ___. Promoted/not promoted vide Proc.No. ___ dated ___.",
    auditObjections: [
      "DPC not constituted with prescribed composition",
      "Panel prepared without finalized seniority list",
      "ACRs below minimum grading considered for promotion",
      "DPC minutes unsigned or missing minority member signature",
      "Promotion issued beyond panel validity period",
    ],
    goReferences:
      "DPC instructions in AP State and Subordinate Service Rules on [GOIR](https://goir.ap.gov.in/). Health Department DPC composition G.O.Ms. Reservation roster instructions for panel vacancies.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://health.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
    ],
  },
  {
    title: "Reservation Rules in Promotions",
    slug: "reservation-rules-promotions",
    category: "establishment",
    tags: ["reservation", "roster", "SC-ST", "promotion"],
    summary:
      "Application of AP reservation rules and roster maintenance in promotion cases for Health Department staff, including roster point identification, carry-forward, and de-reservation procedures.",
    telugu_summary:
      "Promotion cases lo AP reservation rules, roster maintenance, carry-forward మరియు de-reservation procedures.",
    priority: 2,
    primaryRules: [
      "AP Reservation Rules for SC/ST/BC/EWS/PwD",
      "AP State and Subordinate Service Rules — Roster system",
      "G.O.Ms. on 200-point roster for direct recruitment and promotion",
      "AP Medical and Health Department recruitment rules",
      "Court orders on roster implementation",
    ],
    procedureSteps: [
      "Identify whether vacancy arises from direct recruitment or promotion quota",
      "Locate current roster point and category (SC/ST/BC/OC) for the vacancy",
      "Verify eligible candidates from the reservation category in seniority list",
      "If no eligible candidate available, process de-reservation with Collector approval",
      "Fill roster point after promotion and update roster register",
      "Maintain carry-forward register for unfilled reserved vacancies",
      "Document roster position in promotion proceedings",
      "Submit roster returns to BC Welfare/Collector as prescribed",
    ],
    checklist: [
      "Correct roster register maintained and updated",
      "Vacancy mapped to correct roster point and category",
      "Eligible reserved category candidates identified in seniority",
      "De-reservation orders obtained where no eligible candidate",
      "Roster point filled after each promotion",
      "Carry-forward entries made for unfilled points",
      "Promotion proceedings cite roster point number",
      "Periodic roster returns submitted",
    ],
    example:
      "Roster point 78 (SC — Promotion) fell vacant at DH Kurnool for Lab Technician promotion. Sri Narayana, SC candidate at Sl.No. 3 in seniority, was eligible. Smt. Lakshmi verified roster register, confirmed point 78 was SC, and included Sri Narayana in the DPC panel.\n\nAfter promotion, roster point 78 was marked filled against Sri Narayana vide Proc.No. 22/Estt/2026. Roster register updated and copy sent to DMHO for consolidated return.",
    sampleDraft: `ROSTER REGISTER ENTRY

Roster Point No.: 78    Category: SC (Promotion)
Post: Lab Technician    Institution: DH Kurnool

Filled by: Sri ___ vide Proc.No. ___ dated ___
Previous carry-forward: Nil    Balance carry-forward: ___

Verified by: ___    Date: ___`,
    srEntry:
      "Promoted against roster point No. ___ (SC/ST/BC/OC) vide Proc.No. ___ dated ___.",
    auditObjections: [
      "Promotion without reference to roster point",
      "Roster register not maintained or not updated",
      "De-reservation without Collector/Government orders",
      "OC candidate promoted against reserved roster point",
      "Carry-forward not recorded for unfilled reserved vacancies",
    ],
    goReferences:
      "Reservation G.O.Ms. and roster instructions on [GOIR](https://goir.ap.gov.in/). BC Welfare Department roster monitoring circulars. Latest court compliance orders on roster implementation.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://health.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
    ],
  },
  {
    title: "Service Register Maintenance Guide",
    slug: "service-register-maintenance",
    category: "establishment",
    tags: ["service-register", "SR", "establishment", "audit"],
    summary:
      "Comprehensive guide to maintaining Service Registers for AP government employees — entry format, authentication, corrections, and audit compliance for Health Department establishment sections.",
    telugu_summary:
      "Service Register maintenance — entry format, authentication, corrections మరియు audit compliance guide.",
    priority: 1,
    primaryRules: [
      "AP Service Register Maintenance Instructions",
      "AP Financial Code — Service Register provisions",
      "Fundamental Rules on service records",
      "AG AP instructions on SR certification",
      "Departmental manuals on establishment records",
    ],
    procedureSteps: [
      "Open SR immediately upon employee joining with appointment details",
      "Record every service event on date of occurrence — promotion, transfer, increment, leave",
      "Use authenticated entries with order number, date, and signing authority",
      "Cross-verify SR entries with service book and personal file orders",
      "For corrections, score out incorrect entry without overwriting — write correction with order reference",
      "Obtain competent authority authentication for all corrections",
      "Conduct annual SR verification and certification",
      "Produce certified extracts for audit, service verification, and retirement",
    ],
    checklist: [
      "SR opened for every employee on joining",
      "All events recorded promptly with order citations",
      "No overwriting — corrections authenticated properly",
      "Annual certification completed by competent authority",
      "SR cross-checked with service book annually",
      "Certified extracts available for audit queries",
      "SR kept in safe custody in establishment section",
      "Transfer of SR when employee transferred",
    ],
    example:
      "During annual SR verification at District Hospital Kurnool, Smt. Lakshmi found that Sri Rama Rao's 2024 increment entry was missing. She prepared a correction proposal citing increment Proc.No. 156/Estt/2024, scored out the blank space, and entered the increment with authentication.\n\nThe Superintendent signed the correction on 15-03-2026. This proactive correction prevented an AG audit objection during the 2025-26 audit inspection.",
    sampleDraft: `SERVICE REGISTER — CORRECTION NOTE

Employee: Sri ___    Sl.No. in SR: ___
Correction: Increment entry for 01-07-2024 omitted

Incorrect entry: (blank — no entry recorded)
Correct entry: "Annual increment to Rs. ___ sanctioned w.e.f. 01-07-2024 vide Proc.No. ___ dated ___."

Correction authorized vide Proc.No. ___ dated ___

Sd/- Superintendent    Date: ___`,
    srEntry:
      "SR corrected at Sl.No. ___ vide Proc.No. ___ dated ___. (Correction entries follow same authentication format.)",
    auditObjections: [
      "Overwriting without scoring out and authentication",
      "Missing entries for promotion, transfer, or increment",
      "Entries without order number and date citation",
      "Annual certification not done",
      "SR not produced for audit inspection",
    ],
    goReferences:
      "Service Register instructions on [AP Finance](https://www.apfinance.ap.gov.in/) under AG section. Establishment manual G.O.Ms. on [GOIR](https://goir.ap.gov.in/). Health Department circulars on SR maintenance from Commissioner of Health.",
    scrapedSources: [
      "https://www.apfinance.ap.gov.in/",
      "https://goir.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Retirement Processing Checklist",
    slug: "retirement-processing",
    category: "establishment",
    tags: ["retirement", "settlement", "pension", "establishment"],
    summary:
      "Complete checklist for processing retirement of AP government employees on superannuation, including no-dues certificate, GPF/APGLI settlement, leave encashment, and pension papers for Health Department staff.",
    telugu_summary:
      "Superannuation retirement processing checklist — no-dues, GPF/APGLI settlement, leave encashment, pension papers.",
    priority: 2,
    primaryRules: [
      "AP Revised Pension Rules, 1980",
      "Fundamental Rules on retirement age",
      "AP Leave Rules — EL encashment on retirement",
      "AP GPF Rules — Final settlement",
      "APGLI Rules — Maturity/death claim on retirement",
    ],
    procedureSteps: [
      "Identify employees due for retirement six months in advance from SR/birth register",
      "Issue notice of impending retirement and obtain employee acknowledgment",
      "Prepare retirement proceedings fixing date of retirement (afternoon of last day of month)",
      "Process no-dues certificate from all sections — store, library, hostel, etc.",
      "Prepare leave encashment proposal for unavailed EL",
      "Forward GPF/APGLI settlement papers to concerned authorities",
      "Prepare pension papers (Form 4/Form 5) and forward to AG/A.G. Pension",
      "Make final SR entry, close personal file, and issue service certificate",
    ],
    checklist: [
      "Retirement due list prepared 6 months ahead",
      "Retirement proceedings issued before date of retirement",
      "No-dues certificate from all sections obtained",
      "Leave account finalized and EL encashment calculated",
      "GPF final withdrawal papers forwarded",
      "APGLI maturity claim initiated",
      "Pension papers submitted to AG within time limit",
      "Service certificate and retirement order given to employee",
    ],
    example:
      "Sri Venkatesh, Pharmacist, District Hospital Kurnool, born on 31-05-1966, was due to retire on superannuation on 31-05-2026. Smt. Lakshmi initiated processing in December 2025 — retirement proceedings issued in April 2026.\n\nEL encashment for 240 days was calculated, GPF final settlement for Rs. 8,50,000 forwarded, and pension papers submitted to AG AP by 15-06-2026. Sri Venkatesh received service certificate and no-dues clearance on his last working day.",
    sampleDraft: `OFFICE OF THE SUPERINTENDENT
DISTRICT HOSPITAL, KURNOOL

Proc.No. ___/Estt/2026                          Date: ___

PROCEEDINGS OF THE SUPERINTENDENT

Sub: Establishment – Retirement – Retirement of Sri ___ on superannuation – Orders – Issued.

Sri ___ , Pharmacist, born on ___, shall retire from service on reaching the age of superannuation with effect from the afternoon of ___.

Retirement notice issued. Pension papers, GPF/APGLI settlement, and EL encashment being processed.

Sd/- Superintendent`,
    srEntry:
      "Retired from service on superannuation with effect from the afternoon of ___ vide Proc.No. ___ dated ___.",
    auditObjections: [
      "Employee continued on duty beyond retirement date without extension orders",
      "Pension papers not submitted within prescribed time",
      "EL encashment calculated on incorrect balance",
      "GPF settlement delayed causing employee hardship",
      "No final SR entry or service certificate issued",
    ],
    goReferences:
      "Pension rules G.O.Ms. on [GOIR](https://goir.ap.gov.in/) and [AP Finance](https://www.apfinance.ap.gov.in/). GPF settlement on AG AP portal. APGLI maturity on [apgli.ap.gov.in](https://www.apgli.ap.gov.in/).",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://www.apgli.ap.gov.in/",
    ],
  },

  // ─── Category 2: leave (8) ────────────────────────────────────────────────
  {
    title: "Earned Leave Rules Explained",
    slug: "earned-leave-rules",
    category: "leave",
    tags: ["earned-leave", "EL", "leave-rules", "leave-account"],
    summary:
      "Comprehensive guide to Earned Leave (EL) rules for AP government employees — accrual rates, maximum accumulation, prefixing/suffixing holidays, and application procedure for Health Department staff.",
    telugu_summary:
      "Earned Leave (EL) rules — accrual rates, maximum accumulation, holidays prefix/suffix, application procedure.",
    priority: 1,
    primaryRules: [
      "AP Leave Rules — Earned Leave (Rule 15 onwards)",
      "Fundamental Rules on leave entitlement",
      "AP Leave Rules — Maximum accumulation of EL",
      "AP Leave Rules — Combination of leave",
      "Hospital/Health Department attendance instructions",
    ],
    procedureSteps: [
      "Maintain leave account showing EL credited and debited each half-year",
      "Credit 15 days EL on 1 January and 1 July each year (minus duty loss if any)",
      "Receive leave application with dates and forwarding by controlling officer",
      "Verify EL balance sufficient and no duty loss affecting credit",
      "Approve leave sanction order specifying from/to dates",
      "Record debit in leave account on date leave commences",
      "Mark attendance register and inform DDO for pay bill adjustment",
      "On return, record joining and update leave account",
    ],
    checklist: [
      "Leave account updated with half-yearly EL credit",
      "Duty loss days deducted from EL credit correctly",
      "Leave application with controlling officer recommendation",
      "EL balance sufficient for requested period",
      "Sanction order issued before leave commences",
      "Leave account debited on commencement date",
      "Attendance register marked and DDO informed",
      "Prefixing/suffixing of holidays applied correctly",
    ],
    example:
      "Smt. Lakshmi, Staff Nurse at DH Kurnool, applied for 15 days EL from 10-03-2026 to 24-03-2026. Her leave account showed 45 days EL balance. The Sister In-Charge recommended the application.\n\nThe Superintendent sanctioned EL vide Proc.No. 88/Leave/2026 dated 05-03-2026. Leave account debited 15 days. Since 22-03-2026 was a Sunday and 23-03-2026 a holiday, prefixing/suffixing rules were applied — total debit remained 15 days EL only.",
    sampleDraft: `OFFICE OF THE SUPERINTENDENT
DISTRICT HOSPITAL, KURNOOL

Proc.No. ___/Leave/2026                          Date: ___

OFFICE MEMORANDUM

Sub: Leave – Earned Leave – Sanction of EL to Smt. ___ – Orders – Issued.

Sanction is hereby accorded to Smt. ___ , Staff Nurse, to avail Earned Leave for 15 days from 10-03-2026 FN to 24-03-2026 AN.

EL balance before debit: 45 days    Debit: 15 days    Balance: 30 days

Sd/- Superintendent`,
    srEntry:
      "EL availed for ___ days from ___ to ___ vide Proc.No. ___/Leave/___ dated ___.",
    auditObjections: [
      "EL credited without deducting duty loss days",
      "Leave sanctioned exceeding accumulated balance",
      "Leave account not maintained or not updated",
      "EL availed without sanction order",
      "Holidays incorrectly prefixed/suffixed causing excess leave debit",
    ],
    goReferences:
      "AP Leave Rules on [GOIR](https://goir.ap.gov.in/) and [AP Finance](https://www.apfinance.ap.gov.in/). Latest amendments to EL accumulation limits. Health Department attendance and leave circulars.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Half Pay Leave Procedure",
    slug: "half-pay-leave-procedure",
    category: "leave",
    tags: ["half-pay-leave", "HPL", "medical", "leave"],
    summary:
      "Procedure for sanctioning Half Pay Leave (HPL) for AP government employees on medical grounds, including medical certificate requirements, commutation, and debit from leave account.",
    telugu_summary:
      "Medical grounds meeda Half Pay Leave (HPL) sanction procedure — medical certificate, commutation, leave account debit.",
    priority: 2,
    primaryRules: [
      "AP Leave Rules — Half Pay Leave (Rules 19-21)",
      "AP Leave Rules — Commutation of HPL",
      "Medical attendance rules for government servants",
      "AP Leave Rules — Combination with EL",
      "Fundamental Rules on pay during HPL",
    ],
    procedureSteps: [
      "Receive HPL application with medical certificate from authorized medical officer",
      "Verify medical certificate specifies period of incapacity and diagnosis",
      "Check HPL balance in leave account (credit based on service)",
      "Sanction HPL for period covered by medical certificate",
      "If employee opts for commutation, verify EL balance for half the HPL period",
      "Issue sanction order and debit HPL (and EL if commuted) from leave account",
      "Inform DDO for half-pay adjustment in pay bill",
      "On fitness certificate, close HPL and record joining",
    ],
    checklist: [
      "Medical certificate from authorized MO/specialist attached",
      "Certificate specifies diagnosis and recommended rest period",
      "HPL balance sufficient (or commutation with EL verified)",
      "Sanction order issued within medical certificate period",
      "Leave account debited correctly (HPL and EL if commuted)",
      "DDO informed for half-pay in pay bill",
      "Fitness certificate obtained before rejoining",
      "Excess HPL regularized if fitness delayed",
    ],
    example:
      "Sri Rama Rao, Lab Technician, DH Kurnool, applied for HPL from 01-02-2026 citing typhoid. Medical certificate from District Hospital MO recommended 30 days rest. HPL balance was 60 days.\n\nHe opted to commute half the HPL (15 days) into full pay using EL. Smt. Lakshmi sanctioned 30 days HPL with commutation of 15 days vide Proc.No. 12/Leave/2026. HPL debited 30 days, EL debited 15 days. Pay bill adjusted to half pay for 15 days and full pay for 15 commuted days.",
    sampleDraft: `Proc.No. ___/Leave/2026                          Date: ___

Sub: Leave – HPL – Sanction of Half Pay Leave to Sri ___ – Orders – Issued.

Sri ___ is sanctioned Half Pay Leave for 30 days from 01-02-2026 FN to 02-03-2026 AN on production of medical certificate No. ___ dated ___.

Commutation: 15 days HPL commuted into full pay by debiting 15 days EL.

HPL balance: 60 − 30 = 30 days    EL balance: ___ − 15 = ___ days

Sd/- Superintendent`,
    srEntry:
      "HPL for ___ days from ___ to ___ (___ days commuted) vide Proc.No. ___ dated ___.",
    auditObjections: [
      "HPL sanctioned without valid medical certificate",
      "Commutation without sufficient EL balance",
      "Full pay drawn for entire HPL period without commutation",
      "HPL beyond medical certificate period without extension certificate",
      "Leave account not debited for HPL period",
    ],
    goReferences:
      "AP Leave Rules HPL provisions on [GOIR](https://goir.ap.gov.in/). Medical attendance rules on [AP Finance](https://www.apfinance.ap.gov.in/). Commutation instructions in leave rule amendments.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Commuted Leave Procedure",
    slug: "commuted-leave-rules",
    category: "leave",
    tags: ["commuted-leave", "HPL", "medical", "leave"],
    summary:
      "Rules and procedure for commuted leave — converting Half Pay Leave into full pay by debiting twice the amount from EL balance, applicable conditions, and documentation for AP government employees.",
    telugu_summary:
      "Commuted leave rules — HPL ni full pay ga convert cheyadam, EL balance nunchi double debit, applicable conditions.",
    priority: 2,
    primaryRules: [
      "AP Leave Rules — Commuted Leave (Rule 20)",
      "AP Leave Rules — Half Pay Leave",
      "AP Leave Rules — Earned Leave debit for commutation",
      "Medical attendance rules",
      "AP Leave Rules — Maximum commuted leave limits",
    ],
    procedureSteps: [
      "Employee applies for HPL with request for commutation of specified days",
      "Verify medical certificate supports HPL period requested",
      "Check EL balance is at least twice the commuted days requested",
      "Calculate: commuted days × 2 = EL debit; commuted days = full pay period",
      "Remaining HPL period (if any) at half pay without commutation",
      "Issue sanction order clearly showing HPL, commuted, and EL debit",
      "Update leave account and inform DDO for pay adjustment",
      "Record in leave register and SR if required by departmental instructions",
    ],
    checklist: [
      "Application specifies number of days to be commuted",
      "Medical certificate valid and covers requested period",
      "EL balance ≥ 2 × commuted days",
      "Sanction order shows HPL debit and EL debit separately",
      "Pay bill reflects full pay for commuted days, half pay for balance",
      "Leave account updated with all debits",
      "Maximum commuted leave limits not exceeded",
      "Commutation not granted for non-medical HPL",
    ],
    example:
      "Smt. Lakshmi applied for 20 days HPL with commutation of all 20 days (requiring 40 days EL debit). Her EL balance was 55 days. Medical certificate from gynecologist recommended 20 days rest post-surgery.\n\nCommutation was sanctioned — 20 days HPL debited, 40 days EL debited, and full pay granted for all 20 days. Leave account balance after: HPL 40 days, EL 15 days.",
    sampleDraft: `Proc.No. ___/Leave/2026                          Date: ___

Sub: Leave – Commuted Leave – Sanction to Smt. ___ – Orders – Issued.

Smt. ___ is sanctioned 20 days HPL from ___ to ___ with full commutation.

HPL debit: 20 days    EL debit for commutation: 40 days
Pay: Full pay for 20 days.

Sd/- Superintendent`,
    srEntry:
      "Commuted leave ___ days (HPL ___ + EL ___) from ___ to ___ vide Proc.No. ___ dated ___.",
    auditObjections: [
      "EL debited less than twice the commuted days",
      "Commutation granted without medical grounds",
      "Full pay drawn without EL debit for commutation",
      "Commuted leave beyond maximum permissible limit",
      "Leave account shows inconsistent debits",
    ],
    goReferences:
      "AP Leave Rules Rule 20 on [GOIR](https://goir.ap.gov.in/). Clarificatory memos on commutation limits at [AP Finance](https://www.apfinance.ap.gov.in/).",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Maternity Leave Rules (Latest Amendments)",
    slug: "maternity-leave-rules",
    category: "leave",
    tags: ["maternity-leave", "women-employees", "leave", "amendments"],
    summary:
      "Latest maternity leave rules for AP government women employees including 180 days entitlement, pre/post-natal period, pay during leave, and Maternity Benefit Act compliance in Health Department.",
    telugu_summary:
      "AP government women employees ki maternity leave rules — 180 days entitlement, pre/post-natal period, pay during leave.",
    priority: 2,
    primaryRules: [
      "AP Leave Rules — Maternity Leave",
      "Maternity Benefit (Amendment) Act, 2017",
      "AP Leave Rules — Child adoption leave provisions",
      "Fundamental Rules on pay during maternity leave",
      "Latest G.O.Ms. extending maternity leave to 180 days",
    ],
    procedureSteps: [
      "Receive maternity leave application with expected date of delivery (EDD)",
      "Verify employee is a permanent/regular woman government servant",
      "Sanction maternity leave for up to 180 days (may include pre-delivery period)",
      "Issue sanction order — full pay during entire maternity leave period",
      "Debit maternity leave separately (not from EL/HPL balance)",
      "Inform DDO — full pay continues during maternity leave",
      "On joining after delivery, obtain birth certificate for records",
      "If miscarriage/stillbirth, sanction leave as per amended rules (6 weeks)",
    ],
    checklist: [
      "Application with EDD or delivery date attached",
      "Maternity leave up to 180 days sanctioned",
      "Full pay ordered during maternity leave",
      "Leave not debited from EL/HPL account",
      "DDO informed for continued full pay",
      "Birth certificate obtained after delivery",
      "Joining report processed after leave period",
      "SR entry made for maternity leave period",
    ],
    example:
      "Smt. Anitha, Staff Nurse, DH Kurnool, applied for maternity leave from 01-03-2026 with EDD 15-03-2026. Smt. Lakshmi sanctioned 180 days maternity leave from 01-03-2026 to 27-08-2026 at full pay vide Proc.No. 25/Leave/2026.\n\nNo debit from EL account. DDO continued full pay in CFMS. Smt. Anitha submitted birth certificate after delivery and rejoined on 28-08-2026.",
    sampleDraft: `Proc.No. ___/Leave/2026                          Date: ___

Sub: Leave – Maternity Leave – Sanction to Smt. ___ – Orders – Issued.

Smt. ___ , Staff Nurse, is sanctioned Maternity Leave for 180 days from 01-03-2026 FN to 27-08-2026 AN at full pay.

This leave is not debited to EL/HPL account. Full pay shall continue during the leave period.

Sd/- Superintendent`,
    srEntry:
      "Maternity leave for 180 days from ___ to ___ at full pay vide Proc.No. ___ dated ___.",
    auditObjections: [
      "Maternity leave debited from EL balance incorrectly",
      "Leave period less than 180 days without employee consent",
      "Half pay or no pay during maternity leave period",
      "Maternity leave denied to regular woman employee",
      "No sanction order on file for maternity leave period",
    ],
    goReferences:
      "Latest maternity leave G.O.Ms. (180 days) on [GOIR](https://goir.ap.gov.in/). Maternity Benefit Act compliance orders. AP Leave Rules amendments on [AP Finance](https://www.apfinance.ap.gov.in/).",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Child Care Leave Guidelines",
    slug: "child-care-leave",
    category: "leave",
    tags: ["child-care-leave", "CCL", "women-employees", "leave"],
    summary:
      "Guidelines for Child Care Leave (CCL) for AP government women employees for up to 730 days during entire service for care of two children, including eligibility, sanction procedure, and pay.",
    telugu_summary:
      "Child Care Leave (CCL) guidelines — 730 days entitlement, eligibility, sanction procedure, pay rules.",
    priority: 2,
    primaryRules: [
      "AP Leave Rules — Child Care Leave",
      "G.O.Ms. introducing CCL for AP government employees",
      "AP Leave Rules — CCL pay at 100% for first 365 days",
      "AP Leave Rules — CCL pay at 80% for remaining days",
      "Instructions on CCL for disabled children",
    ],
    procedureSteps: [
      "Receive CCL application specifying child details and period requested",
      "Verify employee has not exhausted 730 days CCL entitlement",
      "Check child is below 18 years (or disabled child without age limit)",
      "Verify CCL not granted for more than two children",
      "Sanction CCL and note pay rate — 100% for first 365 days, 80% thereafter",
      "Maintain CCL register tracking total days availed per employee",
      "Inform DDO for pay adjustment at applicable rate",
      "Record in leave account under separate CCL column",
    ],
    checklist: [
      "Application with child birth certificate or age proof",
      "Total CCL availed + requested ≤ 730 days",
      "Child age verified (below 18 or disabled)",
      "Not exceeding two children limit",
      "Pay rate applied correctly (100% vs 80%)",
      "CCL register updated",
      "DDO informed for pay at correct percentage",
      "Sanction order issued before leave commencement",
    ],
    example:
      "Smt. Lakshmi, Pharmacist, had availed 200 days CCL previously for her first child. She applied for 90 days CCL for her second child's illness from 01-04-2026. Total would be 290 days — within 730-day limit.\n\nCCL sanctioned at 100% pay (within first 365 days) vide Proc.No. 40/Leave/2026. CCL register updated. DDO adjusted pay at full rate for 90 days.",
    sampleDraft: `Proc.No. ___/Leave/2026                          Date: ___

Sub: Leave – Child Care Leave – Sanction to Smt. ___ – Orders – Issued.

Smt. ___ is sanctioned Child Care Leave for 90 days from ___ to ___ for care of her child ___ (age ___).

Total CCL availed: 200 + 90 = 290 days of 730 days entitlement.
Pay: 100% (within first 365 days of CCL).

Sd/- Superintendent`,
    srEntry:
      "CCL for ___ days from ___ to ___ vide Proc.No. ___ dated ___. Total CCL availed: ___ days.",
    auditObjections: [
      "CCL granted beyond 730 days total entitlement",
      "Full pay given after 365 days of CCL availed",
      "CCL granted for third child without special authority",
      "CCL not recorded in separate register",
      "CCL availed without sanction order",
    ],
    goReferences:
      "CCL G.O.Ms. on [GOIR](https://goir.ap.gov.in/). AP Leave Rules CCL amendments on [AP Finance](https://www.apfinance.ap.gov.in/). Clarifications on CCL for disabled children.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Extraordinary Leave Procedure",
    slug: "extraordinary-leave",
    category: "leave",
    tags: ["extraordinary-leave", "EOL", "leave-without-pay", "leave"],
    summary:
      "Procedure for sanctioning Extraordinary Leave (EOL) with or without pay when no other leave is admissible, including conditions, maximum period, and service counting implications.",
    telugu_summary:
      "Extraordinary Leave (EOL) sanction procedure — with/without pay conditions, maximum period, service counting implications.",
    priority: 2,
    primaryRules: [
      "AP Leave Rules — Extraordinary Leave (Rules 86-88)",
      "AP Leave Rules — EOL without pay conditions",
      "AP State and Subordinate Service Rules — Counting of EOL period",
      "Fundamental Rules on leave without pay",
      "AP Leave Rules — EOL for private employment prohibition",
    ],
    procedureSteps: [
      "Receive EOL application when employee has no EL/HPL/CCL balance",
      "Verify no other leave type is admissible for the requested purpose",
      "Determine if EOL with pay (rare, specific conditions) or without pay",
      "Obtain competent authority approval — EOL beyond 6 months needs government sanction",
      "Issue EOL sanction order specifying with/without pay and period",
      "Record in leave account — note increment and service counting impact",
      "Inform DDO for pay stoppage during EOL without pay",
      "On return, process joining and assess probation/increment impact",
    ],
    checklist: [
      "Other leave types verified as exhausted or inapplicable",
      "EOL with/without pay correctly determined",
      "Competent authority appropriate for EOL duration",
      "Sanction order specifies pay status clearly",
      "Leave account updated with EOL entry",
      "DDO informed for pay stoppage if without pay",
      "Increment impact assessed for EOL exceeding 6 months",
      "Private employment prohibition communicated to employee",
    ],
    example:
      "Sri Kiran, Attender, DH Kurnool, exhausted all EL and HPL. He requested 90 days leave for personal reasons. EOL without pay was sanctioned vide Proc.No. 60/Leave/2025 from 01-10-2025 to 29-12-2025.\n\nPay was stopped in CFMS from October 2025. Annual increment due in July 2026 was not affected as EOL was under 6 months. Sri Kiran rejoined on 30-12-2025.",
    sampleDraft: `Proc.No. ___/Leave/2025                          Date: ___

Sub: Leave – EOL – Sanction of Extraordinary Leave without pay to Sri ___ – Orders – Issued.

Sri ___ is sanctioned EOL without pay for 90 days from 01-10-2025 FN to 29-12-2025 AN.

Reason: Personal. No other leave admissible.
Pay shall be stopped during this period. Service counting as per AP Leave Rules.

Sd/- Superintendent`,
    srEntry:
      "EOL without pay for ___ days from ___ to ___ vide Proc.No. ___ dated ___.",
    auditObjections: [
      "EOL with pay granted without specific rule authority",
      "Pay continued during EOL without pay period",
      "EOL beyond 6 months without government sanction",
      "Increment granted during EOL without pay exceeding limits",
      "Employee engaged in private employment during EOL",
    ],
    goReferences:
      "AP Leave Rules EOL provisions on [GOIR](https://goir.ap.gov.in/) and [AP Finance](https://www.apfinance.ap.gov.in/). G.O.Ms. on EOL for COVID/pandemic special provisions if applicable.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Leave Encashment Rules",
    slug: "leave-encashment-rules",
    category: "leave",
    tags: ["leave-encashment", "EL", "retirement", "LTC"],
    summary:
      "Rules for encashment of Earned Leave for AP government employees — on retirement, during service with LTC, maximum limits, calculation method, and bill processing.",
    telugu_summary:
      "Earned Leave encashment rules — retirement/LTC time lo encashment, maximum limits, calculation method.",
    priority: 2,
    primaryRules: [
      "AP Leave Rules — Encashment of EL on retirement",
      "AP Leave Rules — EL encashment with LTC",
      "Fundamental Rules on LTC and leave encashment",
      "AP Pay Rules — Calculation of encashment amount",
      "Finance Department encashment ceiling G.Os",
    ],
    procedureSteps: [
      "Identify encashment trigger — retirement, LTC, or death in service",
      "Extract leave account and determine encashable EL balance",
      "Apply maximum limits — up to 240 days on retirement, 10 days per LTC block",
      "Calculate encashment amount: (Basic Pay + DA) / 30 × number of days",
      "Prepare encashment proposal with leave account and pay particulars",
      "Obtain competent authority sanction",
      "Include encashment in settlement bill (retirement) or separate bill (LTC)",
      "Debit encashed days from leave account and record in SR",
    ],
    checklist: [
      "Leave account verified and balance confirmed",
      "Encashment within maximum permissible days",
      "Calculation checked: (Basic + DA) / 30 × days",
      "Sanction order obtained from competent authority",
      "Encashment included in correct bill type",
      "Leave account debited for encashed days",
      "SR entry made for encashment",
      "Retirement/death orders attached for retirement encashment",
    ],
    example:
      "Sri Venkatesh retired on 31-05-2026 with 280 days EL balance. Encashment limited to 240 days. Basic Pay Rs. 65,000 + DA Rs. 26,000 = Rs. 91,000. Encashment = 91,000/30 × 240 = Rs. 7,28,000.\n\nSmt. Lakshmi prepared encashment proposal vide Proc.No. 200/Estt/2026. Amount included in retirement settlement bill submitted to treasury through CFMS.",
    sampleDraft: `Proc.No. ___/Estt/2026                          Date: ___

Sub: Leave – EL Encashment – Encashment of 240 days EL on retirement of Sri ___ – Orders – Issued.

Sri ___ retires on ___. EL balance: 280 days. Encashable: 240 days (maximum).
Basic + DA: Rs. 91,000. Encashment amount: Rs. 7,28,000.

Sd/- Superintendent`,
    srEntry:
      "EL encashment ___ days amount Rs. ___ vide Proc.No. ___ dated ___.",
    auditObjections: [
      "Encashment exceeding 240 days on retirement",
      "Wrong pay component used in calculation",
      "Encashment without debiting leave account",
      "LTC encashment exceeding 10 days per block",
      "Encashment bill without leave account extract",
    ],
    goReferences:
      "EL encashment rules on [GOIR](https://goir.ap.gov.in/) and [AP Finance](https://www.apfinance.ap.gov.in/). LTC encashment G.O.Ms. Pay calculation instructions for encashment.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://cfms.ap.gov.in/",
    ],
  },
  {
    title: "Leave Account Maintenance",
    slug: "leave-account-maintenance",
    category: "leave",
    tags: ["leave-account", "EL-credit", "leave-register", "audit"],
    summary:
      "How to maintain leave accounts for AP government employees — half-yearly EL credit, debit entries, leave register format, and reconciliation with pay bills for audit compliance.",
    telugu_summary:
      "Leave account maintenance — half-yearly EL credit, debit entries, leave register format, pay bill reconciliation.",
    priority: 2,
    primaryRules: [
      "AP Leave Rules — Leave account format",
      "AP Leave Rules — EL credit on 1 January and 1 July",
      "AP Leave Rules — Deduction for duty loss",
      "Fundamental Rules on attendance and leave",
      "AG Audit instructions on leave account verification",
    ],
    procedureSteps: [
      "Open leave account for each employee on joining",
      "Credit EL on 1 January and 1 July — 15 days minus duty loss",
      "Debit leave on sanction of each leave type with order reference",
      "Maintain leave register with running balance",
      "Reconcile leave account with attendance register quarterly",
      "Verify pay bill reflects correct leave status (full pay/half pay/no pay)",
      "At year-end, certify leave account balances",
      "On transfer/retirement, close leave account and forward to new office",
    ],
    checklist: [
      "Leave account opened for every employee",
      "Half-yearly EL credit posted on time",
      "Duty loss days deducted from EL credit",
      "Every leave sanction debited with order number",
      "Running balance correctly maintained",
      "Quarterly reconciliation with attendance done",
      "Year-end certification completed",
      "Leave account forwarded on transfer",
    ],
    example:
      "During AG audit at DH Kurnool, the auditor checked Smt. Lakshmi's leave account maintenance for 10 sample employees. One discrepancy found — EL credit on 01-01-2026 was 15 days but employee Sri Rama Rao had 5 days unauthorized absence in December 2025.\n\nCorrected EL credit to 10 days (15 − 5 duty loss). Leave account corrected and certified. Audit objection closed.",
    sampleDraft: `LEAVE ACCOUNT — Sri ___ , Staff Nurse

Half-yearly credit:
01-01-2025: +15 EL (minus 0 duty loss) = Balance 45
01-07-2025: +15 EL (minus 2 duty loss) = Balance 58

Debits:
Proc.No. 88/Leave/2026: −15 EL (10-03-2026 to 24-03-2026) = Balance 43

Certified by: ___    Date: ___`,
    srEntry:
      "Leave account closed on transfer/retirement vide Proc.No. ___ dated ___. Balance forwarded: EL ___ days.",
    auditObjections: [
      "EL credited without deducting duty loss",
      "Leave account not maintained for employee",
      "Debits not recorded for sanctioned leave",
      "Balance mismatch between leave account and pay bill",
      "Half-yearly credit not posted on prescribed dates",
    ],
    goReferences:
      "Leave account format in AP Leave Rules on [GOIR](https://goir.ap.gov.in/). AG audit leave verification instructions on [AP Finance](https://www.apfinance.ap.gov.in/).",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },

  // ─── Category 3: apgli (5) ──────────────────────────────────────────────────
  {
    title: "APGLI Policy Registration Process",
    slug: "apgli-policy-registration",
    category: "apgli",
    tags: ["apgli", "policy-registration", "insurance", "subscription"],
    summary:
      "Step-by-step process for registering APGLI policies for newly appointed AP government employees, including proposal submission, premium calculation, and DDO forwarding to APGLI Department.",
    telugu_summary:
      "Kotha government employees ki APGLI policy registration process — proposal submission, premium calculation, DDO forwarding.",
    priority: 2,
    primaryRules: [
      "APGLI Scheme Rules and Regulations",
      "APGLI Premium Tables",
      "Fundamental Rules on APGLI subscription",
      "Finance Department APGLI deduction instructions",
      "APGLI Department circulars on new policy registration",
    ],
    procedureSteps: [
      "Obtain APGLI proposal form from employee on joining or within prescribed period",
      "Verify employee age, designation, and basic pay for premium calculation",
      "Select appropriate sum assured based on pay slab and scheme tables",
      "Complete proposal form with employee details, nominee, and medical declaration if required",
      "Forward proposal through DDO to APGLI Divisional Office with joining report copy",
      "Track policy number allotment from APGLI Department",
      "Enter APGLI deduction in monthly pay bill from policy effective date",
      "Maintain APGLI register with policy number, premium, and nominee details",
    ],
    checklist: [
      "Proposal form completed with all columns filled",
      "Age proof and appointment order attached",
      "Sum assured selected as per premium tables",
      "Nominee details recorded with relationship",
      "DDO forwarded proposal to APGLI office",
      "Policy number received and recorded",
      "Pay bill deduction commenced from effective date",
      "APGLI register updated",
    ],
    example:
      "Sri Rama Rao joined as Lab Technician at DH Kurnool on 01-04-2025 with basic pay Rs. 25,000. Smt. Lakshmi helped him fill APGLI proposal for sum assured Rs. 5,00,000 (premium Rs. 250/month).\n\nProposal forwarded to APGLI Division, Kurnool on 15-04-2025. Policy No. 1234567 allotted on 01-05-2025. Deduction started in May 2025 pay bill through CFMS.",
    sampleDraft: `OFFICE OF THE DDO
DISTRICT HOSPITAL, KURNOOL

Lr.No. ___/APGLI/2025                              Date: ___

To
The Divisional Manager
APGLI, Kurnool

Sub: APGLI – New Policy Registration – Sri ___ – Forwarding – Reg.

APGLI proposal of Sri ___ , Lab Technician (Basic Pay Rs. 25,000), for sum assured Rs. 5,00,000 is forwarded for registration.

Enclosures: Proposal form, appointment order, age proof.

Sd/- DDO`,
    srEntry:
      "APGLI Policy No. ___ for Rs. ___ registered w.e.f. ___. Premium Rs. ___ per month.",
    auditObjections: [
      "APGLI deduction without valid policy number",
      "Premium not deducted from date of policy registration",
      "Sum assured not as per premium tables for pay slab",
      "Proposal not forwarded within prescribed time of joining",
      "APGLI register not maintained",
    ],
    goReferences:
      "APGLI scheme rules and premium tables on [apgli.ap.gov.in](https://www.apgli.ap.gov.in/). Finance Department deduction instructions on [AP Finance](https://www.apfinance.ap.gov.in/). Registration circulars on GOIR.",
    scrapedSources: [
      "https://www.apgli.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://goir.ap.gov.in/",
    ],
  },
  {
    title: "APGLI Premium Revision Procedure",
    slug: "apgli-premium-revision",
    category: "apgli",
    tags: ["apgli", "premium-revision", "increment", "subscription"],
    summary:
      "Procedure for revising APGLI premium after increment or pay revision, including enhanced sum assured options, proposal submission, and pay bill adjustment.",
    telugu_summary:
      "Increment/pay revision taruvata APGLI premium revision procedure — enhanced sum assured, proposal, pay bill adjustment.",
    priority: 2,
    primaryRules: [
      "APGLI Scheme Rules — Premium revision",
      "APGLI Premium Tables (revised)",
      "Finance Department instructions on APGLI enhancement",
      "APGLI circulars on post-increment revision",
      "Fundamental Rules on insurance subscription",
    ],
    procedureSteps: [
      "Identify employees due for premium revision after annual increment or pay revision",
      "Calculate revised sum assured based on new basic pay and premium tables",
      "Obtain employee consent for enhanced sum assured (optional enhancement)",
      "Prepare premium revision proposal with old and new premium details",
      "Forward to APGLI Divisional Office through DDO",
      "Receive revised policy endorsement from APGLI Department",
      "Update pay bill deduction with revised premium from effective date",
      "Update APGLI register with revised sum assured and premium",
    ],
    checklist: [
      "Increment/pay revision order verified",
      "Revised sum assured calculated per premium tables",
      "Employee consent obtained for enhancement",
      "Revision proposal forwarded to APGLI office",
      "Revised policy endorsement received",
      "Pay bill updated with new premium amount",
      "APGLI register updated",
      "Old and new premium documented in personal file",
    ],
    example:
      "After July 2025 increment, Sri Rama Rao's basic pay increased from Rs. 25,000 to Rs. 26,500. Smt. Lakshmi calculated enhanced sum assured from Rs. 5,00,000 to Rs. 6,00,000 (premium Rs. 300/month).\n\nRevision proposal forwarded to APGLI Kurnool. Endorsement received in August 2025. CFMS pay bill updated from September 2025.",
    sampleDraft: `Lr.No. ___/APGLI/2025                              Date: ___

To
The Divisional Manager, APGLI, Kurnool

Sub: APGLI – Premium Revision – Sri ___ – Reg.

Basic pay revised from Rs. 25,000 to Rs. 26,500 w.e.f. 01-07-2025.
Request revision of sum assured from Rs. 5,00,000 to Rs. 6,00,000.

Sd/- DDO`,
    srEntry:
      "APGLI premium revised to Rs. ___ (SA Rs. ___) w.e.f. ___ vide endorsement No. ___.",
    auditObjections: [
      "Premium not revised after pay increment",
      "Deduction at old premium after revision effective date",
      "Enhanced sum assured without APGLI endorsement",
      "Revision not reflected in pay bill",
      "APGLI register shows outdated premium",
    ],
    goReferences:
      "Premium revision circulars on [apgli.ap.gov.in](https://www.apgli.ap.gov.in/). Pay revision linked APGLI instructions on [AP Finance](https://www.apfinance.ap.gov.in/).",
    scrapedSources: [
      "https://www.apgli.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://goir.ap.gov.in/",
    ],
  },
  {
    title: "APGLI Loan Application Guide",
    slug: "apgli-loan-application",
    category: "apgli",
    tags: ["apgli", "loan", "sanction", "recovery"],
    summary:
      "Complete guide to APGLI loan application, eligibility verification, sanction process, disbursement, and recovery through monthly pay bills for Health Department employees.",
    telugu_summary:
      "APGLI loan application, eligibility verification, sanction, disbursement మరియు pay bill recovery complete guide.",
    priority: 1,
    primaryRules: [
      "APGLI Loan Rules and Eligibility Criteria",
      "APGLI Scheme — Loan ceiling limits",
      "Finance Department recovery through pay bill instructions",
      "APGLI Department loan sanction procedures",
      "APGLI circulars on loan interest and repayment",
    ],
    procedureSteps: [
      "Verify employee has active APGLI policy with minimum subscription period",
      "Check loan eligibility — surrender value, premium payment history, existing loans",
      "Collect loan application with policy number and purpose declaration",
      "Forward application through DDO to APGLI Divisional Office with NOC",
      "Track sanction from APGLI Department with sanctioned amount and EMI",
      "After disbursement, enter loan recovery in monthly pay bill through CFMS",
      "Maintain APGLI loan register with principal, interest, and balance",
      "Issue clearance certificate after full repayment for next loan eligibility",
    ],
    checklist: [
      "Active APGLI policy verified",
      "Minimum subscription period completed",
      "No existing loan default or overdue",
      "Loan amount within eligible ceiling",
      "Application complete with DDO forwarding",
      "Sanction order received from APGLI",
      "Recovery entered in pay bill from disbursement month",
      "Loan register maintained with running balance",
    ],
    example:
      "Smt. Lakshmi, Staff Nurse, applied for APGLI loan of Rs. 2,00,000 against Policy No. 7654321 (SA Rs. 10,00,000, 8 years subscription). Smt. Parvathi, establishment clerk, verified eligibility and forwarded through DDO.\n\nAPGLI Kurnool sanctioned Rs. 1,80,000 (90% of surrender value) with EMI Rs. 8,500 for 24 months. Recovery started in CFMS from February 2026 pay bill.",
    sampleDraft: `Lr.No. ___/APGLI/2026                              Date: ___

To
The Divisional Manager, APGLI, Kurnool

Sub: APGLI – Loan Application – Smt. ___ – Forwarding – Reg.

Loan application of Smt. ___ for Rs. 2,00,000 against Policy No. ___ (SA Rs. 10,00,000) is forwarded.

No objection from this office. Premium paid up to date. No existing loan.

Sd/- DDO, DH Kurnool`,
    srEntry:
      "APGLI loan Rs. ___ sanctioned vide APGLI order No. ___ dated ___. EMI Rs. ___ per month.",
    auditObjections: [
      "Loan disbursed without proper APGLI sanction",
      "Recovery not started in pay bill after disbursement",
      "Loan amount exceeding eligible ceiling",
      "Recovery stopped before full repayment without clearance",
      "Loan granted with premium defaults",
    ],
    goReferences:
      "APGLI loan rules and application forms on [apgli.ap.gov.in](https://www.apgli.ap.gov.in/). Recovery instructions on [AP Finance](https://www.apfinance.ap.gov.in/) and CFMS.",
    scrapedSources: [
      "https://www.apgli.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://cfms.ap.gov.in/",
    ],
  },
  {
    title: "APGLI Maturity Claim Process",
    slug: "apgli-maturity-claim",
    category: "apgli",
    tags: ["apgli", "maturity-claim", "retirement", "settlement"],
    summary:
      "Process for filing APGLI maturity claims when policy matures on retirement or completion of term, including documents, DDO certification, and disbursement procedure.",
    telugu_summary:
      "Policy maturity/retirement time APGLI maturity claim process — documents, DDO certification, disbursement.",
    priority: 2,
    primaryRules: [
      "APGLI Scheme Rules — Maturity settlement",
      "APGLI Claim Procedure",
      "AP Revised Pension Rules — APGLI at retirement",
      "Finance Department no-dues certification for APGLI",
      "APGLI Department claim processing instructions",
    ],
    procedureSteps: [
      "Identify policies maturing on employee retirement or policy term completion",
      "Collect maturity claim form from APGLI office or download from portal",
      "Attach retirement order, policy bond, identity proof, and bank account details",
      "Obtain DDO certification confirming no outstanding APGLI loan or premium dues",
      "Forward claim to APGLI Divisional Office with complete enclosures",
      "Track claim processing status on APGLI portal",
      "Receive maturity amount disbursement to employee bank account",
      "Record settlement in APGLI register and close policy entry",
    ],
    checklist: [
      "Maturity claim form completed",
      "Retirement/vacation order attached",
      "Policy bond and last premium receipt enclosed",
      "DDO no-dues certificate obtained",
      "Bank account details (passbook copy) attached",
      "No outstanding APGLI loan verified",
      "Claim forwarded within prescribed time",
      "Disbursement confirmed and recorded",
    ],
    example:
      "Sri Venkatesh retired on 31-05-2026 with APGLI Policy No. 3456789 (SA Rs. 8,00,000, matured). Smt. Lakshmi prepared maturity claim with retirement Proc.No. 200/Estt/2026, DDO no-dues certificate, and bank passbook copy.\n\nClaim forwarded to APGLI Kurnool on 15-06-2026. Maturity amount Rs. 8,45,000 (SA + bonus) credited to Sri Venkatesh's account on 30-07-2026.",
    sampleDraft: `Lr.No. ___/APGLI/2026                              Date: ___

To
The Divisional Manager, APGLI, Kurnool

Sub: APGLI – Maturity Claim – Sri ___ (Retired) – Forwarding – Reg.

Maturity claim of Sri ___ , Policy No. ___ (SA Rs. 8,00,000), retired on 31-05-2026, is forwarded.

DDO certifies: No outstanding loan. Premium paid up to retirement.

Enclosures: Claim form, retirement order, policy bond, bank passbook.

Sd/- DDO`,
    srEntry:
      "APGLI maturity claim Rs. ___ settled vide APGLI claim No. ___ dated ___.",
    auditObjections: [
      "Maturity claim delayed beyond prescribed period",
      "Claim submitted with outstanding loan not disclosed",
      "DDO no-dues certificate not obtained",
      "Premium defaults not cleared before maturity claim",
      "APGLI register not updated after settlement",
    ],
    goReferences:
      "Maturity claim forms and procedures on [apgli.ap.gov.in](https://www.apgli.ap.gov.in/). Retirement settlement instructions on [AP Finance](https://www.apfinance.ap.gov.in/).",
    scrapedSources: [
      "https://www.apgli.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://goir.ap.gov.in/",
    ],
  },
  {
    title: "Common APGLI Mistakes and Solutions",
    slug: "apgli-common-mistakes",
    category: "apgli",
    tags: ["apgli", "mistakes", "compliance", "audit"],
    summary:
      "Common APGLI processing mistakes in Health Department offices — wrong premium deduction, missing registration, loan recovery errors — and their corrective solutions.",
    telugu_summary:
      "Health Department offices lo common APGLI mistakes — wrong premium, missing registration, loan recovery errors — mariu solutions.",
    priority: 2,
    primaryRules: [
      "APGLI Scheme Rules",
      "Finance Department pay bill deduction instructions",
      "AG Audit objections on APGLI compliance",
      "APGLI Department compliance circulars",
      "CFMS deduction head codes for APGLI",
    ],
    procedureSteps: [
      "Identify common error — missing registration, wrong premium, recovery not started",
      "Verify correct position from APGLI office/policy records",
      "Prepare correction proposal with details of error and correct position",
      "For premium short/excess deduction, prepare arrear/recovery adjustment bill",
      "Forward correction to APGLI office for endorsement if policy details changed",
      "Update CFMS pay bill with correct deduction head and amount",
      "Update APGLI register and personal file with correction details",
      "Implement preventive checks — monthly reconciliation of APGLI deductions",
    ],
    checklist: [
      "Error identified and documented",
      "Correct premium/policy details verified from APGLI office",
      "Arrear or recovery bill prepared if needed",
      "APGLI office intimated of correction",
      "CFMS pay bill corrected",
      "APGLI register updated",
      "Monthly reconciliation process established",
      "Preventive checklist added to pay bill processing",
    ],
    example:
      "During monthly check, Smt. Lakshmi found Sri Rama Rao's APGLI premium was deducted at Rs. 250 instead of revised Rs. 300 since August 2025. Short deduction of Rs. 50 × 6 months = Rs. 300 arrear.\n\nArrear bill prepared and submitted through CFMS. APGLI register corrected. Monthly reconciliation checklist now included in pay bill verification.",
    sampleDraft: `OFFICE MEMORANDUM

Sub: APGLI – Correction of Premium Deduction – Sri ___ – Reg.

Error: Premium deducted at Rs. 250 instead of Rs. 300 w.e.f. 01-08-2025.
Correction: Arrear bill for Rs. 300 (6 months × Rs. 50) submitted.
Future: Rs. 300/month from January 2026 pay bill.

Sd/- DDO`,
    srEntry:
      "APGLI premium correction: arrear Rs. ___ recovered vide bill No. ___ dated ___.",
    auditObjections: [
      "APGLI deduction without policy registration",
      "Premium not revised after increment",
      "Loan recovery not effected in pay bill",
      "Excess deduction without APGLI refund processing",
      "No APGLI register maintained for audit",
    ],
    goReferences:
      "APGLI compliance guidelines on [apgli.ap.gov.in](https://www.apgli.ap.gov.in/). CFMS deduction codes on [cfms.ap.gov.in](https://cfms.ap.gov.in/). AG audit APGLI objections on [AP Finance](https://www.apfinance.ap.gov.in/).",
    scrapedSources: [
      "https://www.apgli.ap.gov.in/",
      "https://cfms.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
    ],
  },

  // ─── Category 4: gpf (5) ────────────────────────────────────────────────────
  {
    title: "GPF Advance Procedure",
    slug: "gpf-advance",
    category: "gpf",
    tags: ["gpf", "advance", "temporary", "non-temporary"],
    summary:
      "How to process GPF temporary and non-temporary advances for AP government employees — eligibility, application forms, sanction through DDO, and recovery in pay bills.",
    telugu_summary:
      "GPF temporary/non-temporary advances process — eligibility, application, DDO sanction, pay bill recovery.",
    priority: 1,
    primaryRules: [
      "AP General Provident Fund Rules",
      "GPF Temporary Advance Rules (purpose-wise limits)",
      "GPF Non-Temporary Advance Rules",
      "Finance Department GPF advance sanction procedures",
      "AG AP instructions on GPF advance recovery",
    ],
    procedureSteps: [
      "Verify employee is GPF subscriber with sufficient account balance",
      "Identify advance type — temporary (specific purposes) or non-temporary",
      "Collect application with purpose declaration and supporting documents",
      "Verify advance amount within limits for stated purpose",
      "Route application through DDO for sanction",
      "After AG/Accounts sanction, arrange disbursement through treasury/CFMS",
      "Enter recovery schedule in monthly pay bill (max 24 installments for temporary)",
      "Update GPF register with advance details and recovery progress",
    ],
    checklist: [
      "GPF account balance verified (minimum subscription period completed)",
      "Advance type and purpose correctly identified",
      "Amount within purpose-wise ceiling limits",
      "Application with supporting documents complete",
      "DDO/AG sanction obtained",
      "Disbursement arranged through proper channel",
      "Recovery started in next pay bill",
      "GPF register updated with advance and recovery schedule",
    ],
    example:
      "Sri Rama Rao applied for GPF temporary advance of Rs. 1,00,000 for house construction. GPF balance: Rs. 3,50,000. Smt. Lakshmi verified purpose eligibility (max 75% of balance for construction = Rs. 2,62,500).\n\nApplication forwarded to AG AP through DDO. Sanction received. Rs. 1,00,000 disbursed through CFMS. Recovery at Rs. 4,500/month for 24 months started from March 2026 pay bill.",
    sampleDraft: `Application for GPF Temporary Advance

Name: Sri ___    GPF A/c No.: ___
Purpose: House construction    Amount: Rs. 1,00,000
GPF Balance: Rs. 3,50,000

Recovery: 24 monthly installments of Rs. 4,500

Forwarded for sanction: DDO, DH Kurnool    Date: ___`,
    srEntry:
      "GPF advance Rs. ___ for ___ sanctioned vide AG order No. ___ dated ___. Recovery ___ installments.",
    auditObjections: [
      "Advance for ineligible purpose or exceeding ceiling",
      "Recovery not started in pay bill after disbursement",
      "Advance without AG/DDO sanction on file",
      "Recovery period exceeding 24 installments for temporary advance",
      "GPF register not updated with advance details",
    ],
    goReferences:
      "AP GPF Rules on AG AP portal via [AP Finance](https://www.apfinance.ap.gov.in/). GPF advance forms and purpose limits. CFMS disbursement instructions on [cfms.ap.gov.in](https://cfms.ap.gov.in/).",
    scrapedSources: [
      "https://www.apfinance.ap.gov.in/",
      "https://cfms.ap.gov.in/",
      "https://goir.ap.gov.in/",
    ],
  },
  {
    title: "GPF Withdrawal Rules",
    slug: "gpf-withdrawal-rules",
    category: "gpf",
    tags: ["gpf", "withdrawal", "part-final", "settlement"],
    summary:
      "Rules for GPF part-final withdrawal and partial withdrawals during service for specific purposes like marriage, education, and medical treatment under AP GPF Rules.",
    telugu_summary:
      "GPF part-final withdrawal rules — marriage, education, medical treatment purposes ki partial withdrawal procedure.",
    priority: 2,
    primaryRules: [
      "AP General Provident Fund Rules — Part-final withdrawal",
      "GPF Rules — Purpose-wise withdrawal limits",
      "GPF Rules — Minimum balance after withdrawal",
      "Finance Department GPF withdrawal procedures",
      "AG AP circulars on GPF part-final withdrawal",
    ],
    procedureSteps: [
      "Identify withdrawal purpose — marriage, education, medical, or other permitted purpose",
      "Verify GPF account balance and minimum balance requirement after withdrawal",
      "Collect application with purpose proof (marriage invitation, fee receipt, medical bills)",
      "Calculate maximum permissible withdrawal for the stated purpose",
      "Forward through DDO to AG/GPF authorities for sanction",
      "After sanction, process disbursement through treasury/CFMS",
      "Update GPF register reflecting withdrawal and reduced balance",
      "No recovery required for part-final withdrawals (unlike advances)",
    ],
    checklist: [
      "Purpose eligible under GPF Rules verified",
      "GPF balance sufficient including minimum balance requirement",
      "Supporting documents for purpose attached",
      "Withdrawal amount within purpose-wise limit",
      "AG/DDO sanction obtained",
      "Disbursement processed",
      "GPF register updated",
      "GPF slip issued to employee showing reduced balance",
    ],
    example:
      "Smt. Lakshmi applied for GPF part-final withdrawal of Rs. 50,000 for her daughter's marriage. GPF balance: Rs. 2,80,000. Marriage invitation and relationship proof attached.\n\nPermissible withdrawal for marriage: up to 50% of balance = Rs. 1,40,000. Application for Rs. 50,000 forwarded and sanctioned. Disbursed through CFMS. GPF balance reduced to Rs. 2,30,000.",
    sampleDraft: `Application for GPF Part-Final Withdrawal

Name: Smt. ___    GPF A/c No.: ___
Purpose: Daughter's marriage    Amount: Rs. 50,000
GPF Balance: Rs. 2,80,000

Enclosures: Marriage invitation, relationship proof.

Sd/- Applicant    Forwarded: DDO    Date: ___`,
    srEntry:
      "GPF part-final withdrawal Rs. ___ for ___ vide AG order No. ___ dated ___.",
    auditObjections: [
      "Withdrawal for ineligible purpose",
      "Amount exceeding purpose-wise limit",
      "Balance below minimum after withdrawal",
      "Withdrawal without supporting documents",
      "GPF register not updated after withdrawal",
    ],
    goReferences:
      "AP GPF part-final withdrawal rules on AG AP portal via [AP Finance](https://www.apfinance.ap.gov.in/). Purpose-wise limits in GPF Rules circulars on GOIR.",
    scrapedSources: [
      "https://www.apfinance.ap.gov.in/",
      "https://goir.ap.gov.in/",
      "https://cfms.ap.gov.in/",
    ],
  },
  {
    title: "Final GPF Settlement Process",
    slug: "gpf-final-settlement",
    category: "gpf",
    tags: ["gpf", "final-settlement", "retirement", "withdrawal"],
    summary:
      "Complete process for final GPF settlement on retirement, death in service, or resignation — forms, DDO certification, AG processing, and disbursement timeline.",
    telugu_summary:
      "Retirement/death/resignation time final GPF settlement process — forms, DDO certification, AG processing, disbursement.",
    priority: 2,
    primaryRules: [
      "AP General Provident Fund Rules — Final withdrawal",
      "GPF Rules — Settlement on retirement/death/resignation",
      "AP Revised Pension Rules — GPF at retirement",
      "AG AP GPF settlement processing instructions",
      "Finance Department no-dues for GPF settlement",
    ],
    procedureSteps: [
      "Trigger event — retirement, death, or resignation order received",
      "Collect GPF final withdrawal application (Form applicable)",
      "Prepare DDO certificate confirming last subscription and no outstanding advance",
      "Attach retirement/death/resignation order and GPF account slip",
      "Forward to AG AP/GPF office within prescribed time",
      "Follow up on GPF statement finalization by AG",
      "After AG sanction, disbursement through treasury/CFMS to nominee/employee",
      "Close GPF register entry and record in SR",
    ],
    checklist: [
      "Retirement/death/resignation order on file",
      "GPF final withdrawal form completed",
      "Last subscription month verified in pay bills",
      "No outstanding GPF advance/recovery confirmed",
      "DDO certificate attached",
      "Nominee details verified (for death cases)",
      "Submitted to AG within time limit",
      "Disbursement confirmed and register closed",
    ],
    example:
      "Sri Venkatesh retired on 31-05-2026. GPF A/c No. 12345, last subscription April 2026. No outstanding advance. Smt. Lakshmi prepared final withdrawal application with DDO certificate and retirement order.\n\nForwarded to AG AP on 20-06-2026. Final GPF balance Rs. 8,50,000 (including interest) sanctioned and credited to Sri Venkatesh's bank account on 15-08-2026.",
    sampleDraft: `GPF Final Withdrawal Application

Name: Sri ___    GPF A/c No.: 12345
Event: Retirement on 31-05-2026
Last subscription: April 2026

DDO certifies: No outstanding advance. Subscription up to date.

Forwarded to AG AP: ___    Date: 20-06-2026`,
    srEntry:
      "GPF final settlement Rs. ___ vide AG order No. ___ dated ___. Account closed.",
    auditObjections: [
      "Final settlement delayed beyond prescribed period",
      "Outstanding advance not recovered before final settlement",
      "Last subscription month not verified",
      "Settlement to wrong nominee without succession certificate",
      "GPF register not closed after settlement",
    ],
    goReferences:
      "GPF final settlement procedures on AG AP via [AP Finance](https://www.apfinance.ap.gov.in/). Retirement GPF instructions on [GOIR](https://goir.ap.gov.in/).",
    scrapedSources: [
      "https://www.apfinance.ap.gov.in/",
      "https://goir.ap.gov.in/",
      "https://cfms.ap.gov.in/",
    ],
  },
  {
    title: "Missing GPF Credits – What to Do",
    slug: "gpf-missing-credits",
    category: "gpf",
    tags: ["gpf", "missing-credits", "reconciliation", "AG"],
    summary:
      "How to identify, report, and rectify missing GPF subscription credits in employee accounts — reconciliation with pay bills, AG complaint procedure, and preventive measures.",
    telugu_summary:
      "GPF subscription credits miss ayyina cases identify, report, rectify cheyadam — pay bill reconciliation, AG complaint procedure.",
    priority: 2,
    primaryRules: [
      "AP General Provident Fund Rules — Subscription",
      "Finance Department GPF deduction through pay bill",
      "AG AP GPF account maintenance instructions",
      "CFMS GPF deduction head codes",
      "AG Audit objections on GPF subscription gaps",
    ],
    procedureSteps: [
      "Compare GPF slip/AG statement with pay bill deductions for discrepancies",
      "Identify missing months — subscription deducted in pay bill but not credited to GPF",
      "Collect pay bill copies showing GPF deduction for missing months",
      "Prepare representation to AG AP/GPF section with pay bill evidence",
      "Simultaneously check CFMS deduction entries for correct head and amount",
      "Follow up with AG for credit adjustment in GPF account",
      "Obtain revised GPF slip confirming credits posted",
      "Implement monthly GPF reconciliation between pay bill and GPF register",
    ],
    checklist: [
      "GPF slip compared with pay bill deductions",
      "Missing months identified with amounts",
      "Pay bill copies collected as evidence",
      "Representation submitted to AG AP",
      "CFMS entries verified for correct deduction",
      "AG credit adjustment confirmed",
      "Revised GPF slip obtained",
      "Monthly reconciliation process established",
    ],
    example:
      "Sri Rama Rao's GPF slip showed no credit for March-June 2025, but pay bills confirmed deduction of Rs. 3,000/month. Smt. Lakshmi collected 4 pay bill copies and submitted representation to AG AP on 10-01-2026.\n\nAG credited Rs. 12,000 (4 months) to GPF account in February 2026. Revised slip obtained. Monthly reconciliation checklist added to pay bill process.",
    sampleDraft: `Representation to AG AP

Sub: GPF – Missing Credits – Sri ___ (GPF A/c No. ___) – Reg.

GPF credits missing for March-June 2025 despite deduction in pay bills.
Amount: Rs. 3,000 × 4 months = Rs. 12,000.

Enclosures: Pay bill copies (4 months).

Requested: Credit adjustment in GPF account.

Sd/- DDO, DH Kurnool    Date: ___`,
    srEntry:
      "GPF missing credits Rs. ___ for ___ to ___ regularized vide AG order No. ___ dated ___.",
    auditObjections: [
      "GPF deducted in pay bill but not remitted to AG",
      "Missing credits not identified or reported timely",
      "GPF subscription stopped without employee intimation",
      "Deduction at wrong amount in CFMS",
      "No reconciliation between pay bill and GPF account",
    ],
    goReferences:
      "GPF subscription and remittance instructions on [AP Finance](https://www.apfinance.ap.gov.in/). CFMS GPF deduction procedures on [cfms.ap.gov.in](https://cfms.ap.gov.in/). AG AP GPF grievance portal.",
    scrapedSources: [
      "https://www.apfinance.ap.gov.in/",
      "https://cfms.ap.gov.in/",
      "https://goir.ap.gov.in/",
    ],
  },
  {
    title: "GPF Nomination and Corrections",
    slug: "gpf-nomination-corrections",
    category: "gpf",
    tags: ["gpf", "nomination", "correction", "succession"],
    summary:
      "Procedure for GPF nomination at joining, subsequent changes, and corrections in nominee details including Form 3/Form 4 requirements and AG processing.",
    telugu_summary:
      "GPF nomination at joining, subsequent changes, nominee details corrections — Form 3/Form 4 procedure.",
    priority: 2,
    primaryRules: [
      "AP General Provident Fund Rules — Nomination",
      "GPF Form 3 (Initial nomination) and Form 4 (Revocation/change)",
      "GPF Rules — Nomination in favour of family members",
      "Succession rules for GPF when no valid nomination exists",
      "AG AP nomination processing instructions",
    ],
    procedureSteps: [
      "Obtain GPF nomination (Form 3) from employee at time of GPF subscription",
      "Verify nominee is family member as defined in GPF Rules",
      "If employee requests change, collect Form 4 (revocation of old + new nomination)",
      "For correction in nominee name/relationship, collect affidavit and proof",
      "Forward nomination forms to AG AP/GPF section through DDO",
      "Track acknowledgment and updated nomination record from AG",
      "Maintain copy of nomination in personal file and GPF register",
      "Verify nomination validity at time of final settlement or death claim",
    ],
    checklist: [
      "Form 3 obtained at joining/GPF subscription",
      "Nominee is eligible family member",
      "Form 4 collected for any nomination change",
      "Supporting documents for correction attached",
      "Forwarded to AG AP with DDO certification",
      "AG acknowledgment received",
      "Copy maintained in personal file",
      "Nomination verified before final settlement",
    ],
    example:
      "Smt. Lakshmi submitted GPF nomination change (Form 4) to replace her father (previous nominee) with her husband after marriage. Old Form 3 revoked, new Form 4 with husband's details and marriage certificate attached.\n\nForwarded to AG AP. Updated nomination confirmed in GPF records. Copy filed in personal file.",
    sampleDraft: `GPF Form 4 — Change of Nomination

Subscriber: Smt. ___    GPF A/c No.: ___
Previous nominee: Father — Sri ___ (revoked)
New nominee: Husband — Sri ___

Enclosures: Form 4, marriage certificate.

Forwarded: DDO, DH Kurnool    Date: ___`,
    srEntry:
      "GPF nomination changed to ___ vide Form 4 acknowledged by AG AP on ___.",
    auditObjections: [
      "No valid nomination on file at GPF subscription",
      "Nomination change not forwarded to AG AP",
      "Nominee not an eligible family member",
      "Final settlement to wrong person due to outdated nomination",
      "Form 4 not signed by witness as required",
    ],
    goReferences:
      "GPF nomination forms and rules on AG AP portal via [AP Finance](https://www.apfinance.ap.gov.in/). Succession certificate requirements on GOIR.",
    scrapedSources: [
      "https://www.apfinance.ap.gov.in/",
      "https://goir.ap.gov.in/",
      "https://cfms.ap.gov.in/",
    ],
  },

  // ─── Category 5: finance (7) ────────────────────────────────────────────────
  {
    title: "Budget Control Register (BCR) Maintenance",
    slug: "bcr-maintenance",
    category: "finance",
    tags: ["BCR", "budget", "finance", "expenditure"],
    summary:
      "How to maintain Budget Control Register (BCR) for AP government offices — allotment tracking, expenditure recording, reappropriation, and monthly reconciliation for Health Department institutions.",
    telugu_summary:
      "Budget Control Register (BCR) maintenance — allotment tracking, expenditure recording, monthly reconciliation.",
    priority: 1,
    primaryRules: [
      "AP Financial Code — Budget Control Register",
      "AP Budget Manual — Allotment and expenditure",
      "Fundamental Rules on budget authorization",
      "CFMS budget allotment and expenditure tracking",
      "Finance Department BCR maintenance instructions",
    ],
    procedureSteps: [
      "Open BCR at beginning of financial year with budget allotment details",
      "Record head-wise allotment received from DDO/DHO/Commissioner",
      "Enter every bill payment against appropriate budget head/sub-head",
      "Calculate progressive expenditure and balance available monthly",
      "Verify BCR entries against CFMS expenditure reports",
      "Process reappropriation requests when head-wise funds insufficient",
      "Submit monthly BCR statement to controlling DDO",
      "Close BCR at year-end with reconciliation certificate",
    ],
    checklist: [
      "BCR opened with correct budget heads and allotments",
      "Every payment entered promptly with bill number and date",
      "Progressive total and balance calculated correctly",
      "Monthly reconciliation with CFMS done",
      "Expenditure not exceeding allotment without reappropriation",
      "Monthly BCR statement submitted to DDO",
      "Reappropriation orders filed and BCR updated",
      "Year-end reconciliation certificate prepared",
    ],
    example:
      "District Hospital Kurnool BCR for FY 2025-26 showed allotment of Rs. 50,00,000 under MH-251 (Drugs and Medicines). By December 2025, expenditure was Rs. 32,00,000. Smt. Lakshmi, accounts clerk, maintained daily BCR entries from CFMS payment reports.\n\nMonthly reconciliation on 05-01-2026 confirmed BCR balance of Rs. 18,00,000 matched CFMS report. No overspending detected.",
    sampleDraft: `BUDGET CONTROL REGISTER — FY 2025-26
Head: MH-251 (Drugs and Medicines)    Allotment: Rs. 50,00,000

Date       Bill No.    Particulars         Debit      Balance
01-04-25   —           Opening allotment   —          50,00,000
15-04-25   CB-101      Medicines purchase  2,50,000   47,50,000
...
Total expenditure: Rs. 32,00,000    Balance: Rs. 18,00,000

Certified: ___    Date: 05-01-2026`,
    srEntry:
      "Not applicable — BCR is office-level financial record, not individual SR entry.",
    auditObjections: [
      "Expenditure exceeding allotment without reappropriation",
      "BCR not maintained or not updated regularly",
      "BCR balance not reconciled with CFMS",
      "Payments not entered in BCR promptly",
      "Monthly BCR statements not submitted to controlling authority",
    ],
    goReferences:
      "AP Financial Code BCR provisions on [AP Finance](https://www.apfinance.ap.gov.in/). Budget manual and CFMS expenditure reports on [cfms.ap.gov.in](https://cfms.ap.gov.in/). Budget G.Os on [GOIR](https://goir.ap.gov.in/).",
    scrapedSources: [
      "https://www.apfinance.ap.gov.in/",
      "https://cfms.ap.gov.in/",
      "https://goir.ap.gov.in/",
    ],
  },
  {
    title: "Contingent Bill Preparation",
    slug: "contingent-bill-preparation",
    category: "finance",
    tags: ["contingent-bill", "expenditure", "treasury", "finance"],
    summary:
      "Step-by-step guide to preparing contingent bills for AP government office expenditure — format, enclosures, budget head coding, and submission through CFMS to treasury.",
    telugu_summary:
      "Contingent bill preparation — format, enclosures, budget head coding, CFMS/treasury submission guide.",
    priority: 2,
    primaryRules: [
      "AP Financial Code — Contingent Bill format",
      "AP Treasury Code — Bill submission",
      "Fundamental Rules on payment authorization",
      "CFMS bill processing instructions",
      "Delegation of Financial Powers Rules",
    ],
    procedureSteps: [
      "Collect supporting documents — invoices, receipts, sanction orders",
      "Verify expenditure is covered under budget allotment (check BCR balance)",
      "Prepare contingent bill in prescribed format with budget head/sub-head",
      "Attach copies of invoices, sanction orders, and quotation comparisons if applicable",
      "Obtain DDO/Superintendent certification and financial advisor approval if required",
      "Enter bill in CFMS with correct object head and vendor details",
      "Submit to treasury through CFMS workflow",
      "Record payment in BCR and maintain bill register after treasury pass order",
    ],
    checklist: [
      "Supporting invoices/receipts original verified and copied",
      "Budget head correctly coded",
      "BCR balance sufficient for bill amount",
      "Contingent bill format complete with all columns",
      "DDO certification obtained",
      "CFMS entry with correct vendor and amount",
      "Treasury pass order received and filed",
      "BCR and bill register updated",
    ],
    example:
      "DH Kurnool purchased surgical gloves worth Rs. 45,000 from M/s. Medical Supplies Co. Smt. Lakshmi prepared contingent bill under MH-251 with invoice, purchase order, and store receipt.\n\nDDO certified the bill. Entered in CFMS as CB-245/2025-26. Treasury passed on 20-12-2025. BCR updated with Rs. 45,000 debit.",
    sampleDraft: `CONTINGENT BILL

Bill No.: CB-245/2025-26    Date: 15-12-2025
Office: District Hospital, Kurnool

Budget Head: MH-251    Amount: Rs. 45,000
Particulars: Surgical gloves — M/s. Medical Supplies Co.

Enclosures: Invoice, PO, Store receipt.

Certified for payment: DDO    Date: 15-12-2025`,
    srEntry:
      "Not applicable — contingent bills are office expenditure records.",
    auditObjections: [
      "Bill without supporting invoices or receipts",
      "Wrong budget head charged",
      "Expenditure without budget allotment",
      "Duplicate payment for same invoice",
      "Contingent bill not entered in CFMS/bill register",
    ],
    goReferences:
      "Contingent bill format in AP Financial Code on [AP Finance](https://www.apfinance.ap.gov.in/). CFMS bill entry instructions on [cfms.ap.gov.in](https://cfms.ap.gov.in/).",
    scrapedSources: [
      "https://www.apfinance.ap.gov.in/",
      "https://cfms.ap.gov.in/",
      "https://goir.ap.gov.in/",
    ],
  },
  {
    title: "CFMS Bill Processing Guide",
    slug: "cfms-bill-processing",
    category: "finance",
    tags: ["CFMS", "bill-processing", "treasury", "finance"],
    summary:
      "Complete guide to processing bills through Comprehensive Financial Management System (CFMS) — login, bill types, workflow stages, and common rejection reasons for Health Department offices.",
    telugu_summary:
      "CFMS lo bill processing complete guide — login, bill types, workflow stages, common rejection reasons.",
    priority: 2,
    primaryRules: [
      "CFMS User Manual and Bill Processing Guidelines",
      "AP Financial Code — Electronic payment procedures",
      "Treasury Code — CFMS integration",
      "Delegation of Financial Powers in CFMS workflow",
      "Finance Department CFMS circulars",
    ],
    procedureSteps: [
      "Login to CFMS portal with DDO/operator credentials",
      "Select appropriate bill type — contingent, pay, pension, transfer, etc.",
      "Enter bill details — vendor/employee, amount, budget head, object code",
      "Upload supporting documents as required by bill type",
      "Submit bill for verification by bill verifier/designated officer",
      "Track bill status through workflow stages — submitted, verified, approved, passed",
      "Address rejections — correct errors and resubmit",
      "After treasury pass, download payment advice and update office registers",
    ],
    checklist: [
      "Correct bill type selected in CFMS",
      "Budget head and object code correctly entered",
      "Vendor/employee bank details verified in CFMS",
      "Supporting documents uploaded",
      "Bill verified by designated officer",
      "Rejection reasons addressed promptly",
      "Payment advice downloaded after pass",
      "BCR and bill register updated",
    ],
    example:
      "Smt. Lakshmi entered medical reimbursement bill for Sri Rama Rao (Rs. 12,500) in CFMS. Bill type: Transfer Bill. Budget head: MH-107. Uploaded medical bills and sanction order.\n\nBill rejected once — wrong object code. Corrected and resubmitted. Passed on 18-01-2026. Payment credited to Sri Rama Rao's bank account on 22-01-2026.",
    sampleDraft: `CFMS Bill Entry Checklist

Bill Type: Transfer Bill    Employee: Sri ___
Amount: Rs. 12,500    Head: MH-107
Object Code: ___ (verified)

Uploads: Medical bills, sanction order
Status: Submitted → Verified → Approved → Passed

Payment advice: PA-___ dated 22-01-2026`,
    srEntry:
      "Not applicable — CFMS bills are office-level financial transactions.",
    auditObjections: [
      "Bill processed outside CFMS without exemption",
      "Wrong budget head or object code in CFMS entry",
      "Payment to incorrect bank account",
      "Bill passed without supporting documents uploaded",
      "Rejected bills not corrected and resubmitted timely",
    ],
    goReferences:
      "CFMS user manual and bill processing guides on [cfms.ap.gov.in](https://cfms.ap.gov.in/). Finance Department CFMS circulars on [AP Finance](https://www.apfinance.ap.gov.in/).",
    scrapedSources: [
      "https://cfms.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://goir.ap.gov.in/",
    ],
  },
  {
    title: "Treasury Objections and How to Avoid Them",
    slug: "treasury-objections",
    category: "finance",
    tags: ["treasury", "objections", "audit", "finance"],
    summary:
      "Common treasury objections on AP government bills and preventive measures — incorrect budget heads, missing sanctions, arithmetic errors, and compliance requirements for Health Department.",
    telugu_summary:
      "Treasury objections common reasons mariu preventive measures — wrong budget heads, missing sanctions, arithmetic errors.",
    priority: 2,
    primaryRules: [
      "AP Treasury Code — Bill scrutiny and objections",
      "AP Financial Code — Payment authorization requirements",
      "Delegation of Financial Powers Rules",
      "CFMS bill validation rules",
      "AG Audit common objection categories",
    ],
    procedureSteps: [
      "Understand common objection categories — budget, sanction, arithmetic, documentation",
      "Before bill submission, verify budget allotment and BCR balance",
      "Ensure all sanction orders and supporting documents are complete",
      "Cross-check arithmetic — quantity × rate = amount, totals, deductions",
      "Verify DDO certification and approval authority for bill amount",
      "Submit bill through CFMS with all uploads complete",
      "If objection raised, analyze reason, correct, and resubmit within time limit",
      "Maintain objection register to track patterns and prevent recurrence",
    ],
    checklist: [
      "Budget head and allotment verified before bill preparation",
      "Sanction order authority matches bill amount per DFPR",
      "Arithmetic checked independently by second person",
      "All required enclosures attached",
      "DDO certification current and valid",
      "CFMS uploads complete before submission",
      "Objection register maintained",
      "Corrective action taken for recurring objections",
    ],
    example:
      "Treasury objected to CB-230/2025-26 of DH Kurnool — 'Budget head MH-251 exhausted, reappropriation required.' Smt. Lakshmi checked BCR — allotment fully utilized by November 2025.\n\nReappropriation proposal for Rs. 5,00,000 from MH-250 to MH-251 submitted to DMHO. After reappropriation G.O., bill resubmitted and passed.",
    sampleDraft: `Treasury Objection Compliance

Bill No.: CB-230/2025-26
Objection: Budget head exhausted — reappropriation required
Action: Reappropriation G.O.Ms.No. ___ obtained for Rs. 5,00,000
Resubmitted: ___    Passed: ___`,
    srEntry:
      "Not applicable — treasury objections relate to office financial bills.",
    auditObjections: [
      "Bills passed without proper budget authorization",
      "Expenditure without delegation of financial powers compliance",
      "Recurring objections not addressed systematically",
      "Objection compliance delayed beyond time limit",
      "No objection register maintained",
    ],
    goReferences:
      "Treasury Code objection categories on [AP Finance](https://www.apfinance.ap.gov.in/). CFMS rejection reason codes on [cfms.ap.gov.in](https://cfms.ap.gov.in/).",
    scrapedSources: [
      "https://www.apfinance.ap.gov.in/",
      "https://cfms.ap.gov.in/",
      "https://goir.ap.gov.in/",
    ],
  },
  {
    title: "E-Procurement Rules Above ₹1 Lakh",
    slug: "e-procurement-rules",
    category: "finance",
    tags: ["e-procurement", "GEM", "tender", "finance"],
    summary:
      "Mandatory e-procurement rules for AP government purchases above ₹1 lakh — GeM portal, AP e-Procurement portal, tender process, and documentation for Health Department store purchases.",
    telugu_summary:
      "₹1 lakh above purchases ki mandatory e-procurement rules — GeM portal, tender process, documentation.",
    priority: 2,
    primaryRules: [
      "AP Public Procurement Policy",
      "G.O.Ms. on mandatory e-procurement above ₹1 lakh",
      "GeM (Government e-Marketplace) guidelines",
      "AP Financial Code — Store purchase procedures",
      "Delegation of Financial Powers for procurement",
    ],
    procedureSteps: [
      "Identify purchase requirement and estimate value",
      "If above ₹1 lakh, mandatory e-procurement through GeM or AP e-Proc portal",
      "Prepare indent with specifications, quantity, and estimated cost",
      "Obtain administrative approval from competent authority per DFPR",
      "Float requirement on GeM/ e-Proc portal with complete specifications",
      "Evaluate bids/responses and select L1 vendor",
      "Issue purchase order and receive goods with inspection report",
      "Process payment bill with PO, delivery receipt, and inspection certificate",
    ],
    checklist: [
      "Purchase value confirmed above ₹1 lakh threshold",
      "Administrative approval obtained per DFPR",
      "Procurement routed through GeM or AP e-Proc portal",
      "Minimum three quotations/bids obtained (if applicable)",
      "L1 vendor selected with evaluation report",
      "Purchase order issued with terms and conditions",
      "Goods received and inspected before payment",
      "Payment bill with all procurement documents attached",
    ],
    example:
      "DH Kurnool required an autoclave worth Rs. 3,50,000. Smt. Lakshmi prepared indent and obtained Superintendent approval. Floated on GeM portal — 3 vendors responded. L1: M/s. MedEquip at Rs. 3,20,000.\n\nPO issued, autoclave delivered and inspected by Biomedical Engineer. Contingent bill CB-260/2025-26 processed through CFMS with GeM order copy.",
    sampleDraft: `Indent for E-Procurement

Item: Autoclave 150L    Estimated cost: Rs. 3,50,000
Portal: GeM    Approval: Superintendent Proc.No. ___

L1 Vendor: M/s. MedEquip    Amount: Rs. 3,20,000
PO No.: ___    Delivery: ___    Inspection: Passed`,
    srEntry:
      "Not applicable — e-procurement records are store/finance section documents.",
    auditObjections: [
      "Purchase above ₹1 lakh without e-procurement",
      "Single quotation accepted without portal procurement",
      "Administrative approval authority insufficient for amount",
      "Payment without goods receipt and inspection report",
      "GeM/e-Proc order copy not attached to payment bill",
    ],
    goReferences:
      "E-procurement G.O.Ms. on [GOIR](https://goir.ap.gov.in/) and [AP Finance](https://www.apfinance.ap.gov.in/). GeM portal guidelines at gem.gov.in. AP e-Procurement portal instructions.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://cfms.ap.gov.in/",
    ],
  },
  {
    title: "Store Purchase Procedure under AP Financial Code",
    slug: "store-purchase-procedure",
    category: "finance",
    tags: ["store-purchase", "inventory", "financial-code", "finance"],
    summary:
      "Store purchase procedure under AP Financial Code for Health Department institutions — indent, quotation, purchase order, stock entry, and issue register maintenance.",
    telugu_summary:
      "AP Financial Code prakaram store purchase procedure — indent, quotation, PO, stock entry, issue register.",
    priority: 2,
    primaryRules: [
      "AP Financial Code — Store purchase chapters",
      "AP Financial Code — Stock register maintenance",
      "Delegation of Financial Powers for store purchases",
      "Health Department store management circulars",
      "AP Treasury Code — Store payment procedures",
    ],
    procedureSteps: [
      "Receive indent from department/section requiring stores",
      "Verify item availability in stock — if not, initiate purchase",
      "Obtain quotations as per DFPR limits (3 quotations for ₹25K-₹1L)",
      "Prepare comparative statement and obtain purchase committee approval",
      "Issue purchase order to selected vendor",
      "On delivery, inspect goods and prepare receipt voucher (GV/GAR)",
      "Enter in stock register and issue to indenting section",
      "Process payment bill with PO, receipt voucher, and inspection report",
    ],
    checklist: [
      "Indent received and approved by HOD",
      "Stock position checked before purchase",
      "Quotations obtained as per DFPR requirements",
      "Comparative statement prepared",
      "Purchase order issued with specifications",
      "Goods inspected on delivery",
      "Stock register updated with receipt entry",
      "Issue voucher prepared for indenting section",
    ],
    example:
      "Lab section of DH Kurnool indented 500 test tubes. Not in stock. Three quotations obtained: Rs. 8,000, Rs. 7,500, Rs. 8,200. L1: M/s. Lab Supplies at Rs. 7,500.\n\nPO issued, goods received and entered in stock register (Sl.No. 4521). Issue voucher prepared for lab section. Payment bill CB-255/2025-26 processed.",
    sampleDraft: `Store Purchase Note

Indent No.: 145/2025-26    Item: Test tubes — 500 Nos.
Quotations: 3 obtained    L1: Rs. 7,500

PO No.: ___    Receipt: GV-___    Stock entry: Sl.No. 4521
Issue voucher: IV-___ to Lab section`,
    srEntry:
      "Not applicable — store purchase records are inventory/finance documents.",
    auditObjections: [
      "Purchase without required number of quotations",
      "Goods received without inspection report",
      "Stock register not updated after receipt",
      "Issue without proper issue voucher",
      "Payment without purchase order and receipt voucher",
    ],
    goReferences:
      "Store purchase chapters in AP Financial Code on [AP Finance](https://www.apfinance.ap.gov.in/). Health Department store circulars on [health.ap.gov.in](https://health.ap.gov.in/).",
    scrapedSources: [
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
      "https://goir.ap.gov.in/",
    ],
  },
  {
    title: "Delegation of Financial Powers Explained",
    slug: "delegation-financial-powers",
    category: "finance",
    tags: ["DFPR", "financial-powers", "sanction", "finance"],
    summary:
      "Explanation of Delegation of Financial Powers Rules (DFPR) for AP government — who can sanction what amount, administrative vs financial approval, and application in Health Department purchases and bills.",
    telugu_summary:
      "Delegation of Financial Powers Rules (DFPR) — ye amount ki ye authority sanction cheyagalaru, Health Department lo application.",
    priority: 2,
    primaryRules: [
      "AP Delegation of Financial Powers Rules (DFPR)",
      "AP Financial Code — Sanction authority",
      "G.O.Ms. on revised delegation of financial powers",
      "Health Department specific financial delegation orders",
      "Fundamental Rules on expenditure authorization",
    ],
    procedureSteps: [
      "Identify the transaction type — purchase, contingency, travel, medical reimbursement",
      "Determine estimated value of the transaction",
      "Refer to DFPR schedule for sanction authority at each amount slab",
      "Obtain administrative approval from competent authority per DFPR",
      "If amount exceeds DDO/Superintendent powers, route to DMHO/Commissioner",
      "Record sanction authority designation and order number on bill/file",
      "Verify sanction authority before CFMS bill submission",
      "Maintain DFPR reference chart in accounts section for quick verification",
    ],
    checklist: [
      "Transaction type and amount identified",
      "DFPR schedule consulted for correct authority",
      "Sanction obtained from authority competent for the amount",
      "Administrative approval order on file before expenditure",
      "Higher authority approval obtained when required",
      "Sanction authority recorded on bill/proposal",
      "CFMS bill reflects correct approving authority",
      "DFPR chart displayed in accounts section",
    ],
    example:
      "DH Kurnool needed emergency drug purchase of Rs. 1,80,000. DFPR limits: Superintendent can sanction up to Rs. 1,00,000; DMHO up to Rs. 5,00,000.\n\nSuperintendent administratively approved Rs. 1,00,000 portion; DMHO sanction obtained for remaining Rs. 80,000 vide Proc.No. 45/DMHO/2025. Both sanctions attached to payment bill.",
    sampleDraft: `Financial Sanction Note

Purchase: Emergency drugs    Amount: Rs. 1,80,000
DFPR: Exceeds Superintendent limit (Rs. 1,00,000)

Sanction: Superintendent Rs. 1,00,000 (Proc.No. ___)
          DMHO Rs. 80,000 (Proc.No. 45/DMHO/2025)`,
    srEntry:
      "Not applicable — DFPR sanctions are office-level financial authorizations.",
    auditObjections: [
      "Expenditure sanctioned by authority not competent under DFPR",
      "No administrative approval before purchase/payment",
      "Split bills to stay within lower authority limits",
      "DFPR limits not updated after revision G.O.",
      "Sanction order missing from bill file",
    ],
    goReferences:
      "Latest DFPR G.O.Ms. on [GOIR](https://goir.ap.gov.in/) and [AP Finance](https://www.apfinance.ap.gov.in/). Health Department financial delegation orders from Commissioner of Health.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },

  // ─── Category 6: conduct (5) ────────────────────────────────────────────────
  {
    title: "AP Civil Services Conduct Rules Explained",
    slug: "ap-civil-services-conduct-rules",
    category: "conduct",
    tags: ["conduct-rules", "discipline", "CCA", "ethics"],
    summary:
      "Overview of AP Civil Services (Conduct) Rules for government employees — key dos and don'ts, outside employment restrictions, property returns, and implications for Health Department staff.",
    telugu_summary:
      "AP Civil Services (Conduct) Rules overview — dos and don'ts, outside employment restrictions, property returns.",
    priority: 2,
    primaryRules: [
      "AP Civil Services (Conduct) Rules, 1964",
      "AP Civil Services (Classification, Control and Appeal) Rules",
      "Prevention of Corruption Act applicability",
      "G.O.Ms. on conduct and ethics for government servants",
      "Health Department code of conduct circulars",
    ],
    procedureSteps: [
      "Ensure all employees are aware of Conduct Rules at joining orientation",
      "Monitor compliance — outside employment, gifts, property transactions",
      "Process annual property returns (immovable and movable) by due date",
      "Address complaints/representations about conduct violations promptly",
      "If violation suspected, consult CCA Rules for disciplinary action initiation",
      "Maintain conduct-related records in personal file separately",
      "Issue reminders for property return submission before deadline",
      "Report serious conduct violations to vigilance/competent authority",
    ],
    checklist: [
      "Conduct Rules booklet available in establishment section",
      "New employees briefed on conduct rules at joining",
      "Annual property returns collected by January 31 each year",
      "Outside employment requests processed per Rule 5",
      "Gift declarations monitored for prohibited items",
      "Conduct complaints documented and routed properly",
      "Personal files contain property return copies",
      "Vigilance cases reported to competent authority",
    ],
    example:
      "Sri Rama Rao, Lab Technician, applied for permission to run a medical lab outside duty hours. Smt. Lakshmi checked Conduct Rule 5 — outside employment requires prior permission. Application forwarded to Superintendent with employee's declaration.\n\nSuperintendent denied permission citing conflict of interest with government lab duties. Order communicated and filed in personal file.",
    sampleDraft: `Office Memorandum

Sub: Conduct Rules – Outside Employment – Application of Sri ___ – Orders.

Application of Sri ___ for permission to run private lab is considered under Rule 5 of Conduct Rules.

Denied: Conflict of interest with official duties at DH Kurnool.

Sd/- Superintendent    Date: ___`,
    srEntry:
      "Permission for outside employment denied vide Proc.No. ___ dated ___ under Conduct Rule 5.",
    auditObjections: [
      "Property returns not collected annually",
      "Outside employment without permission",
      "Conduct violation not acted upon",
      "Annual property return not filed in personal file",
      "Gift exceeding prescribed value accepted without declaration",
    ],
    goReferences:
      "AP Civil Services Conduct Rules on [GOIR](https://goir.ap.gov.in/). Property return G.O.Ms. on [AP Finance](https://www.apfinance.ap.gov.in/). Vigilance commission guidelines.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Charge Memo Preparation Guide",
    slug: "charge-memo-preparation",
    category: "conduct",
    tags: ["charge-memo", "disciplinary", "CCA", "misconduct"],
    summary:
      "How to prepare charge memos under AP CCA Rules for disciplinary proceedings against government employees — drafting charges, statement of allegations, and service of charge memo.",
    telugu_summary:
      "AP CCA Rules prakaram charge memo preparation — charges drafting, allegations statement, charge memo service.",
    priority: 1,
    primaryRules: [
      "AP Civil Services (Classification, Control and Appeal) Rules — Rule 7",
      "AP Civil Services (Conduct) Rules",
      "CCA Rules — Minor and major penalty provisions",
      "G.O.Ms. on disciplinary proceedings",
      "Natural justice principles in charge memo drafting",
    ],
    procedureSteps: [
      "Identify misconduct based on facts, reports, or complaint inquiry",
      "Conduct preliminary inquiry to establish prima facie case",
      "Draft article of charge specifying rule violated and factual allegations",
      "Prepare statement of allegations with date, time, place, and witnesses",
      "List documents relied upon and witnesses to be examined",
      "Obtain approval of disciplinary authority for issue of charge memo",
      "Serve charge memo on employee with copies of documents and witness list",
      "Allow 15 days (or prescribed period) for written submission from employee",
    ],
    checklist: [
      "Preliminary inquiry report on file establishing prima facie case",
      "Article of charge cites specific Conduct/CCA rule violated",
      "Statement of allegations factual, specific, and dated",
      "Documents and witness list enclosed with charge memo",
      "Disciplinary authority approval obtained before issue",
      "Charge memo served personally or by registered post",
      "Acknowledgment of service obtained",
      "15-day submission period noted in charge memo",
    ],
    example:
      "Sri Kiran, Attender at DH Kurnool, was found absent from duty for 15 days without leave in January 2026. Preliminary inquiry by Superintendent confirmed unauthorized absence.\n\nCharge memo drafted: Article 1 — violation of Conduct Rule 3 (devotion to duty). Statement of allegations listed 15 absent days with attendance register extracts. Served on 05-02-2026. Sri Kiran given 15 days to submit written reply by 20-02-2026.",
    sampleDraft: `CHARGE MEMO

Disciplinary Authority: Superintendent, DH Kurnool
Employee: Sri Kiran, Attender

Article of Charge: Misconduct — Unauthorized absence from duty for 15 days (01-01-2026 to 15-01-2026) in violation of Rule 3 of Conduct Rules.

Statement of Allegations: [Detailed facts with dates]

Documents: Attendance register extracts (Annexure A)
Witnesses: Smt. Lakshmi (Supervisor), Sri Rama Rao (Colleague)

Submit written reply within 15 days.`,
    srEntry:
      "Charge memo served on ___ vide Proc.No. ___ dated ___ — unauthorized absence/inquiry.",
    auditObjections: [
      "Charge memo issued without preliminary inquiry",
      "Vague or non-specific allegations in charge memo",
      "Charge memo not served properly — no acknowledgment",
      "Wrong rule cited in article of charge",
      "Documents relied upon not supplied with charge memo",
    ],
    goReferences:
      "CCA Rules Rule 7 on [GOIR](https://goir.ap.gov.in/). Disciplinary proceedings G.O.Ms. Model charge memo formats in CCA Rules appendix.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Suspension Procedure under CCA Rules",
    slug: "suspension-procedure-cca",
    category: "conduct",
    tags: ["suspension", "CCA", "disciplinary", "substance-pay"],
    summary:
      "Procedure for suspending AP government employees under CCA Rules — grounds, competent authority, suspension order format, subsistence allowance, and review timelines.",
    telugu_summary:
      "CCA Rules prakaram employee suspension procedure — grounds, competent authority, subsistence allowance, review timelines.",
    priority: 2,
    primaryRules: [
      "AP CCA Rules — Rule 10 (Suspension)",
      "Fundamental Rules on subsistence allowance during suspension",
      "CCA Rules — Review of suspension after 90 days",
      "Conduct Rules — Suspension pending inquiry",
      "G.O.Ms. on suspension and subsistence pay rates",
    ],
    procedureSteps: [
      "Determine grounds — criminal charge, preliminary inquiry, or disciplinary proceedings",
      "Verify suspending authority is competent under CCA Rules for the employee's category",
      "Draft suspension order citing grounds and effective date",
      "Issue suspension order and communicate to employee, DDO, and establishment",
      "DDO to pay subsistence allowance (50% of pay + DA) from suspension date",
      "Maintain suspension register with review dates",
      "Review suspension after 90 days — continue, revoke, or convert to leave",
      "On conclusion of proceedings, revoke suspension and regulate pay/leave",
    ],
    checklist: [
      "Valid grounds for suspension documented",
      "Competent suspending authority verified",
      "Suspension order issued with effective date and grounds",
      "Employee, DDO, and establishment informed",
      "Subsistence allowance at 50% pay + DA ordered in pay bill",
      "Suspension register entry made",
      "90-day review conducted and recorded",
      "Revocation order issued on conclusion of proceedings",
    ],
    example:
      "Sri Kiran, Attender, faced criminal charges for assault. Superintendent suspended him vide Proc.No. 10/Disc/2026 dated 01-02-2026 pending inquiry.\n\nDDO adjusted pay to subsistence allowance (50% of Rs. 18,000 + DA). 90-day review on 01-05-2026 — suspension continued as criminal case pending. Suspension register maintained at establishment section.",
    sampleDraft: `SUSPENSION ORDER

Proc.No. 10/Disc/2026                          Date: 01-02-2026

Sri Kiran, Attender, DH Kurnool, is placed under suspension with effect from 01-02-2026 FN pending disciplinary inquiry into criminal charges (FIR No. ___ dated ___).

Subsistence allowance at 50% of pay + DA during suspension.
Review after 90 days.

Sd/- Superintendent`,
    srEntry:
      "Suspended from ___ vide Proc.No. ___ dated ___. Revoked vide Proc.No. ___ dated ___.",
    auditObjections: [
      "Suspension without valid grounds or competent authority",
      "Full pay drawn during suspension period",
      "90-day review not conducted",
      "Suspension not revoked after exoneration",
      "Subsistence allowance calculated incorrectly",
    ],
    goReferences:
      "CCA Rules Rule 10 on [GOIR](https://goir.ap.gov.in/). Subsistence allowance rates in FR and Finance G.O.Ms. on [AP Finance](https://www.apfinance.ap.gov.in/).",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Minor Penalty vs Major Penalty Proceedings",
    slug: "minor-major-penalty",
    category: "conduct",
    tags: ["penalty", "minor", "major", "CCA", "disciplinary"],
    summary:
      "Distinction between minor and major penalty proceedings under AP CCA Rules — applicable penalties, inquiry requirements, and competent authorities for Health Department employees.",
    telugu_summary:
      "AP CCA Rules lo minor vs major penalty proceedings — applicable penalties, inquiry requirements, competent authorities.",
    priority: 2,
    primaryRules: [
      "AP CCA Rules — Rule 11 (Minor penalties)",
      "AP CCA Rules — Rule 12 (Major penalties)",
      "AP CCA Rules — Rule 14 (Procedure for major penalty)",
      "AP CCA Rules — Rule 15 (Procedure for minor penalty)",
      "Disciplinary authority matrix for Health Department categories",
    ],
    procedureSteps: [
      "Classify misconduct severity to determine minor vs major penalty track",
      "Minor penalties: censure, withholding increment, recovery — simpler procedure under Rule 15",
      "Major penalties: reduction, compulsory retirement, dismissal — full inquiry under Rule 14",
      "For minor: serve charge memo, accept written reply, pass orders",
      "For major: appoint inquiring authority and presenting officer, conduct DE",
      "After inquiry report, issue second show-cause notice to employee",
      "Disciplinary authority passes final orders based on inquiry findings",
      "Implement penalty — pay adjustment, SR entry, and appeal period communication",
    ],
    checklist: [
      "Misconduct correctly classified as minor or major",
      "Appropriate procedure (Rule 14 or 15) followed",
      "Charge memo served with required documents",
      "Written reply of employee considered",
      "For major penalty: DE conducted with inquiry report",
      "Second show-cause notice issued before final orders (major)",
      "Penalty orders issued by competent disciplinary authority",
      "SR entry and pay adjustment effected",
    ],
    example:
      "Sri Rama Rao arrived late to duty repeatedly (5 instances in a month). Classified as minor misconduct. Charge memo served under Rule 15. Sri Rama Rao submitted written apology.\n\nSuperintendent imposed minor penalty — censure vide Proc.No. 25/Disc/2026. No DE required. SR entry made. For comparison, Sri Kiran's unauthorized absence (15 days) was classified as major — full DE initiated under Rule 14.",
    sampleDraft: `Minor Penalty Order

Proc.No. 25/Disc/2026                          Date: ___

Sri Rama Rao, Lab Technician — Charge: habitual late attendance.
Penalty: Censure (minor penalty under Rule 11).

Written reply considered. Penalty imposed.

Appeal: Within 45 days to DMHO under Rule 27.

Sd/- Superintendent`,
    srEntry:
      "Minor penalty — censure — imposed vide Proc.No. ___ dated ___.",
    auditObjections: [
      "Major penalty imposed without departmental enquiry",
      "Minor penalty procedure used for major misconduct",
      "DE not conducted when major penalty contemplated",
      "Penalty by authority not competent under CCA Rules",
      "SR not updated after penalty order",
    ],
    goReferences:
      "CCA Rules Rules 11-15 on [GOIR](https://goir.ap.gov.in/). Disciplinary authority G.O.Ms. for Medical and Health categories.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },
  {
    title: "Departmental Enquiry Process",
    slug: "departmental-enquiry",
    category: "conduct",
    tags: ["departmental-enquiry", "DE", "inquiry", "disciplinary"],
    summary:
      "Complete departmental enquiry (DE) process under AP CCA Rules for major penalty cases — appointing inquiry authority, conducting enquiry, report, and final orders.",
    telugu_summary:
      "Major penalty cases ki departmental enquiry (DE) complete process — inquiry authority appointment, enquiry conduct, report, final orders.",
    priority: 2,
    primaryRules: [
      "AP CCA Rules — Rule 14 (Major penalty procedure)",
      "AP CCA Rules — Rule 16 (Inquiring authority)",
      "Natural justice and principles of fair enquiry",
      "G.O.Ms. on departmental enquiry procedures",
      "CCA Rules — Rule 27 (Appeal against penalty)",
    ],
    procedureSteps: [
      "After charge memo and written reply, decide if DE required (major penalty cases)",
      "Appoint inquiring authority (senior officer) and presenting officer",
      "Issue DE notification to employee with inquiry schedule",
      "Presenting officer produces documents and examines witnesses",
      "Employee cross-examines witnesses and presents defence evidence",
      "Inquiring authority records daily proceedings and prepares inquiry report",
      "Inquiry report submitted to disciplinary authority with findings",
      "Disciplinary authority issues second show-cause notice and passes final orders",
    ],
    checklist: [
      "DE ordered only for major penalty cases or when required",
      "Inquiring authority senior to charged employee",
      "Presenting officer appointed and briefed",
      "Employee given reasonable opportunity to defend",
      "Daily proceedings recorded and signed",
      "All witnesses examined with cross-examination opportunity",
      "Inquiry report with findings submitted to disciplinary authority",
      "Final orders passed after second show-cause notice",
    ],
    example:
      "DE ordered against Sri Kiran for unauthorized absence (major penalty). DMHO appointed Dr. Reddy, Medical Officer, as inquiring authority. Presenting officer: Smt. Lakshmi, establishment.\n\nDE conducted on 05-03-2026, 12-03-2026, 19-03-2026. Three witnesses examined. Sri Kiran presented defence. Inquiry report submitted 01-04-2026 finding charges proved. Second show-cause issued. Final orders pending.",
    sampleDraft: `DE Notification

Proc.No. ___/Disc/2026                          Date: ___

Departmental Enquiry ordered against Sri Kiran, Attender.
Inquiring Authority: Dr. Reddy, Medical Officer
Presenting Officer: Smt. Lakshmi, Establishment

First hearing: 05-03-2026 at 10:00 AM, Office of Superintendent.

Charged employee may inspect documents and present defence.`,
    srEntry:
      "DE conducted vide Proc.No. ___ dated ___. Penalty: ___ vide Proc.No. ___ dated ___.",
    auditObjections: [
      "DE not conducted before imposing major penalty",
      "Inquiring authority not senior to charged employee",
      "Employee not given opportunity to cross-examine witnesses",
      "Daily proceedings not maintained",
      "Final orders passed without inquiry report",
    ],
    goReferences:
      "CCA Rules Rule 14 and 16 on [GOIR](https://goir.ap.gov.in/). Model DE proceedings format in disciplinary G.O.Ms.",
    scrapedSources: [
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://health.ap.gov.in/",
    ],
  },

  // ─── Category 7: health (5) ─────────────────────────────────────────────────
  {
    title: "Outsourcing Staff Management Guidelines",
    slug: "outsourcing-staff-management",
    category: "health",
    tags: ["outsourcing", "contract-staff", "health", "HR"],
    summary:
      "Guidelines for managing outsourced and contract staff in AP Health Department institutions — agency agreements, attendance, billing, compliance, and coordination with establishment section.",
    telugu_summary:
      "Health Department lo outsourced/contract staff management guidelines — agency agreements, attendance, billing, compliance.",
    priority: 2,
    primaryRules: [
      "G.O.Ms. on outsourcing of non-clinical services in Health Department",
      "AP Contract Labour (Regulation and Abolition) Act compliance",
      "Minimum Wages Act applicability to outsourced staff",
      "Health Department outsourcing policy circulars",
      "EHS (Employees Health Scheme) exclusions for contract staff",
    ],
    procedureSteps: [
      "Verify outsourcing agency agreement/MoU is valid and approved by competent authority",
      "Maintain outsourced staff register with agency, role, and deployment date",
      "Monitor daily attendance through agency supervisor and hospital records",
      "Verify agency invoices against deployed strength and attendance",
      "Ensure agency compliance — EPF, ESIC, minimum wages, ID cards",
      "Process agency bills through contingent bill with attendance annexure",
      "Conduct periodic review of agency performance and staff adequacy",
      "Report non-compliance or staffing gaps to DMHO/Commissioner",
    ],
    checklist: [
      "Valid agency agreement/MoU on file",
      "Outsourced staff register maintained",
      "Daily attendance monitored and recorded",
      "Agency invoices verified against attendance",
      "EPF/ESIC compliance certificates collected from agency",
      "Minimum wage payment verified",
      "Agency bills processed with attendance annexure",
      "Periodic performance review conducted",
    ],
    example:
      "DH Kurnool outsourced housekeeping to M/s. CleanCare Agency (25 staff) vide DMHO agreement dated 01-04-2025. Smt. Lakshmi maintained outsourced register and verified monthly attendance sheets.\n\nJanuary 2026 invoice: Rs. 3,75,000 for 25 staff × Rs. 15,000. Attendance verified — 23 staff present daily average. Bill processed as CB-270/2025-26 with attendance annexure.",
    sampleDraft: `Outsourcing Staff Register Entry

Agency: M/s. CleanCare    Role: Housekeeping
Staff count: 25    Agreement: DMHO Proc.No. ___ dated 01-04-2025

Monthly verification: January 2026 — Average attendance 23/25
Invoice: Rs. 3,75,000    Bill: CB-270/2025-26`,
    srEntry:
      "Not applicable — outsourced staff are not government employees with SR.",
    auditObjections: [
      "Outsourcing without valid agency agreement",
      "Payment for staff not actually deployed",
      "Agency non-compliance with EPF/ESIC not monitored",
      "Bills processed without attendance verification",
      "Outsourced staff performing core government functions without approval",
    ],
    goReferences:
      "Health Department outsourcing G.O.Ms. on [GOIR](https://goir.ap.gov.in/) and [health.ap.gov.in](https://health.ap.gov.in/). Contract labour compliance on AP Labour Department portal.",
    scrapedSources: [
      "https://health.ap.gov.in/",
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
    ],
  },
  {
    title: "Hospital Condemnation Procedure",
    slug: "hospital-condemnation",
    category: "health",
    tags: ["condemnation", "obsolete", "equipment", "health"],
    summary:
      "Procedure for condemning obsolete, unserviceable, or damaged hospital equipment and furniture in AP Health Department — inspection committee, condemnation proceedings, and stock register adjustments.",
    telugu_summary:
      "Obsolete/damaged hospital equipment condemnation procedure — inspection committee, proceedings, stock register adjustments.",
    priority: 2,
    primaryRules: [
      "AP Financial Code — Condemnation of stores",
      "Health Department condemnation circulars",
      "AP Stores Code — Write-off procedures",
      "Delegation of Financial Powers for write-off",
      "Biomedical waste rules for condemned medical equipment",
    ],
    procedureSteps: [
      "Identify unserviceable/obsolete items from stock register or section report",
      "Prepare list with item description, purchase date, original value, and reason for condemnation",
      "Constitute inspection/condemnation committee (3 members minimum)",
      "Committee inspects items and records findings — beyond repair/obsolete",
      "Prepare condemnation proceedings with committee recommendations",
      "Obtain approval from competent authority per DFPR for write-off value",
      "Remove condemned items from stock register",
      "Dispose as scrap/e-waste per environmental and biomedical waste rules",
    ],
    checklist: [
      "Unserviceable items identified and listed",
      "Condemnation committee constituted (3+ members)",
      "Physical inspection conducted and report recorded",
      "Original purchase value and date documented",
      "Competent authority approval obtained per DFPR",
      "Condemnation proceedings issued",
      "Stock register updated — items written off",
      "Disposal documented (scrap sale/e-waste certificate)",
    ],
    example:
      "DH Kurnool identified 5 obsolete patient monitors (purchased 2010, original value Rs. 5,00,000). Biomedical Engineer certified beyond repair. Condemnation committee: Superintendent, Biomedical Engineer, Store Officer.\n\nCommittee recommended condemnation vide Proc.No. 30/Store/2026. DMHO approved write-off. Stock register updated. E-waste disposed through authorized vendor with certificate.",
    sampleDraft: `Condemnation Proceedings

Proc.No. 30/Store/2026                          Date: ___

Committee inspected 5 patient monitors (Sl.No. 101-105, purchased 2010).
Finding: Beyond repair, obsolete technology.
Original value: Rs. 5,00,000

Recommended for condemnation and write-off.
Approved by DMHO vide Proc.No. ___ dated ___.

Sd/- Superintendent`,
    srEntry:
      "Not applicable — condemnation relates to store/inventory records.",
    auditObjections: [
      "Condemnation without inspection committee report",
      "Write-off without competent authority approval",
      "Stock register not updated after condemnation",
      "Serviceable items condemned without justification",
      "Disposal not documented (missing scrap/e-waste certificate)",
    ],
    goReferences:
      "Store condemnation procedures in AP Financial Code on [AP Finance](https://www.apfinance.ap.gov.in/). Health Department equipment condemnation circulars on [health.ap.gov.in](https://health.ap.gov.in/).",
    scrapedSources: [
      "https://health.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
      "https://goir.ap.gov.in/",
    ],
  },
  {
    title: "Biomedical Waste Compliance Checklist",
    slug: "biomedical-waste-compliance",
    category: "health",
    tags: ["biomedical-waste", "BMW", "compliance", "health"],
    summary:
      "Biomedical waste management compliance checklist for AP Health Department hospitals under BMW Rules 2016 — segregation, storage, treatment, documentation, and CBMWTF coordination.",
    telugu_summary:
      "BMW Rules 2016 prakaram hospitals lo biomedical waste management compliance checklist — segregation, storage, treatment, documentation.",
    priority: 2,
    primaryRules: [
      "Biomedical Waste Management Rules, 2016",
      "AP Pollution Control Board guidelines for BMW",
      "Health Department BMW compliance circulars",
      "CBMWTF (Common BMW Treatment Facility) agreement requirements",
      "Environment Protection Act compliance for health facilities",
    ],
    procedureSteps: [
      "Ensure color-coded bins (yellow, red, white, blue) available in all wards/OPD/lab",
      "Train all staff on segregation at source — infectious, sharps, pharmaceutical, general",
      "Maintain BMW generation register with daily quantity by category",
      "Store segregated waste in designated area for maximum 48 hours",
      "Hand over to authorized CBMWTF agency with manifest/form documentation",
      "Obtain disposal certificates from CBMWTF agency monthly",
      "Display BMW management policy and flowchart prominently",
      "Conduct quarterly internal audit and maintain APPCB compliance records",
    ],
    checklist: [
      "Color-coded bins placed in all patient care areas",
      "Staff trained on BMW segregation (training records maintained)",
      "Daily BMW generation register updated",
      "Storage area designated and labeled",
      "CBMWTF agency agreement valid and current",
      "Daily handover manifests maintained",
      "Monthly disposal certificates from CBMWTF obtained",
      "BMW policy displayed; quarterly audit conducted",
    ],
    example:
      "District Hospital Kurnool generates approximately 80 kg BMW daily. Smt. Lakshmi (as part of hospital admin team) verified color-coded bins in all 12 wards. CBMWTF agency M/s. GreenWaste collects daily with manifest.\n\nJanuary 2026: 2,400 kg disposed, certificate No. GW-2026-01 obtained. Quarterly APPCB audit scheduled for March 2026. One deficiency noted — sharps container missing in OPD Room 3 — rectified immediately.",
    sampleDraft: `BMW Daily Register — DH Kurnool

Date: ___    Yellow: ___ kg    Red: ___ kg    White: ___ kg    Blue: ___ kg
Total: ___ kg    Handed to: M/s. GreenWaste    Manifest No.: ___
Certificate: GW-2026-01 (monthly)`,
    srEntry:
      "Not applicable — BMW compliance is institutional/environmental record.",
    auditObjections: [
      "BMW mixed with general waste — no segregation",
      "BMW generation register not maintained",
      "Disposal through unauthorized agency without CBMWTF tie-up",
      "Missing disposal certificates from CBMWTF",
      "Staff not trained on BMW management",
    ],
    goReferences:
      "BMW Rules 2016 on MoEFCC and APPCB portals. Health Department BMW circulars on [health.ap.gov.in](https://health.ap.gov.in/). CBMWTF agency list from APPCB.",
    scrapedSources: [
      "https://health.ap.gov.in/",
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
    ],
  },
  {
    title: "APMSIDC Procurement Workflow",
    slug: "apmsidc-procurement",
    category: "health",
    tags: ["APMSIDC", "procurement", "drugs", "health"],
    summary:
      "APMSIDC (AP Medical Services and Infrastructure Development Corporation) procurement workflow for drugs, equipment, and infrastructure — indent process, rate contracts, and supply tracking for hospitals.",
    telugu_summary:
      "APMSIDC procurement workflow — drugs, equipment, infrastructure indent process, rate contracts, supply tracking.",
    priority: 2,
    primaryRules: [
      "APMSIDC Act and procurement guidelines",
      "Health Department drug procurement policy G.Os",
      "APMSIDC rate contract procedures",
      "Essential Drugs List (EDL) compliance",
      "Store purchase and inventory management for APMSIDC supplies",
    ],
    procedureSteps: [
      "Hospital prepares drug/equipment indent based on consumption pattern and EDL",
      "Submit indent to DMHO/DHO for consolidation and approval",
      "DMHO forwards consolidated indent to APMSIDC through online portal",
      "APMSIDC processes indent against rate contracts and issues supply order",
      "Track supply delivery through APMSIDC portal and acknowledge receipt",
      "Inspect received goods — quality, quantity, expiry dates for drugs",
      "Enter in stock register and issue to pharmacy/departments",
      "Process payment/acknowledgment and report supply gaps to APMSIDC",
    ],
    checklist: [
      "Indent prepared based on EDL and consumption data",
      "DMHO approval obtained on indent",
      "Indent submitted through APMSIDC online portal",
      "Supply order tracked on APMSIDC portal",
      "Goods inspected on receipt — quality and expiry verified",
      "Stock register updated with batch numbers and expiry dates",
      "Issue to pharmacy/departments documented",
      "Supply gaps/shortages reported to APMSIDC",
    ],
    example:
      "DH Kurnool pharmacy submitted quarterly drug indent for Rs. 12,00,000 to DMHO Kurnool. Consolidated with other hospitals and forwarded to APMSIDC on 01-01-2026.\n\nAPMSIDC supply order SO-2026-452 issued. 85% drugs received by 15-02-2026. Smt. Lakshmi verified invoices, entered in stock register with batch/expiry. Remaining 15% shortage reported through APMSIDC grievance portal.",
    sampleDraft: `APMSIDC Supply Receipt Note

Indent No.: IND-KNL-2026-01    Supply Order: SO-2026-452
Items received: 42/50    Value: Rs. 10,20,000

Inspection: Pharmacy Superintendent — Quality OK, expiry dates verified.
Stock entry: Completed. Shortage: 8 items reported to APMSIDC.`,
    srEntry:
      "Not applicable — APMSIDC procurement is institutional store/pharmacy record.",
    auditObjections: [
      "Drugs procured outside APMSIDC without exemption",
      "Expired drugs received but not returned/rejected",
      "Stock register not updated with APMSIDC supply",
      "Indent not based on EDL or consumption pattern",
      "Payment acknowledged without physical receipt verification",
    ],
    goReferences:
      "APMSIDC procurement guidelines on APMSIDC portal. Health Department drug policy G.O.Ms. on [GOIR](https://goir.ap.gov.in/) and [health.ap.gov.in](https://health.ap.gov.in/).",
    scrapedSources: [
      "https://health.ap.gov.in/",
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
    ],
  },
  {
    title: "District Hospital Administrative Officer Responsibilities",
    slug: "dha-responsibilities",
    category: "health",
    tags: ["DHA", "administration", "hospital", "health"],
    summary:
      "Roles and responsibilities of District Hospital Administrative Officer (Superintendent/DHA) in AP Health Department — establishment, finance, store, discipline, and coordination duties.",
    telugu_summary:
      "District Hospital Administrative Officer (Superintendent/DHA) roles and responsibilities — establishment, finance, store, discipline duties.",
    priority: 2,
    primaryRules: [
      "AP Medical and Health Department Service Rules — Superintendent duties",
      "Hospital Administration Manual",
      "Delegation of Financial Powers for hospital DDO",
      "AP Civil Services Conduct Rules — supervisory responsibilities",
      "Health Department organizational structure G.Os",
    ],
    procedureSteps: [
      "Overall administration of hospital — staff, patients, infrastructure",
      "Supervise establishment section — appointments, promotions, leave, SR maintenance",
      "Function as DDO — certify pay bills, sanction expenditure within DFPR limits",
      "Monitor store and pharmacy — indent, purchase, stock, APMSIDC supplies",
      "Ensure BMW compliance, fire safety, and infection control protocols",
      "Conduct morning rounds, staff meetings, and address grievances",
      "Coordinate with DMHO, APMSIDC, treasury, and audit inspections",
      "Submit monthly reports — bed occupancy, deliveries, surgeries, expenditure",
    ],
    checklist: [
      "Daily hospital administration and patient care oversight",
      "Establishment files and SR maintenance supervised",
      "Pay bills certified as DDO before CFMS submission",
      "Expenditure sanctioned within DFPR limits",
      "Store indent and APMSIDC supply monitored",
      "BMW and infection control compliance verified",
      "Monthly DMHO reports submitted on time",
      "Audit objections addressed promptly",
    ],
    example:
      "Superintendent of DH Kurnool (DHA role) oversees 250 staff, 200 beds. Daily: morning ward rounds at 9 AM, establishment section review with Smt. Lakshmi at 11 AM, accounts section with store officer at 2 PM.\n\nMonthly: submits bed occupancy (85%), deliveries (120), major surgeries (45), and expenditure report (Rs. 1.2 Cr) to DMHO Kurnool. Certifies 250 pay bills monthly as DDO. Addresses AG audit objections through establishment and accounts teams.",
    sampleDraft: `Monthly Report — DH Kurnool

Period: January 2026
Bed occupancy: 85%    Deliveries: 120    Surgeries: 45
Expenditure: Rs. 1.2 Cr (within BCR allotment)
Staff strength: 250 (245 present, 5 on leave)
Pending: 3 audit objections — compliance by 15-02-2026

Submitted to: DMHO Kurnool    Date: 05-02-2026`,
    srEntry:
      "Not applicable — DHA responsibilities are administrative, not individual SR entries.",
    auditObjections: [
      "Pay bills certified without verification (DDO responsibility)",
      "Expenditure sanctioned exceeding DFPR limits",
      "Monthly reports not submitted to DMHO",
      "Establishment records not supervised — SR/leave errors",
      "Store discrepancies not investigated",
    ],
    goReferences:
      "Hospital administration manual on [health.ap.gov.in](https://health.ap.gov.in/). Superintendent duties in Medical and Health Service Rules on [GOIR](https://goir.ap.gov.in/). DDO functions on [AP Finance](https://www.apfinance.ap.gov.in/).",
    scrapedSources: [
      "https://health.ap.gov.in/",
      "https://goir.ap.gov.in/",
      "https://www.apfinance.ap.gov.in/",
    ],
  },
];
