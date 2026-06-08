/**
 * Editorial backfill — ensures minimum daily draft queue when gov detection is slow.
 * Rotates through curated AP admin briefing topics (original OfficeMitra content).
 */
import { makeFingerprint } from "./fingerprint";
import {
  fingerprintExists,
  insertIntelDetectedUpdate,
  logIntelActivity,
  saveIntelDraft,
} from "./store";

const EDITORIAL_SOURCE_ID = "00000000-0000-4000-8000-000000000001";

/** Week-1 + high-value topics for daily staff briefings */
const BRIEFING_TOPICS = [
  {
    title: "Staff briefing: Probation declaration checklist",
    category: "Establishment",
    url: "https://goir.ap.gov.in/",
    summary:
      "Key steps for declaring probation — verify ACRs, proceedings format, and SR entry before issuing orders.",
    what_changed: "Reminder briefing on probation declaration workflow for establishment sections.",
    who: "Establishment staff, Superintendents, and Head Office assistants in Health Department institutions.",
    action: "Review pending probation cases, verify two-year completion, and prepare proceedings this week.",
  },
  {
    title: "Staff briefing: Earned Leave — accrual and sanction rules",
    category: "Leave",
    url: "https://goir.ap.gov.in/",
    summary: "How EL accrues, how to maintain leave accounts, and common mistakes that cause audit objections.",
    what_changed: "Operational reminder on Earned Leave rules under AP Leave Rules.",
    who: "All ministerial staff processing leave applications and maintaining leave accounts.",
    action: "Reconcile leave accounts with service registers; clear pending EL applications within 7 days.",
  },
  {
    title: "Staff briefing: APGLI loan — documents and pay bill recovery",
    category: "APGLI",
    url: "https://www.apgli.ap.gov.in/",
    summary: "Checklist for APGLI loan applications, sanction routing, and recovery through monthly pay bills.",
    what_changed: "APGLI loan processing reminder for DDO and establishment sections.",
    who: "Finance staff, DDO assistants, and employees applying for APGLI policy loans.",
    action: "Verify APGLI portal status, collect Form 8 and salary slips, route through competent authority.",
  },
  {
    title: "Staff briefing: GPF advance — eligibility and recovery",
    category: "GPF",
    url: "https://www.apfinance.ap.gov.in/",
    summary: "Temporary vs non-temporary GPF advance rules, required documents, and treasury bill preparation.",
    what_changed: "GPF advance procedure reminder for finance and establishment staff.",
    who: "DDO section, bill clerks, and employees seeking GPF advance.",
    action: "Verify GPF balance on AG portal, prepare application with office certificate, route for sanction.",
  },
  {
    title: "Staff briefing: Service Register maintenance — audit-safe entries",
    category: "Establishment",
    url: "https://goir.ap.gov.in/",
    summary: "How to record promotions, transfers, and increments in SR without audit objections.",
    what_changed: "SR maintenance best-practices briefing for establishment sections.",
    who: "Establishment assistants, superintendents, and record keepers.",
    action: "Audit SR entries against latest orders; prepare correction notes for any missing entries.",
  },
  {
    title: "Staff briefing: CFMS bill submission — common treasury objections",
    category: "Finance",
    url: "https://cfms.ap.gov.in/",
    summary: "Avoid CFMS and treasury objections by verifying bill format, budget head, and supporting documents.",
    what_changed: "CFMS bill processing reminder for DDO and bill sections.",
    who: "DDO staff, bill clerks, and contingent bill preparers.",
    action: "Pre-check bills against BCR balance; attach mandatory enclosures before CFMS upload.",
  },
  {
    title: "Staff briefing: Increment sanction — timing and pay fixation",
    category: "Establishment",
    url: "https://goir.ap.gov.in/",
    summary: "Annual increment due dates, proceedings format, and pay bill reflection after increment orders.",
    what_changed: "Increment sanction workflow reminder for establishment and finance sections.",
    who: "Establishment and DDO staff processing annual increments.",
    action: "List employees due for increment this month; prepare batch proceedings for Head of Office approval.",
  },
  {
    title: "Staff briefing: Promotion under Rule 28 — relinquishment procedure",
    category: "Establishment",
    url: "https://goir.ap.gov.in/",
    summary: "When and how employees may relinquish promotion; proceedings format and SR entry.",
    what_changed: "Rule 28 relinquishment procedure reminder for establishment sections.",
    who: "Establishment staff handling promotion panels and employee representations.",
    action: "File relinquishment applications with written consent; route through competent authority.",
  },
  {
    title: "Staff briefing: Charge memo — disciplinary initiation steps",
    category: "Conduct",
    url: "https://goir.ap.gov.in/",
    summary: "How to prepare charge memos under AP Civil Services (CCA) Rules with proper documentation.",
    what_changed: "Disciplinary procedure reminder for heads of office and establishment sections.",
    who: "Disciplinary authority staff and establishment sections.",
    action: "Ensure charge memo cites specific articles; attach inquiry documents and service history.",
  },
  {
    title: "Staff briefing: Budget Control Register (BCR) — monthly reconciliation",
    category: "Finance",
    url: "https://www.apfinance.ap.gov.in/",
    summary: "Monthly BCR maintenance, allotment vs expenditure tracking, and surrender of savings.",
    what_changed: "BCR maintenance reminder for DDO and finance staff.",
    who: "DDO, accounts staff, and budget controlling officers.",
    action: "Reconcile BCR with CFMS expenditure; report savings and re-appropriation proposals by month-end.",
  },
];

function dayIndex(): number {
  const start = new Date(Date.UTC(2026, 0, 1));
  const now = new Date();
  const days = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
  return days;
}

export async function fillEditorialBriefings(needed: number): Promise<number> {
  if (needed <= 0) return 0;

  let created = 0;
  const start = dayIndex();

  for (let i = 0; i < BRIEFING_TOPICS.length && created < needed; i++) {
    const topic = BRIEFING_TOPICS[(start + i) % BRIEFING_TOPICS.length];
    const dateKey = new Date().toISOString().slice(0, 10);
    const fp = makeFingerprint(
      EDITORIAL_SOURCE_ID,
      `editorial://${topic.title}`,
      `${dateKey}-${topic.title}`
    );

    if (await fingerprintExists(fp)) continue;

    const id = await insertIntelDetectedUpdate({
      source_id: EDITORIAL_SOURCE_ID,
      title: topic.title,
      source_url: topic.url,
      fingerprint: fp,
      published_date: dateKey,
    });

    if (!id) continue;

    await saveIntelDraft(id, {
      title: topic.title,
      summary: topic.summary,
      what_changed: topic.what_changed,
      who_is_affected: topic.who,
      action_required: topic.action,
      reference_source: `Verify applicable rules on ${topic.url}`,
      department_impact: topic.category,
      keywords: ["AP government", "briefing", topic.category.toLowerCase(), "ministerial staff"],
      body: [
        "## OfficeMitra staff briefing",
        "",
        topic.summary,
        "",
        "### What this covers",
        topic.what_changed,
        "",
        "### Who should read this",
        topic.who,
        "",
        "### Recommended action",
        topic.action,
        "",
        `*Original OfficeMitra briefing — verify official orders on [${topic.url}](${topic.url}) before acting.*`,
      ].join("\n"),
    });

    await logIntelActivity("editorial_briefing", `Editorial briefing queued: ${topic.title}`, {
      update_id: id,
    });
    created += 1;
  }

  return created;
}
