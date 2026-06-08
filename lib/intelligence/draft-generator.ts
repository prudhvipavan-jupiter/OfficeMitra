import { formatDocumentsMarkdown, relatedKnowledgeSlug } from "./document-links";
import type { IntelDetectedUpdate } from "./types";

export interface IntelDraft {
  title: string;
  summary: string;
  what_changed: string;
  who_is_affected: string;
  action_required: string;
  reference_source: string;
  department_impact: string;
  keywords: string[];
  body: string;
}

function section(title: string, body: string): string {
  return `## ${title}\n\n${body.trim()}\n`;
}

function buildDetailedFallback(item: {
  title: string;
  source_name?: string;
  source_category?: string;
  source_url: string;
}): IntelDraft {
  const sourceName = item.source_name ?? "Official Source";
  const category = item.source_category ?? "Administration";
  const slug = relatedKnowledgeSlug(item.title);

  const body = [
    section(
      "Overview",
      `OfficeMitra Intelligence detected a new publication on **${sourceName}** titled "${item.title}". This guide explains what ministerial staff should do next. We do not reproduce government text — read the official document at the source link and verify GO/circular numbers before acting.`
    ),
    section(
      "What appears to have changed",
      `A new item titled **"${item.title}"** was listed on ${sourceName}. Based on the title and source category (${category}), this likely relates to establishment, finance, or service matters affecting AP government employees.`
    ),
    section(
      "Who should review this",
      `- Establishment section staff\n- DDO / finance section\n- Head of Office\n- Ministerial staff in ${category} if broadly applicable`
    ),
    section(
      "Recommended office action",
      "1. Open the official source and download/read the full order\n2. Note GO/circular number and date\n3. Assess applicability to your institution\n4. Brief Head of Office if action required\n5. Prepare proceedings or office instructions\n6. Update Service Registers, leave accounts, or BCR\n7. File GO copy in subject file"
    ),
    section(
      "Documents to collect",
      "- Official order/circular (downloaded from portal)\n- Previous related GOs for comparison\n- Office note for Head of Office\n- Employee list if head-count action needed"
    ),
    formatDocumentsMarkdown(item.title, item.source_url),
    slug ? `\n## Related OfficeMitra guide\n\n[Full step-by-step guide → /knowledge/${slug}](/knowledge/${slug})\n` : "",
  ].join("\n");

  return {
    title: item.title.length > 100 ? item.title.slice(0, 97) + "…" : item.title,
    summary: `New publication on ${sourceName}. Follow the detailed office action guide and verify on the official portal.`,
    what_changed: `New publication "${item.title}" on ${sourceName}. Verify scope and effective date on the official portal.`,
    who_is_affected: `AP ministerial staff under ${category}, especially Health Department establishment and finance sections.`,
    action_required:
      "1. Read official document\n2. Note GO number/date\n3. Brief Head of Office\n4. Prepare proceedings\n5. Update SR and office records",
    reference_source: `Official source: ${item.source_url}`,
    department_impact: category,
    keywords: ["AP government", category.toLowerCase(), "circular", "GO", "ministerial staff"],
    body,
  };
}

const DETAILED_SYSTEM_PROMPT = `You are OfficeMitra Intelligence for AP government ministerial staff.

Write ORIGINAL detailed content from metadata only — never copy government text.

JSON keys: title, summary, what_changed, who_is_affected, action_required, reference_source, department_impact, keywords (array), body (long markdown).

Body must include: Overview, Applicable rules, Step-by-step procedure, Practical example (AP hospital), Checklist, Documents required, Official documents & links (with source URL), Common mistakes. Minimum 600 words in body.`;

export { buildDetailedFallback };

export async function generateIntelDraft(update: IntelDetectedUpdate): Promise<IntelDraft> {
  const item = {
    title: update.title,
    source_name: update.source?.name,
    source_category: update.source?.category,
    source_url: update.source_url,
    published_date: update.published_date,
  };

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return buildDetailedFallback(item);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        temperature: 0.4,
        max_tokens: 4000,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: DETAILED_SYSTEM_PROMPT },
          {
            role: "user",
            content: `Generate a DETAILED OfficeMitra update:\n${JSON.stringify(item, null, 2)}\n\nAppend to body a section "## Official documents & links" with the source URL.`,
          },
        ],
      }),
      signal: AbortSignal.timeout(60_000),
    });

    if (!res.ok) return buildDetailedFallback(item);
    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content ?? "{}";
    const draft = JSON.parse(content) as Partial<IntelDraft>;
    const base = buildDetailedFallback(item);

    let body = draft.body ?? base.body;
    if (!body.includes("Official documents")) {
      body += "\n\n" + formatDocumentsMarkdown(item.title, item.source_url);
    }

    return {
      title: draft.title ?? base.title,
      summary: draft.summary ?? base.summary,
      what_changed: draft.what_changed ?? base.what_changed,
      who_is_affected: draft.who_is_affected ?? base.who_is_affected,
      action_required: draft.action_required ?? base.action_required,
      reference_source: draft.reference_source ?? base.reference_source,
      department_impact: draft.department_impact ?? base.department_impact,
      keywords: Array.isArray(draft.keywords) ? draft.keywords : base.keywords,
      body,
    };
  } catch {
    return buildDetailedFallback(item);
  }
}
