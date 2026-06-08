import {
  countIntelPublishedToday,
  getIntelUpdates,
  publishIntelUpdate,
  updateIntelUpdate,
} from "./store";

function dailyPublishTarget(): number {
  return Math.max(1, parseInt(process.env.INTELLIGENCE_DAILY_PUBLISH_TARGET ?? "5", 10));
}

function autoPublishEnabled(): boolean {
  return process.env.INTELLIGENCE_AUTO_PUBLISH !== "false";
}

/** Auto-approve and publish drafts up to daily target when INTELLIGENCE_AUTO_PUBLISH is enabled. */
export async function autoProcessIntelUpdates(): Promise<number> {
  if (!autoPublishEnabled()) return 0;

  const target = dailyPublishTarget();
  const alreadyPublished = await countIntelPublishedToday();
  let remaining = Math.max(0, target - alreadyPublished);
  if (remaining === 0) return 0;

  let published = 0;

  const drafts = (await getIntelUpdates("DRAFT_GENERATED")).reverse();
  for (const update of drafts) {
    if (remaining <= 0) break;
    if (!update.ai_title || !update.ai_what_changed) continue;
    await updateIntelUpdate(update.id, {
      status: "APPROVED",
      reviewed_by: "auto",
      reviewed_at: new Date().toISOString(),
    });
    const result = await publishIntelUpdate(update.id, "auto");
    if (result) {
      published += 1;
      remaining -= 1;
    }
  }

  const approved = (await getIntelUpdates("APPROVED")).reverse();
  for (const update of approved) {
    if (remaining <= 0) break;
    const result = await publishIntelUpdate(update.id, "auto");
    if (result) {
      published += 1;
      remaining -= 1;
    }
  }

  return published;
}
