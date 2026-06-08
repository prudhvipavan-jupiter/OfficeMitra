import { getSql, isDatabaseEnabled } from "@/lib/db/client";
import { buildUpgradeDraft } from "./public";
import { getIntelUpdateById, saveIntelDraft } from "./store";

const MIN_BODY_LENGTH = 800;

/** Upgrade published/draft intel posts that are still too brief. */
export async function upgradeBriefIntelPosts(): Promise<number> {
  if (!isDatabaseEnabled()) return 0;

  const sql = getSql();
  const rows = await sql`
    SELECT id FROM intel_detected_updates
    WHERE status IN ('PUBLISHED', 'DRAFT_GENERATED', 'APPROVED')
      AND (ai_body IS NULL OR length(ai_body) < ${MIN_BODY_LENGTH})
    ORDER BY detected_at DESC
    LIMIT 20
  `;

  let upgraded = 0;
  for (const row of rows) {
    const id = String((row as Record<string, unknown>).id);
    const update = await getIntelUpdateById(id);
    if (!update) continue;

    const draft = buildUpgradeDraft(update);
    await saveIntelDraft(id, draft);
    upgraded += 1;
  }

  return upgraded;
}
