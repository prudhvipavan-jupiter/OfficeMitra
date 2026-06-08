import { buildDetailedBriefingByTitle } from "./briefing-content";
import { buildDetailedFallback } from "./draft-generator";
import { isPdfUrl, relatedKnowledgeSlug } from "./document-links";
import type { IntelDetectedUpdate } from "./types";
import type { UpdateEntry } from "@/lib/content";

export function intelUpdateToPublicEntry(update: IntelDetectedUpdate): UpdateEntry {
  const categoryMap: Record<string, UpdateEntry["category"]> = {
    "Finance Department": "finance",
    Treasury: "finance",
    "Health Department": "health",
    APPSC: "appsc",
    Establishment: "establishment",
    Leave: "establishment",
    APGLI: "finance",
    GPF: "finance",
    Conduct: "establishment",
    OfficeMitra: "establishment",
  };

  const category =
    categoryMap[update.source?.category ?? ""] ??
    categoryMap[update.ai_department_impact ?? ""] ??
    (update.ai_department_impact?.toLowerCase().includes("health")
      ? "health"
      : update.ai_department_impact?.toLowerCase().includes("finance")
        ? "finance"
        : "establishment");

  const title = update.ai_title ?? update.title;
  const documentUrl = isPdfUrl(update.source_url) ? update.source_url : undefined;
  const knowledgeSlug = relatedKnowledgeSlug(title);

  return {
    title,
    slug: update.published_slug ?? update.id,
    date: (update.published_at ?? update.detected_at).slice(0, 10),
    category,
    what_changed: update.ai_what_changed ?? update.ai_summary ?? "",
    who_is_affected: update.ai_who_affected ?? "",
    action_required: update.ai_action_required ?? "",
    status: "published",
    content: update.ai_body ?? update.ai_summary ?? "",
    source_url: update.source_url,
    document_url: documentUrl,
    related_knowledge_slug: knowledgeSlug ?? undefined,
  };
}

export function buildUpgradeDraft(update: IntelDetectedUpdate) {
  const detailed = buildDetailedBriefingByTitle(update.title);
  if (detailed) return detailed;

  return buildDetailedFallback({
    title: update.title,
    source_name: update.source?.name,
    source_category: update.source?.category,
    source_url: update.source_url,
  });
}
