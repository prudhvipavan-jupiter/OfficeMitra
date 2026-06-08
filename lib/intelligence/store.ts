import { ensureSchema, getSql, isDatabaseEnabled } from "@/lib/db/client";
import type {
  IntelActivityLog,
  IntelDashboardStats,
  IntelDetectedUpdate,
  IntelMonitoringRun,
  IntelSource,
  IntelUpdateStatus,
} from "./types";

function rowSource(row: Record<string, unknown>): IntelSource {
  return {
    id: String(row.id),
    name: String(row.name),
    url: String(row.url),
    category: String(row.category),
    active: Boolean(row.active),
    check_method: row.check_method as IntelSource["check_method"],
    feed_url: row.feed_url ? String(row.feed_url) : null,
    link_selector: row.link_selector ? String(row.link_selector) : null,
    config:
      typeof row.config === "string"
        ? (JSON.parse(row.config) as Record<string, unknown>)
        : ((row.config as Record<string, unknown>) ?? {}),
    last_checked: row.last_checked
      ? new Date(row.last_checked as string).toISOString()
      : null,
    last_update_found: row.last_update_found
      ? new Date(row.last_update_found as string).toISOString()
      : null,
    created_at: new Date(row.created_at as string).toISOString(),
    updated_at: new Date(row.updated_at as string).toISOString(),
  };
}

function rowUpdate(row: Record<string, unknown>): IntelDetectedUpdate {
  const keywords =
    typeof row.ai_keywords === "string"
      ? (JSON.parse(row.ai_keywords) as string[])
      : ((row.ai_keywords as string[]) ?? []);

  const update: IntelDetectedUpdate = {
    id: String(row.id),
    source_id: String(row.source_id),
    title: String(row.title),
    source_url: String(row.source_url),
    published_date: row.published_date ? String(row.published_date) : null,
    fingerprint: String(row.fingerprint),
    status: row.status as IntelUpdateStatus,
    detected_at: new Date(row.detected_at as string).toISOString(),
    ai_title: row.ai_title ? String(row.ai_title) : null,
    ai_summary: row.ai_summary ? String(row.ai_summary) : null,
    ai_what_changed: row.ai_what_changed ? String(row.ai_what_changed) : null,
    ai_who_affected: row.ai_who_affected ? String(row.ai_who_affected) : null,
    ai_action_required: row.ai_action_required ? String(row.ai_action_required) : null,
    ai_reference_source: row.ai_reference_source ? String(row.ai_reference_source) : null,
    ai_department_impact: row.ai_department_impact
      ? String(row.ai_department_impact)
      : null,
    ai_keywords: keywords,
    ai_body: row.ai_body ? String(row.ai_body) : null,
    admin_notes: row.admin_notes ? String(row.admin_notes) : null,
    reviewed_at: row.reviewed_at
      ? new Date(row.reviewed_at as string).toISOString()
      : null,
    reviewed_by: row.reviewed_by ? String(row.reviewed_by) : null,
    published_at: row.published_at
      ? new Date(row.published_at as string).toISOString()
      : null,
    published_slug: row.published_slug ? String(row.published_slug) : null,
    created_at: new Date(row.created_at as string).toISOString(),
    updated_at: new Date(row.updated_at as string).toISOString(),
  };

  if (row.source_name) {
    update.source = {
      id: String(row.source_id),
      name: String(row.source_name),
      url: String(row.source_url_base ?? ""),
      category: String(row.source_category ?? ""),
      active: true,
      check_method: "html_links",
      feed_url: null,
      link_selector: null,
      config: {},
      last_checked: null,
      last_update_found: null,
      created_at: update.created_at,
      updated_at: update.updated_at,
    };
  }

  return update;
}

async function ensureIntelTablesExist() {
  if (!isDatabaseEnabled()) return;
  await ensureSchema();
}

export function isIntelligenceEnabled(): boolean {
  return isDatabaseEnabled();
}

export async function getIntelSources(): Promise<IntelSource[]> {
  if (!isDatabaseEnabled()) return [];
  await ensureIntelTablesExist();
  const sql = getSql();
  const rows = await sql`SELECT * FROM intel_sources ORDER BY category, name`;
  return rows.map((r) => rowSource(r as Record<string, unknown>));
}

