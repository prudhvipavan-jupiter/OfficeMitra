import type { IntelDetectedUpdate } from "./types";
import type { UpdateEntry } from "@/lib/content";

export function intelUpdateToPublicEntry(update: IntelDetectedUpdate): UpdateEntry {
  const categoryMap: Record<string, UpdateEntry["category"]> = {
    "Finance Department": "finance",
    Treasury: "finance",
    "Health Department": "health",
    APPSC: "appsc",
  };

  const category =
    categoryMap[update.source?.category ?? ""] ??
    (update.ai_department_impact?.toLowerCase().includes("health")
      ? "health"
      : update.ai_department_impact?.toLowerCase().includes("finance")
        ? "finance"
        : "establishment");

  return {
    title: update.ai_title ?? update.title,
    slug: update.published_slug ?? update.id,
    date: (update.published_at ?? update.detected_at).slice(0, 10),
    category,
    what_changed: update.ai_what_changed ?? update.ai_summary ?? "",
    who_is_affected: update.ai_who_affected ?? "",
    action_required: update.ai_action_required ?? "",
    status: "published",
    content: update.ai_body ?? update.ai_summary ?? "",
  };
}
