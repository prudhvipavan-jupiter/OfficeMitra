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

async function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

async function baselineSource(source: IntelSource, items: { title: string; url: string }[]) {
  await updateIntelSourceConfig(source.id, {
    ...source.config,
    baseline_complete: true,
    baseline_at: new Date().toISOString(),
    baseline_count: items.length,
  });
  await logIntelActivity("baseline_complete", `Baseline recorded ${items.length} URLs for ${source.name}`, {
    source_id: source.id,
  });
}

async function checkOneSource(source: IntelSource): Promise<{ found: number; error?: string }> {
  let found = 0;
  try {
    let detected = await withTimeout(checkIntelSource(source), 12_000, source.name);

    if (source.check_method === "page_hash") {
      const html = await withTimeout(fetchPage(source.url), 12_000, source.name);
      const hash = getPageHashFromHtml(html);
      const prev = String(source.config?.last_page_hash ?? "");
      if (prev && prev === hash) {
        detected = [];
      } else {
        await updateIntelSourceConfig(source.id, { ...source.config, last_page_hash: hash });
      }
    }

    if (!source.config?.baseline_complete && source.check_method === "html_links") {
      await baselineSource(source, detected);
      await updateIntelSourceChecked(source.id);
      return { found: 0 };
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
        found += 1;
        await logIntelActivity("update_detected", `New: ${source.name} — ${item.title.slice(0, 80)}`, {
          update_id: id,
          source_id: source.id,
        });
      }
    }

    await updateIntelSourceChecked(source.id);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logIntelActivity("source_error", `Failed: ${source.name}`, { error: msg });
    return { found: 0, error: msg };
  }

  return { found };
}

/** Full monitor + draft + editorial fill cycle (runs on Vercel — no Python worker required). */
export async function runIntelligenceMonitorCycle(): Promise<{
  ok: boolean;
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
    const target = dailyPublishTarget();
    const publishedToday = await countIntelPublishedToday();
    const readyDrafts = await countIntelReadyDrafts();
    const needDrafts = Math.max(0, target - publishedToday - readyDrafts);

    editorialCreated = await fillEditorialBriefings(needDrafts);

    const sources = await getActiveIntelSources();
    const perRun = Math.min(sources.length, 5);
    const offset =
      Math.floor(Date.now() / 1_800_000) % Math.max(1, Math.ceil(sources.length / perRun));
    const batch = sources.slice(offset * perRun, offset * perRun + perRun);

    const results = await Promise.allSettled(batch.map((s) => checkOneSource(s)));
    for (const result of results) {
      sourcesChecked += 1;
      if (result.status === "fulfilled") {
        itemsFound += result.value.found;
        if (result.value.error) errors.push(result.value.error);
      } else {
        errors.push(result.reason instanceof Error ? result.reason.message : String(result.reason));
      }
    }

    const draftLimit = Math.min(
      parseInt(process.env.INTELLIGENCE_DRAFT_BATCH ?? "15", 10),
      8
    );
    const newRows = await getNewIntelUpdatesWithoutDraft(draftLimit);

    for (const row of newRows) {
      try {
        const full = await getIntelUpdateById(row.id);
        if (!full) continue;
        const draft = await withTimeout(generateIntelDraft(full), 20_000, "draft");
        await saveIntelDraft(row.id, draft);
        draftsGenerated += 1;
      } catch (err) {
        errors.push(`Draft ${row.id}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    await finishIntelMonitoringRun(runId, {
      status: "completed",
      sources_checked: sourcesChecked,
      items_found: itemsFound,
      drafts_generated: draftsGenerated + editorialCreated,
      error_message: errors.length ? errors.slice(0, 5).join("; ") : null,
      details: { errors: errors.slice(0, 10), editorial_created: editorialCreated },
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
      drafts_generated: draftsGenerated + editorialCreated,
      error_message: msg,
    });
    errors.push(msg);
  }

  return {
    ok: errors.length === 0 || editorialCreated > 0 || draftsGenerated > 0,
    sources_checked: sourcesChecked,
    items_found: itemsFound,
    drafts_generated: draftsGenerated,
    editorial_created: editorialCreated,
    errors,
  };
}
