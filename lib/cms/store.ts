import { randomUUID } from "crypto";
import { ensureSchema, getSql, isDatabaseEnabled } from "@/lib/db/client";
import * as local from "./local-store";
import type { CmsContentType, CmsFileRecord, CmsRecord, CmsStatus } from "./types";

function rowToRecord(row: Record<string, unknown>): CmsRecord {
  return {
    id: row.id as string,
    content_type: row.content_type as CmsContentType,
    slug: (row.slug as string) ?? null,
    status: row.status as CmsStatus,
    data: (row.data ?? {}) as Record<string, unknown>,
    body: (row.body as string) ?? null,
    created_at: new Date(row.created_at as string).toISOString(),
    updated_at: new Date(row.updated_at as string).toISOString(),
  };
}

async function dbList(
  type: CmsContentType,
  opts?: { includeDeleted?: boolean; status?: CmsStatus }
): Promise<CmsRecord[]> {
  await ensureSchema();
  const sql = getSql();
  if (opts?.status) {
    const rows = await sql`
      SELECT * FROM cms_content
      WHERE content_type = ${type} AND status = ${opts.status}
      ORDER BY updated_at DESC
    `;
    return rows.map(rowToRecord);
  }
  if (opts?.includeDeleted) {
    const rows = await sql`
      SELECT * FROM cms_content WHERE content_type = ${type} ORDER BY updated_at DESC
    `;
    return rows.map(rowToRecord);
  }
  const rows = await sql`
    SELECT * FROM cms_content
    WHERE content_type = ${type} AND status <> 'deleted'
    ORDER BY updated_at DESC
  `;
  return rows.map(rowToRecord);
}

async function dbGet(id: string): Promise<CmsRecord | null> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`SELECT * FROM cms_content WHERE id = ${id}`;
  return rows[0] ? rowToRecord(rows[0]) : null;
}

async function dbUpsert(record: CmsRecord): Promise<CmsRecord> {
  await ensureSchema();
  const sql = getSql();
  await sql`
    INSERT INTO cms_content (id, content_type, slug, status, data, body, created_at, updated_at)
    VALUES (
      ${record.id},
      ${record.content_type},
      ${record.slug},
      ${record.status},
      ${JSON.stringify(record.data)}::jsonb,
      ${record.body},
      ${record.created_at}::timestamptz,
      ${record.updated_at}::timestamptz
    )
    ON CONFLICT (id) DO UPDATE SET
      content_type = EXCLUDED.content_type,
      slug = EXCLUDED.slug,
      status = EXCLUDED.status,
      data = EXCLUDED.data,
      body = EXCLUDED.body,
      updated_at = EXCLUDED.updated_at
  `;
  return record;
}

async function dbDelete(id: string): Promise<boolean> {
  await ensureSchema();
  const sql = getSql();
  await sql`DELETE FROM cms_files WHERE content_id = ${id}`;
  const result = await sql`DELETE FROM cms_content WHERE id = ${id} RETURNING id`;
  return result.length > 0;
}

async function dbClearType(type: CmsContentType): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`SELECT id FROM cms_content WHERE content_type = ${type}`;
  for (const row of rows) {
    await dbDelete(row.id as string);
  }
}

export async function cmsClearType(type: CmsContentType): Promise<void> {
  if (isDatabaseEnabled()) return dbClearType(type);
  const records = local.localList(type, { includeDeleted: true });
  for (const r of records) local.localDelete(r.id);
}

async function dbSaveFile(
  contentId: string,
  field: string,
  filename: string,
  mimeType: string,
  buffer: Buffer
): Promise<CmsFileRecord> {
  await ensureSchema();
  const sql = getSql();
  const id = `${contentId}-${field}`;
  const base64 = buffer.toString("base64");
  await sql`
    INSERT INTO cms_files (id, content_id, field, filename, mime_type, size, data_base64, created_at)
    VALUES (${id}, ${contentId}, ${field}, ${filename}, ${mimeType}, ${buffer.length}, ${base64}, NOW())
    ON CONFLICT (id) DO UPDATE SET
      filename = EXCLUDED.filename,
      mime_type = EXCLUDED.mime_type,
      size = EXCLUDED.size,
      data_base64 = EXCLUDED.data_base64,
      created_at = NOW()
  `;
  const rows = await sql`SELECT * FROM cms_files WHERE id = ${id}`;
  const row = rows[0];
  return {
    id: row.id as string,
    content_id: row.content_id as string,
    field: row.field as string,
    filename: row.filename as string,
    mime_type: row.mime_type as string,
    size: row.size as number,
    created_at: new Date(row.created_at as string).toISOString(),
  };
}

