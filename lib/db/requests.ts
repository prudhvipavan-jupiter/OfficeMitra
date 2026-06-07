import fs from "fs";
import path from "path";
import type { ServiceType } from "@/lib/expert-assistance";
import { ensureSchema, getSql, isDatabaseEnabled, warnIfMissingDatabaseInProduction } from "./client";

export interface ExpertRequestRecord {
  id: string;
  reference_number: string;
  created_at: string;
  status: "pending" | "assigned" | "in_review" | "responded" | "closed";
  name: string;
  designation: string;
  institution: string;
  department: string;
  email: string;
  phone?: string;
  service_type: ServiceType;
  case_summary: string;
  related_article_slug?: string;
  response_notes?: string;
  responded_at?: string;
}

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "expert-requests.json");

function readJsonStore(): ExpertRequestRecord[] {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "[]", "utf-8");
  return JSON.parse(fs.readFileSync(dataFile, "utf-8")) as ExpertRequestRecord[];
}

function writeJsonStore(requests: ExpertRequestRecord[]) {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(dataFile, JSON.stringify(requests, null, 2), "utf-8");
}

function rowToRecord(row: Record<string, unknown>): ExpertRequestRecord {
  return {
    id: String(row.id),
    reference_number: String(row.reference_number),
    created_at: new Date(row.created_at as string | Date).toISOString(),
    status: row.status as ExpertRequestRecord["status"],
    name: String(row.name),
    designation: String(row.designation),
    institution: String(row.institution),
    department: String(row.department),
    email: String(row.email),
    phone: row.phone ? String(row.phone) : undefined,
    service_type: row.service_type as ServiceType,
    case_summary: String(row.case_summary),
    related_article_slug: row.related_article_slug
      ? String(row.related_article_slug)
      : undefined,
    response_notes: row.response_notes ? String(row.response_notes) : undefined,
    responded_at: row.responded_at
      ? new Date(row.responded_at as string | Date).toISOString()
      : undefined,
  };
}

async function generateReferenceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `OM-EA-${year}-`;

  if (isDatabaseEnabled()) {
    await ensureSchema();
    const sql = getSql();
    const rows = await sql`
      SELECT COUNT(*)::int AS count FROM expert_requests
      WHERE reference_number LIKE ${prefix + "%"}
    `;
    const count = rows[0]?.count ?? 0;
    return `${prefix}${String(count + 1).padStart(5, "0")}`;
  }

  const requests = readJsonStore();
  const count = requests.filter((r) => r.reference_number.startsWith(prefix)).length;
  return `${prefix}${String(count + 1).padStart(5, "0")}`;
}

export async function createExpertRequest(
  data: Omit<ExpertRequestRecord, "id" | "reference_number" | "created_at" | "status">
): Promise<ExpertRequestRecord> {
  const id = crypto.randomUUID();
  const reference_number = await generateReferenceNumber();
  const created_at = new Date().toISOString();

  if (isDatabaseEnabled()) {
    await ensureSchema();
    const sql = getSql();
    await sql`
      INSERT INTO expert_requests (
        id, reference_number, created_at, status, name, designation, institution,
        department, email, phone, service_type, case_summary, related_article_slug
      ) VALUES (
        ${id}, ${reference_number}, ${created_at}::timestamptz, 'pending',
        ${data.name}, ${data.designation}, ${data.institution}, ${data.department},
        ${data.email}, ${data.phone ?? null}, ${data.service_type},
        ${data.case_summary}, ${data.related_article_slug ?? null}
      )
    `;
    return {
      id,
      reference_number,
      created_at,
      status: "pending",
      ...data,
    };
  }

  const requests = readJsonStore();
  warnIfMissingDatabaseInProduction();
  const record: ExpertRequestRecord = {
    id,
    reference_number,
    created_at,
    status: "pending",
    ...data,
  };
  requests.unshift(record);
  writeJsonStore(requests);
  return record;
}

export async function getExpertRequests(): Promise<ExpertRequestRecord[]> {
  if (isDatabaseEnabled()) {
    await ensureSchema();
    const sql = getSql();
    const rows = await sql`
      SELECT * FROM expert_requests ORDER BY created_at DESC
    `;
    return rows.map((row) => rowToRecord(row as Record<string, unknown>));
  }
  return readJsonStore();
}

export async function getExpertRequestByReference(
  ref: string
): Promise<ExpertRequestRecord | undefined> {
  if (isDatabaseEnabled()) {
    await ensureSchema();
    const sql = getSql();
    const rows = await sql`
      SELECT * FROM expert_requests WHERE reference_number = ${ref} LIMIT 1
    `;
    const row = rows[0];
    return row ? rowToRecord(row as Record<string, unknown>) : undefined;
  }
  return readJsonStore().find((r) => r.reference_number === ref);
}

export async function updateExpertRequest(
  id: string,
  updates: Partial<
    Pick<ExpertRequestRecord, "status" | "response_notes" | "responded_at">
  >
): Promise<ExpertRequestRecord | undefined> {
  const responded_at =
    updates.status === "responded" || updates.status === "closed"
      ? (updates.responded_at ?? new Date().toISOString())
      : updates.responded_at;

  if (isDatabaseEnabled()) {
    await ensureSchema();
    const sql = getSql();
    const rows = await sql`
      UPDATE expert_requests SET
        status = COALESCE(${updates.status ?? null}, status),
        response_notes = COALESCE(${updates.response_notes ?? null}, response_notes),
        responded_at = COALESCE(${responded_at ?? null}::timestamptz, responded_at)
      WHERE id = ${id}
      RETURNING *
    `;
    const row = rows[0];
    return row ? rowToRecord(row as Record<string, unknown>) : undefined;
  }

  const requests = readJsonStore();
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) return undefined;

  requests[index] = {
    ...requests[index],
    ...updates,
    ...(responded_at ? { responded_at } : {}),
  };
  writeJsonStore(requests);
  return requests[index];
}
