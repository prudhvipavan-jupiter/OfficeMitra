import {
  getIntelUpdates,
  publishIntelUpdate,
  updateIntelUpdate,
} from "./store";

/** Auto-approve and publish AI drafts when INTELLIGENCE_AUTO_PUBLISH=true. */
export async function autoProcessIntelUpdates(): Promise<number> {
  if (process.env.INTELLIGENCE_AUTO_PUBLISH !== "true") return 0;

  let published = 0;

  const drafts = await getIntelUpdates("DRAFT_GENERATED");
  for (const update of drafts) {
    if (!update.ai_title || !update.ai_what_changed) continue;
    await updateIntelUpdate(update.id, {
      status: "APPROVED",
      reviewed_by: "auto",
      reviewed_at: new Date().toISOString(),
    });
    const result = await publishIntelUpdate(update.id, "auto");
    if (result) published += 1;
  }

  const approved = await getIntelUpdates("APPROVED");
  for (const update of approved) {
    const result = await publishIntelUpdate(update.id, "auto");
    if (result) published += 1;
  }

  return published;
}