async function dbGetFile(id: string): Promise<{ meta: CmsFileRecord; buffer: Buffer } | null> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`SELECT * FROM cms_files WHERE id = ${id}`;
  const row = rows[0];
  if (!row) return null;
  return {
    meta: {
      id: row.id as string,
      content_id: row.content_id as string,
      field: row.field as string,
      filename: row.filename as string,
      mime_type: row.mime_type as string,
      size: row.size as number,
      created_at: new Date(row.created_at as string).toISOString(),
    },
    buffer: Buffer.from(row.data_base64 as string, "base64"),
  };
}

export function cmsUsesDatabase(): boolean {
  return isDatabaseEnabled();
}

export async function cmsList(
  type: CmsContentType,
  opts?: { includeDeleted?: boolean; status?: CmsStatus }
): Promise<CmsRecord[]> {
  if (isDatabaseEnabled()) return dbList(type, opts);
  return local.localList(type, opts);
}

export async function cmsGet(id: string): Promise<CmsRecord | null> {
  if (isDatabaseEnabled()) return dbGet(id);
  return local.localGet(id) ?? null;
}

export async function cmsCreate(input: {
  content_type: CmsContentType;
  slug?: string | null;
  status?: CmsStatus;
  data: Record<string, unknown>;
  body?: string | null;
}): Promise<CmsRecord> {
  const now = new Date().toISOString();
  const record: CmsRecord = {
    id: randomUUID(),
    content_type: input.content_type,
    slug: input.slug ?? null,
    status: input.status ?? "draft",
    data: input.data,
    body: input.body ?? null,
    created_at: now,
    updated_at: now,
  };
  if (isDatabaseEnabled()) return dbUpsert(record);
  return local.localUpsert(record);
}

export async function cmsFindBySlug(
  type: CmsContentType,
  slug: string
): Promise<CmsRecord | null> {
  const records = await cmsList(type, { includeDeleted: true });
  return records.find((r) => r.slug === slug) ?? null;
}

/** Create or update by content_type + slug (idempotent sync from git files). */
export async function cmsUpsert(input: {
  content_type: CmsContentType;
  slug: string | null;
  status?: CmsStatus;
  data: Record<string, unknown>;
  body?: string | null;
}): Promise<CmsRecord> {
  if (input.slug) {
    const existing = await cmsFindBySlug(input.content_type, input.slug);
    if (existing) {
      const updated = await cmsUpdate(existing.id, {
        slug: input.slug,
        status: input.status ?? existing.status,
        data: input.data,
        body: input.body ?? existing.body,
      });
      return updated!;
    }
  }
  return cmsCreate(input);
}

export async function cmsUpdate(
  id: string,
  patch: Partial<Pick<CmsRecord, "slug" | "status" | "data" | "body">>
): Promise<CmsRecord | null> {
  const existing = await cmsGet(id);
  if (!existing) return null;
  const record: CmsRecord = {
    ...existing,
    ...patch,
    data: patch.data ?? existing.data,
    updated_at: new Date().toISOString(),
  };
  if (isDatabaseEnabled()) return dbUpsert(record);
  return local.localUpsert(record);
}

export async function cmsDelete(id: string): Promise<boolean> {
  if (isDatabaseEnabled()) {
    await ensureSchema();
    const sql = getSql();
    await sql`DELETE FROM cms_files WHERE content_id = ${id}`;
    const result = await sql`DELETE FROM cms_content WHERE id = ${id} RETURNING id`;
    return result.length > 0;
  }
  return local.localDelete(id);
}

export async function cmsSaveFile(
  contentId: string,
  field: string,
  filename: string,
  mimeType: string,
  buffer: Buffer
): Promise<CmsFileRecord> {
  if (isDatabaseEnabled()) return dbSaveFile(contentId, field, filename, mimeType, buffer);
  return local.localSaveFile(contentId, field, filename, mimeType, buffer);
}

export async function cmsGetFile(id: string) {
  if (isDatabaseEnabled()) return dbGetFile(id);
  return local.localGetFile(id);
}

export function cmsFileUrl(contentId: string, field: string): string {
  return `/api/cms/file/${contentId}/${field}`;
}

export async function cmsHasRecords(type?: CmsContentType): Promise<boolean> {
  if (type) {
    const list = await cmsList(type, { includeDeleted: true });
    return list.length > 0;
  }
  if (isDatabaseEnabled()) {
    await ensureSchema();
    const sql = getSql();
    const rows = await sql`SELECT COUNT(*)::int AS c FROM cms_content`;
    return Number(rows[0]?.c ?? 0) > 0;
  }
  return local.localHasAnyRecords();
}
