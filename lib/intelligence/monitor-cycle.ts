import { checkIntelSource, fetchPage, getPageHashFromHtml } from "./fetcher";
import { generateIntelDraft } from "./draft-generator";
import { fillEditorialBriefings } from "./editorial-fill";
import { makeFingerprint } from "./fingerprint";
import {
  countIntelPublishedToday,
  countIntelReadyDrafts,
  ensureIntelInfrastructure,
  finishIntelMonitoringRun,
  fingerprintExists,
  getActiveIntelSources,
  getIntelUpdateById,
  getNewIntelUpdatesWithoutDraft,
  insertIntelDetectedUpdate,
  logIntelActivity,
  saveIntelDraft,
  startIntelMonitoringRun,
  updateIntelSourceChecked,
  updateIntelSourceConfig,
} from "./store";
import type { IntelSource } from "./types";

function dailyPublishTarget(): number {
  return Math.max(1, parseInt(process.env.INTELLIGENCE_DAILY_PUBLISH_TARGET ?? "5", 10));
}

async function baselineSource(source: IntelSource, items: { title: string; url: string }[]) {
  const seen = items.map((item) => makeFingerprint(source.id, item.url, item.title));
  await updateIntelSourceConfig(source.id, {
    ...source.config,
    baseline_complete: true,
    baseline_at: new Date().toISOString(),
    baseline_count: seen.length,
  });
  await logIntelActivity("baseline_complete", `Baseline recorded ${seen.length} URLs for ${source.name}`, {
    source_id: source.id,
  });
}

async function handlePageHashUpdate(source: IntelSource, html: string) {
  const hash = getPageHashFromHtml(html);
  const prev = String(source.config?.last_page_hash ?? "");
  if (prev && prev === hash) return false;
  await updateIntelSourceConfig(source.id, { ...source.config, last_page_hash: hash });
  return true;
}

/** Full monitor + draft + editorial fill cycle (runs on Vercel — no Python worker required). */
export async function runIntelligenceMonitorCycle(): Promise<{
  sources_checked: number;
  items_found: number;
  drafts_generated: number;
  editorial_created: number;
  errors: string[];
}> {
  await ensureIntelInfrastructure();

  const runId = await startIntelMonitoringRun();
  let sourcesChecked = 0;
  let itemsFound = 0;
  let draftsGenerated = 0;
  let editorialCreated = 0;
  const errors: string[] = [];

  try {
    const sources = await getActiveIntelSources();

    for (const source of sources) {
      sourcesChecked += 1;
      try {
        let detected = await checkIntelSource(source);

        if (source.check_method === "page_hash") {
          const html = await fetchPage(source.url);
          const changed = await handlePageHashUpdate(source, html);
          if (!changed) {
            detected = [];
          }
        }

        const isBaseline = !source.config?.baseline_complete && source.check_method === "html_links";

        if (isBaseline) {
          await baselineSource(source, detected);
          await updateIntelSourceChecked(source.id);
          continue;
        }

        for (const item of detected) {
          const fp = makeFingerprint(source.id, item.url, item.title);
          if (await fingerprintExists(fp)) continue;

          const id = await insertIntelDetectedUpdate({
            source_id: source.id,
            title: item.title,
            source_url: item.url,
            fingerprint: fp,
            published_date: item.published_date ?? null,
          });

          if (id) {
            itemsFound += 1;
            await logIntelActivity("update_detected", `New: ${source.name} — ${item.title.slice(0, 80)}`, {
              update_id: id,
              source_id: source.id,
            });
          }
        }

        await updateIntelSourceChecked(source.id);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`${source.name}: ${msg}`);
        await logIntelActivity("source_error", `Failed: ${source.name}`, { error: msg });
      }
    }

    const draftLimit = parseInt(process.env.INTELLIGENCE_DRAFT_BATCH ?? "15", 10);
    const newRows = await getNewIntelUpdatesWithoutDraft(draftLimit);

    for (const row of newRows) {
      try {
        const full = await getIntelUpdateById(row.id);
        if (!full) continue;
        const draft = await generateIntelDraft(full);
        await saveIntelDraft(row.id, draft);
        draftsGenerated += 1;
        await logIntelActivity("draft_generated", `Draft: ${draft.title.slice(0, 80)}`, {
          update_id: row.id,
        });
      } catch (err) {
        errors.push(`Draft ${row.id}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    const target = dailyPublishTarget();
    const publishedToday = await countIntelPublishedToday();
    const readyDrafts = await countIntelReadyDrafts();
    const needDrafts = Math.max(0, target - publishedToday - readyDrafts);
    editorialCreated = await fillEditorialBriefings(needDrafts);

    await finishIntelMonitoringRun(runId, {
      status: errors.length ? "completed" : "completed",
      sources_checked: sourcesChecked,
      items_found: itemsFound,
      drafts_generated: draftsGenerated + editorialCreated,
      error_message: errors.length ? errors.join("; ") : null,
      details: { errors, editorial_created: editorialCreated },
    });

    await logIntelActivity(
      "monitoring_complete",
      `Run done: ${itemsFound} detected, ${draftsGenerated} drafted, ${editorialCreated} editorial`,
      { run_id: runId }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await finishIntelMonitoringRun(runId, {
      status: "failed",
      sources_checked: sourcesChecked,
      items_found: itemsFound,
      drafts_generated: draftsGenerated,
      error_message: msg,
    });
    throw err;
  }

  return {
    sources_checked: sourcesChecked,
    items_found: itemsFound,
    drafts_generated: draftsGenerated,
    editorial_created: editorialCreated,
    errors,
  };
}
