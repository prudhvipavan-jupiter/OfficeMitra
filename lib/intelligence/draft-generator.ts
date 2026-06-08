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

function fallbackDraft(item: {
  title: string;
  source_name?: string;
  source_category?: string;
  source_url: string;
}): IntelDraft {
  const sourceName = item.source_name ?? "Official Source";
  const category = item.source_category ?? "Administration";
  return {
    title: `Update: ${item.title.slice(0, 120)}`,
    summary: `A new item was detected on ${sourceName}. Review the official source before taking office action.`,
    what_changed: `A new publication titled "${item.title}" appeared on ${sourceName}.`,
    who_is_affected: `Potentially affected: AP ministerial staff under ${category}. Confirm scope on the official source.`,
    action_required: [
      `Open the official source: ${item.source_url}`,
      "Read the full order or circular",
      "Route to Head of Office if establishment or finance action is required",
      "Update office records and Service Registers as applicable",
    ].join("\n"),
    reference_source: `Verify on official portal: ${item.source_url}`,
    department_impact: category,
    keywords: ["AP government", "ministerial staff", category.toLowerCase(), "GO", "circular"],
    body: [
      "## Administrative notice",
      "",
      `OfficeMitra Intelligence detected a new item on **${sourceName}**.`,
      "",
      `**Detected title:** ${item.title}`,
      "",
      "This is an AI-assisted draft based on metadata only. No government text has been copied.",
      `Open the [official source](${item.source_url}) to read the full document.`,
    ].join("\n"),
  };
}

export async function generateIntelDraft(
  update: IntelDetectedUpdate
): Promise<IntelDraft> {
  const item = {
    title: update.title,
    source_name: update.source?.name,
    source_category: update.source?.category,
    source_url: update.source_url,
    published_date: update.published_date,
  };

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return fallbackDraft(item);

  const system = `You are OfficeMitra Intelligence for AP government ministerial staff.
You receive ONLY metadata (title, source, URL). Write ORIGINAL explanatory content in JSON.
Never copy government text. Always tell users to verify on the official URL.
Keys: title, summary, what_changed, who_is_affected, action_required, reference_source, department_impact, keywords (array), body (markdown).`;

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
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          {
            role: "user",
            content: `Generate an OfficeMitra update draft:\n${JSON.stringify(item, null, 2)}`,
          },
        ],
      }),
      signal: AbortSignal.timeout(45_000),
    });

    if (!res.ok) return fallbackDraft(item);
    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content ?? "{}";
    const draft = JSON.parse(content) as Partial<IntelDraft>;
    const base = fallbackDraft(item);
    return {
      title: draft.title ?? base.title,
      summary: draft.summary ?? base.summary,
      what_changed: draft.what_changed ?? base.what_changed,
      who_is_affected: draft.who_is_affected ?? base.who_is_affected,
      action_required: draft.action_required ?? base.action_required,
      reference_source: draft.reference_source ?? base.reference_source,
      department_impact: draft.department_impact ?? base.department_impact,
      keywords: Array.isArray(draft.keywords) ? draft.keywords : base.keywords,
      body: draft.body ?? base.body,
    };
  } catch {
    return fallbackDraft(item);
  }
}
