import { NextResponse } from "next/server";
import {
  getDiscussionById,
  incrementDiscussionViews,
} from "@/lib/db/discussions";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const discussion = await getDiscussionById(id);
  if (!discussion || discussion.status !== "published") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await incrementDiscussionViews(id);
  return NextResponse.json({ discussion });
}
