import fs from "fs";
import path from "path";
import type { CmsContentType, CmsFileRecord, CmsRecord, CmsStatus } from "./types";

const cmsDir = path.join(process.cwd(), "data", "cms");
const storePath = path.join(cmsDir, "records.json");
const filesDir = path.join(cmsDir, "files");
const filesMetaPath = path.join(cmsDir, "files.json");

function ensureDirs() {
  if (!fs.existsSync(cmsDir)) fs.mkdirSync(cmsDir, { recursive: true });
  if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir, { recursive: true });
}

function readRecords(): CmsRecord[] {
  ensureDirs();
  if (!fs.existsSync(storePath)) return [];
  return JSON.parse(fs.readFileSync(storePath, "utf-8")) as CmsRecord[];
}

function writeRecords(records: CmsRecord[]) {
  ensureDirs();
  fs.writeFileSync(storePath, JSON.stringify(records, null, 2));
}

function readFileMeta(): CmsFileRecord[] {
  ensureDirs();
  if (!fs.existsSync(filesMetaPath)) return [];
  return JSON.parse(fs.readFileSync(filesMetaPath, "utf-8")) as CmsFileRecord[];
}

function writeFileMeta(files: CmsFileRecord[]) {
  ensureDirs();
  fs.writeFileSync(filesMetaPath, JSON.stringify(files, null, 2));
}

export function localCmsEnabled(): boolean {
  return fs.existsSync(storePath) || fs.existsSync(cmsDir);
}

export function localList(
  type: CmsContentType,
  opts?: { includeDeleted?: boolean; status?: CmsStatus }
): CmsRecord[] {
  return readRecords().filter((r) => {
    if (r.content_type !== type) return false;
    if (!opts?.includeDeleted && r.status === "deleted") return false;
    if (opts?.status && r.status !== opts.status) return false;
    return true;
  });
}

export function localGet(id: string): CmsRecord | undefined {
  return readRecords().find((r) => r.id === id);
}

export function localUpsert(record: CmsRecord): CmsRecord {
  const records = readRecords();
  const idx = records.findIndex((r) => r.id === record.id);
  if (idx >= 0) records[idx] = record;
  else records.push(record);
  writeRecords(records);
  return record;
}

export function localDelete(id: string): boolean {
  const records = readRecords();
  const next = records.filter((r) => r.id !== id);
  if (next.length === records.length) return false;
  writeRecords(next);
  const files = readFileMeta().filter((f) => f.content_id !== id);
  writeFileMeta(files);
  return true;
}

export function localSaveFile(
  contentId: string,
  field: string,
  filename: string,
  mimeType: string,
  buffer: Buffer
): CmsFileRecord {
  ensureDirs();
  const id = `${contentId}-${field}`;
  const filePath = path.join(filesDir, id);
  fs.writeFileSync(filePath, buffer);

  const meta: CmsFileRecord = {
    id,
    content_id: contentId,
    field,
    filename,
    mime_type: mimeType,
    size: buffer.length,
    created_at: new Date().toISOString(),
  };

  const all = readFileMeta().filter((f) => f.id !== id);
  all.push(meta);
  writeFileMeta(all);
  return meta;
}

export function localGetFile(id: string): { meta: CmsFileRecord; buffer: Buffer } | null {
  const meta = readFileMeta().find((f) => f.id === id);
  if (!meta) return null;
  const filePath = path.join(filesDir, id);
  if (!fs.existsSync(filePath)) return null;
  return { meta, buffer: fs.readFileSync(filePath) };
}

export function localGetFileByContent(contentId: string, field: string) {
  const meta = readFileMeta().find((f) => f.content_id === contentId && f.field === field);
  if (!meta) return null;
  return localGetFile(meta.id);
}

export function localHasAnyRecords(): boolean {
  return readRecords().length > 0;
}