export async function getIntelUpdates(
  status?: IntelUpdateStatus
): Promise<IntelDetectedUpdate[]> {
  if (!isDatabaseEnabled()) return [];
  await ensureIntelTablesExist();
  const sql = getSql();

  const rows = status
    ? await sql`
        SELECT u.*, s.name AS source_name, s.url AS source_url_base, s.category AS source_category
        FROM intel_detected_updates u
        LEFT JOIN intel_sources s ON s.id = u.source_id
        WHERE u.status = ${status}
        ORDER BY u.detected_at DESC
      `
    : await sql`
        SELECT u.*, s.name AS source_name, s.url AS source_url_base, s.category AS source_category
        FROM intel_detected_updates u
        LEFT JOIN intel_sources s ON s.id = u.source_id
        ORDER BY u.detected_at DESC
      `;

  return rows.map((r) => rowUpdate(r as Record<string, unknown>));
}

export async function getIntelUpdateById(
  id: string
): Promise<IntelDetectedUpdate | null> {
  if (!isDatabaseEnabled()) return null;
  await ensureIntelTablesExist();
  const sql = getSql();
  const rows = await sql`
    SELECT u.*, s.name AS source_name, s.url AS source_url_base, s.category AS source_category
    FROM intel_detected_updates u
    LEFT JOIN intel_sources s ON s.id = u.source_id
    WHERE u.id = ${id}
    LIMIT 1
  `;
  const row = rows[0];
  return row ? rowUpdate(row as Record<string, unknown>) : null;
}

export async function getPublishedIntelUpdates(): Promise<IntelDetectedUpdate[]> {
  return getIntelUpdates("PUBLISHED");
}

export async function getIntelDashboardStats(): Promise<IntelDashboardStats> {
  if (!isDatabaseEnabled()) {
    return {
      detected_today: 0,
      pending_review: 0,
      published_today: 0,
      sources_monitored: 0,
      active_sources: 0,
      last_run: null,
    };
  }

  await ensureIntelTablesExist();
  const sql = getSql();

  const [detectedToday] = await sql`
    SELECT COUNT(*)::int AS count FROM intel_detected_updates
    WHERE (detected_at AT TIME ZONE 'Asia/Kolkata')::date = (NOW() AT TIME ZONE 'Asia/Kolkata')::date
  `;
  const [pending] = await sql`
    SELECT COUNT(*)::int AS count FROM intel_detected_updates
    WHERE status IN ('NEW', 'DRAFT_GENERATED')
  `;
  const [publishedToday] = await sql`
    SELECT COUNT(*)::int AS count FROM intel_detected_updates
    WHERE status = 'PUBLISHED'
      AND (published_at AT TIME ZONE 'Asia/Kolkata')::date = (NOW() AT TIME ZONE 'Asia/Kolkata')::date
  `;
  const [sources] = await sql`
    SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE active)::int AS active
    FROM intel_sources
  `;
  const runs = await sql`
    SELECT * FROM intel_monitoring_runs ORDER BY started_at DESC LIMIT 1
  `;

  const lastRow = runs[0] as Record<string, unknown> | undefined;
  const last_run = lastRow
    ? ({
        id: String(lastRow.id),
        started_at: new Date(lastRow.started_at as string).toISOString(),
        finished_at: lastRow.finished_at
          ? new Date(lastRow.finished_at as string).toISOString()
          : null,
        status: lastRow.status as IntelMonitoringRun["status"],
        sources_checked: Number(lastRow.sources_checked),
        items_found: Number(lastRow.items_found),
        drafts_generated: Number(lastRow.drafts_generated),
        error_message: lastRow.error_message ? String(lastRow.error_message) : null,
        details:
          typeof lastRow.details === "string"
            ? (JSON.parse(lastRow.details) as Record<string, unknown>)
            : ((lastRow.details as Record<string, unknown>) ?? {}),
      } satisfies IntelMonitoringRun)
    : null;

  return {
    detected_today: detectedToday?.count ?? 0,
    pending_review: pending?.count ?? 0,
    published_today: publishedToday?.count ?? 0,
    sources_monitored: sources?.total ?? 0,
    active_sources: sources?.active ?? 0,
    last_run,
  };
}

