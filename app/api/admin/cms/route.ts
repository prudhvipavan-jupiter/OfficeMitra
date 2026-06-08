import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { logAdminAction } from "@/lib/admin-log";
import { isAdminAuthenticated } from "@/lib/auth";
import type { CmsContentType } from "@/lib/cms/types";
import { cmsCreate, cmsList } from "@/lib/cms/store";
import { syncCmsFromFiles, cmsStorageMode } from "@/lib/cms/seed";
import { CMS_TYPE_PATHS } from "@/lib/cms/types";

const VALID_TYPES: CmsContentType[] = [
  "article",
  "procedure",
  "update",
  "document",
  "template",
  "faq",
  "glossary",
];

function defaultAdminStatus(requested?: string): "draft" | "published" | "archived" {
  if (requested) return requested as "draft" | "published" | "archived";
  return process.env.CMS_AUTO_PUBLISH === "false" ? "draft" : "published";
}

function revalidateAllCms() {
  for (const type of VALID_TYPES) {
    revalidateForType(type);
  }
  revalidatePath("/sitemap.xml");
}

function revalidateForType(type: CmsContentType) {
  revalidatePath(CMS_TYPE_PATHS[type]);
  revalidatePath("/");
  revalidatePath("/search");
  if (type === "article") revalidatePath("/knowledge/[slug]", "page");
  if (type === "procedure") revalidatePath("/procedures/[slug]", "page");
  if (type === "update") revalidatePath("/updates/[slug]", "page");
}

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const type = request.nextUrl.searchParams.get("type") as CmsContentType | null;
  if (!type || !VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const items = await cmsList(type, { includeDeleted: true });
  return NextResponse.json({ items, storage: cmsStorageMode() });
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (body.action === "seed" || body.action === "sync") {
    const force = !!body.force;
    const onlyEmpty = body.action === "seed" && !force;
    const types = body.type ? ([body.type] as CmsContentType[]) : undefined;
    const counts = await syncCmsFromFiles({ types, force, onlyEmpty });
    await logAdminAction(body.action === "sync" ? "cms_sync" : "cms_seed", {
      force: String(force),
      type: body.type ?? "all",
    });
    revalidateAllCms();
    return NextResponse.json({ counts, storage: cmsStorageMode() });
  }

  const type = body.content_type as CmsContentType;
  if (!VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "Invalid content_type" }, { status: 400 });
  }

  const record = await cmsCreate({
    content_type: type,
    slug: body.slug ?? null,
    status: defaultAdminStatus(body.status),
    data: body.data ?? {},
    body: body.body ?? null,
  });

  await logAdminAction("cms_create", { id: record.id, type });
  revalidateForType(type);

  return NextResponse.json({ item: record });
}
