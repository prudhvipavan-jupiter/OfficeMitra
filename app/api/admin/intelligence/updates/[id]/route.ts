import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  getIntelUpdateById,
  isIntelligenceEnabled,
  logIntelActivity,
  publishIntelUpdate,
  updateIntelUpdate,
} from "@/lib/intelligence/store";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isIntelligenceEnabled()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { id } = await params;
  const update = await getIntelUpdateById(id);
  if (!update) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ update });
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isIntelligenceEnabled()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { id } = await params;
  const body = await request.json();
  const action = body.action as string | undefined;

  if (action === "approve") {
    const updated = await updateIntelUpdate(id, {
      status: "APPROVED",
      reviewed_by: "admin",
      reviewed_at: new Date().toISOString(),
      ...body.fields,
    });
    await logIntelActivity("approved", `Update approved: ${updated?.ai_title ?? id}`, {
      update_id: id,
    });
    return NextResponse.json({ update: updated });
  }

  if (action === "reject") {
    const updated = await updateIntelUpdate(id, {
      status: "REJECTED",
      admin_notes: body.admin_notes ?? "",
      reviewed_by: "admin",
      reviewed_at: new Date().toISOString(),
    });
    await logIntelActivity("rejected", `Update rejected: ${id}`, { update_id: id });
    return NextResponse.json({ update: updated });
  }

  const updated = await updateIntelUpdate(id, body.fields ?? body);
  return NextResponse.json({ update: updated });
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  if (body.action === "publish") {
    const published = await publishIntelUpdate(id, "admin");
    if (!published) {
      return NextResponse.json(
        { error: "Only APPROVED updates can be published" },
        { status: 400 }
      );
    }
    await logIntelActivity("published", `Published: ${published.ai_title}`, {
      update_id: id,
      slug: published.published_slug,
    });
    return NextResponse.json({ update: published });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
