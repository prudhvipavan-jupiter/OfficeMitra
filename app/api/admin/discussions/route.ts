import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  getDiscussions,
  updateDiscussion,
} from "@/lib/db/discussions";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ discussions: await getDiscussions() });
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, status, reply_body, reply_author } = body;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const updates: Parameters<typeof updateDiscussion>[1] = {};
  if (status) updates.status = status;
  if (reply_body && reply_author) {
    updates.add_reply = {
      author: reply_author,
      body: reply_body,
      is_official: true,
    };
  }

  const updated = await updateDiscussion(id, updates);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ discussion: updated });
}
