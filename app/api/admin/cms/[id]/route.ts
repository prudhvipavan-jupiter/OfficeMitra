import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { logAdminAction } from "@/lib/admin-log";
import { isAdminAuthenticated } from "@/lib/auth";
import { cmsDelete, cmsGet, cmsSaveFile, cmsUpdate } from "@/lib/cms/store";
import { CMS_TYPE_PATHS } from "@/lib/cms/types";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const item = await cmsGet(id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await cmsGet(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const file = form.get("file") as File | null;
    const field = String(form.get("field") ?? "file");
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    await cmsSaveFile(id, field, file.name, file.type || "application/octet-stream", buffer);

    const data = { ...existing.data, [field === "file" ? "file" : field]: `/api/cms/file/${id}/${field}` };
    const item = await cmsUpdate(id, { data });
    await logAdminAction("cms_upload", { id, field });
    revalidatePath(CMS_TYPE_PATHS[existing.content_type]);
    return NextResponse.json({ item });
  }

  const body = await request.json();
  const item = await cmsUpdate(id, {
    slug: body.slug,
    status: body.status,
    data: body.data,
    body: body.body,
  });

  await logAdminAction("cms_update", { id, status: body.status ?? existing.status });
  revalidatePath(CMS_TYPE_PATHS[existing.content_type]);
  revalidatePath("/");

  return NextResponse.json({ item });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await cmsGet(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await cmsDelete(id);
  await logAdminAction("cms_delete", { id, type: existing.content_type });
  revalidatePath(CMS_TYPE_PATHS[existing.content_type]);
  revalidatePath("/");

  return NextResponse.json({ success: true });
}
