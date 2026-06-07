import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  deleteIntelSource,
  getIntelSources,
  isIntelligenceEnabled,
  logIntelActivity,
  upsertIntelSource,
} from "@/lib/intelligence/store";
import type { IntelCheckMethod } from "@/lib/intelligence/types";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ sources: await getIntelSources() });
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isIntelligenceEnabled()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const body = await request.json();
  const id = crypto.randomUUID();

  await upsertIntelSource({
    id,
    name: body.name,
    url: body.url,
    category: body.category ?? "General",
    active: body.active ?? true,
    check_method: (body.check_method ?? "html_links") as IntelCheckMethod,
    feed_url: body.feed_url ?? null,
    link_selector: body.link_selector ?? "a[href]",
    config: body.config ?? {},
  });

  await logIntelActivity("source_added", `Source added: ${body.name}`, { source_id: id });
  return NextResponse.json({ id });
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await upsertIntelSource({
    id: body.id,
    name: body.name,
    url: body.url,
    category: body.category,
    active: body.active,
    check_method: body.check_method,
    feed_url: body.feed_url,
    link_selector: body.link_selector,
    config: body.config ?? {},
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await deleteIntelSource(id);
  await logIntelActivity("source_removed", `Source removed: ${id}`, { source_id: id });
  return NextResponse.json({ success: true });
}