export async function getIntelActivityLog(limit = 20): Promise<IntelActivityLog[]> {
  if (!isDatabaseEnabled()) return [];
  await ensureIntelTablesExist();
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM intel_activity_log ORDER BY created_at DESC LIMIT ${limit}
  `;
  return rows.map((row) => {
    const r = row as Record<string, unknown>;
    return {
      id: String(r.id),
      event_type: String(r.event_type),
      message: String(r.message),
      metadata:
        typeof r.metadata === "string"
          ? (JSON.parse(r.metadata) as Record<string, unknown>)
          : ((r.metadata as Record<string, unknown>) ?? {}),
      created_at: new Date(r.created_at as string).toISOString(),
    };
  });
}

export async function updateIntelUpdate(
  id: string,
  data: Partial<
    Pick<
      IntelDetectedUpdate,
      | "status"
      | "ai_title"
      | "ai_summary"
      | "ai_what_changed"
      | "ai_who_affected"
      | "ai_action_required"
      | "ai_reference_source"
      | "ai_department_impact"
      | "ai_keywords"
      | "ai_body"
      | "admin_notes"
      | "reviewed_by"
      | "published_slug"
    >
  > & { reviewed_at?: string; published_at?: string }
): Promise<IntelDetectedUpdate | null> {
  if (!isDatabaseEnabled()) return null;
  await ensureIntelTablesExist();
  const sql = getSql();

  const current = await getIntelUpdateById(id);
  if (!current) return null;

  const merged = {
    status: data.status ?? current.status,
    ai_title: data.ai_title ?? current.ai_title,
    ai_summary: data.ai_summary ?? current.ai_summary,
    ai_what_changed: data.ai_what_changed ?? current.ai_what_changed,
    ai_who_affected: data.ai_who_affected ?? current.ai_who_affected,
    ai_action_required: data.ai_action_required ?? current.ai_action_required,
    ai_reference_source: data.ai_reference_source ?? current.ai_reference_source,
    ai_department_impact: data.ai_department_impact ?? current.ai_department_impact,
    ai_keywords: data.ai_keywords ?? current.ai_keywords,
    ai_body: data.ai_body ?? current.ai_body,
    admin_notes: data.admin_notes ?? current.admin_notes,
    reviewed_by: data.reviewed_by ?? current.reviewed_by,
    reviewed_at: data.reviewed_at ?? current.reviewed_at,
    published_slug: data.published_slug ?? current.published_slug,
    published_at: data.published_at ?? current.published_at,
  };

  await sql`
    UPDATE intel_detected_updates SET
      status = ${merged.status},
      ai_title = ${merged.ai_title},
      ai_summary = ${merged.ai_summary},
      ai_what_changed = ${merged.ai_what_changed},
      ai_who_affected = ${merged.ai_who_affected},
      ai_action_required = ${merged.ai_action_required},
      ai_reference_source = ${merged.ai_reference_source},
      ai_department_impact = ${merged.ai_department_impact},
      ai_keywords = ${JSON.stringify(merged.ai_keywords)}::jsonb,
      ai_body = ${merged.ai_body},
      admin_notes = ${merged.admin_notes},
      reviewed_by = ${merged.reviewed_by},
      reviewed_at = ${merged.reviewed_at}::timestamptz,
      published_slug = ${merged.published_slug},
      published_at = ${merged.published_at}::timestamptz,
      updated_at = NOW()
    WHERE id = ${id}
  `;

  return getIntelUpdateById(id);
}

export async function upsertIntelSource(
  source: Omit<IntelSource, "created_at" | "updated_at" | "last_checked" | "last_update_found"> & {
    last_checked?: string | null;
    last_update_found?: string | null;
  }
): Promise<void> {
  if (!isDatabaseEnabled()) return;
  await ensureIntelTablesExist();
  const sql = getSql();

  await sql`
    INSERT INTO intel_sources (
      id, name, url, category, active, check_method, feed_url, link_selector, config,
      last_checked, last_update_found
    ) VALUES (
      ${source.id},
      ${source.name},
      ${source.url},
      ${source.category},
      ${source.active},
      ${source.check_method},
      ${source.feed_url},
      ${source.link_selector},
      ${JSON.stringify(source.config)}::jsonb,
      ${source.last_checked ?? null}::timestamptz,
      ${source.last_update_found ?? null}::timestamptz
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      url = EXCLUDED.url,
      category = EXCLUDED.category,
      active = EXCLUDED.active,
      check_method = EXCLUDED.check_method,
      feed_url = EXCLUDED.feed_url,
      link_selector = EXCLUDED.link_selector,
      config = EXCLUDED.config,
      updated_at = NOW()
  `;
}

export async function deleteIntelSource(id: string): Promise<void> {
  if (!isDatabaseEnabled()) return;
  await ensureIntelTablesExist();
  const sql = getSql();
  await sql`DELETE FROM intel_sources WHERE id = ${id}`;
}

export async function logIntelActivity(
  event_type: string,
  message: string,
  metadata: Record<string, unknown> = {}
): Promise<void> {
  if (!isDatabaseEnabled()) return;
  await ensureIntelTablesExist();
  const sql = getSql();
  await sql`
    INSERT INTO intel_activity_log (id, event_type, message, metadata)
    VALUES (${crypto.randomUUID()}, ${event_type}, ${message}, ${JSON.stringify(metadata)}::jsonb)
  `;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export async function getPublishedIntelUpdateBySlug(
  slug: string
): Promise<IntelDetectedUpdate | null> {
  if (!isDatabaseEnabled()) return null;
  await ensureIntelTablesExist();
  const sql = getSql();
  const rows = await sql`
    SELECT u.*, s.name AS source_name, s.url AS source_url_base, s.category AS source_category
    FROM intel_detected_updates u
    LEFT JOIN intel_sources s ON s.id = u.source_id
    WHERE u.status = 'PUBLISHED' AND u.published_slug = ${slug}
    LIMIT 1
  `;
  const row = rows[0];
  return row ? rowUpdate(row as Record<string, unknown>) : null;
}

export async function publishIntelUpdate(
  id: string,
  reviewedBy = "admin"
): Promise<IntelDetectedUpdate | null> {
  const current = await getIntelUpdateById(id);
  if (!current || current.status !== "APPROVED") return null;

  const slug =
    current.published_slug ??
    slugify(current.ai_title ?? current.title) + "-" + Date.now().toString(36);

  return updateIntelUpdate(id, {
    status: "PUBLISHED",
    published_slug: slug,
    published_at: new Date().toISOString(),
    reviewed_by: reviewedBy,
    reviewed_at: new Date().toISOString(),
  });
}

export async function getActiveIntelSources(): Promise<IntelSource[]> {
  const all = await getIntelSources();
  return all.filter((s) => s.active);
}

export async function fingerprintExists(fingerprint: string): Promise<boolean> {
  if (!isDatabaseEnabled()) return false;
  await ensureIntelTablesExist();
  const sql = getSql();
  const rows = await sql`
    SELECT 1 FROM intel_detected_updates WHERE fingerprint = ${fingerprint} LIMIT 1
  `;
  return rows.length > 0;
}

export async function insertIntelDetectedUpdate(data: {
  source_id: string;
  title: string;
  source_url: string;
  fingerprint: string;
  published_date?: string | null;
}): Promise<string | null> {
  if (!isDatabaseEnabled()) return null;
  if (await fingerprintExists(data.fingerprint)) return null;

  await ensureIntelTablesExist();
  const sql = getSql();
  const id = crypto.randomUUID();

  await sql`
    INSERT INTO intel_detected_updates (
      id, source_id, title, source_url, published_date, fingerprint, status
    ) VALUES (
      ${id},
      ${data.source_id},
      ${data.title.slice(0, 500)},
      ${data.source_url.slice(0, 2000)},
      ${data.published_date ?? null},
      ${data.fingerprint},
      'NEW'
    )
  `;

  await sql`
    UPDATE intel_sources SET last_update_found = NOW() WHERE id = ${data.source_id}
  `;

  return id;
}

export async function updateIntelSourceChecked(sourceId: string): Promise<void> {
  if (!isDatabaseEnabled()) return;
  await ensureIntelTablesExist();
  const sql = getSql();
  await sql`UPDATE intel_sources SET last_checked = NOW() WHERE id = ${sourceId}`;
}

export async function updateIntelSourceConfig(
  sourceId: string,
  config: Record<string, unknown>
): Promise<void> {
  if (!isDatabaseEnabled()) return;
  await ensureIntelTablesExist();
  const sql = getSql();
  await sql`
    UPDATE intel_sources SET config = ${JSON.stringify(config)}::jsonb, updated_at = NOW()
    WHERE id = ${sourceId}
  `;
}

export async function saveIntelDraft(
  updateId: string,
  draft: {
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
): Promise<void> {
  if (!isDatabaseEnabled()) return;
  await ensureIntelTablesExist();
  const sql = getSql();
  await sql`
    UPDATE intel_detected_updates SET
      status = 'DRAFT_GENERATED',
      ai_title = ${draft.title},
      ai_summary = ${draft.summary},
      ai_what_changed = ${draft.what_changed},
      ai_who_affected = ${draft.who_is_affected},
      ai_action_required = ${draft.action_required},
      ai_reference_source = ${draft.reference_source},
      ai_department_impact = ${draft.department_impact},
      ai_keywords = ${JSON.stringify(draft.keywords)}::jsonb,
      ai_body = ${draft.body},
      updated_at = NOW()
    WHERE id = ${updateId}
  `;
}

export async function getNewIntelUpdatesWithoutDraft(
  limit = 50
): Promise<{ id: string }[]> {
  if (!isDatabaseEnabled()) return [];
  await ensureIntelTablesExist();
  const sql = getSql();
  const rows = await sql`
    SELECT id FROM intel_detected_updates
    WHERE status = 'NEW'
    ORDER BY detected_at ASC
    LIMIT ${limit}
  `;
  return rows.map((r) => ({ id: String((r as Record<string, unknown>).id) }));
}

export async function countIntelPublishedToday(): Promise<number> {
  if (!isDatabaseEnabled()) return 0;
  await ensureIntelTablesExist();
  const sql = getSql();
  const [row] = await sql`
    SELECT COUNT(*)::int AS count FROM intel_detected_updates
    WHERE status = 'PUBLISHED'
      AND (published_at AT TIME ZONE 'Asia/Kolkata')::date = (NOW() AT TIME ZONE 'Asia/Kolkata')::date
  `;
  return row?.count ?? 0;
}

export async function countIntelReadyDrafts(): Promise<number> {
  if (!isDatabaseEnabled()) return 0;
  await ensureIntelTablesExist();
  const sql = getSql();
  const [row] = await sql`
    SELECT COUNT(*)::int AS count FROM intel_detected_updates
    WHERE status IN ('DRAFT_GENERATED', 'APPROVED')
  `;
  return row?.count ?? 0;
}

export async function startIntelMonitoringRun(): Promise<string> {
  if (!isDatabaseEnabled()) return crypto.randomUUID();
  await ensureIntelTablesExist();
  const sql = getSql();
  const id = crypto.randomUUID();
  await sql`
    INSERT INTO intel_monitoring_runs (id, status, started_at)
    VALUES (${id}, 'running', NOW())
  `;
  return id;
}

export async function finishIntelMonitoringRun(
  runId: string,
  data: {
    status: "completed" | "failed";
    sources_checked: number;
    items_found: number;
    drafts_generated: number;
    error_message?: string | null;
    details?: Record<string, unknown>;
  }
): Promise<void> {
  if (!isDatabaseEnabled()) return;
  await ensureIntelTablesExist();
  const sql = getSql();
  await sql`
    UPDATE intel_monitoring_runs SET
      finished_at = NOW(),
      status = ${data.status},
      sources_checked = ${data.sources_checked},
      items_found = ${data.items_found},
      drafts_generated = ${data.drafts_generated},
      error_message = ${data.error_message ?? null},
      details = ${JSON.stringify(data.details ?? {})}::jsonb
    WHERE id = ${runId}
  `;
}

/** Ensure editorial source and tables exist before monitor runs. */
export async function ensureIntelInfrastructure(): Promise<void> {
  if (!isDatabaseEnabled()) return;
  await ensureIntelTablesExist();
  const sql = getSql();
  const { ensureEditorialIntelSource } = await import("@/lib/db/seed-intel-sources");
  await ensureEditorialIntelSource(sql);
}
