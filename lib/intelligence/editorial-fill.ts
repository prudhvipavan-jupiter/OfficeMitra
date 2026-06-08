/**
 * Editorial backfill — detailed staff briefings with document links.
 */
import { buildDetailedBriefingDraft, getBriefingTopicsForDay } from "./briefing-content";
import { makeFingerprint } from "./fingerprint";
import {
  ensureIntelInfrastructure,
  fingerprintExists,
  insertIntelDetectedUpdate,
  logIntelActivity,
  saveIntelDraft,
} from "./store";

const EDITORIAL_SOURCE_ID = "00000000-0000-4000-8000-000000000001";

export async function fillEditorialBriefings(needed: number): Promise<number> {
  if (needed <= 0) return 0;

  await ensureIntelInfrastructure();

  let created = 0;
  const dateKey = new Date().toISOString().slice(0, 10);
  const topics = getBriefingTopicsForDay(needed);

  for (const topic of topics) {
    if (created >= needed) break;

    const fp = makeFingerprint(
      EDITORIAL_SOURCE_ID,
      `editorial://${topic.knowledgeSlug}`,
      `${dateKey}-${topic.knowledgeSlug}`
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

    try {
      const draft = buildDetailedBriefingDraft(topic);
      await saveIntelDraft(id, draft);
      await logIntelActivity("editorial_briefing", `Detailed briefing: ${topic.title.slice(0, 80)}`, {
        update_id: id,
      });
      created += 1;
    } catch {
      // skip failed item
    }
  }

  return created;
}
