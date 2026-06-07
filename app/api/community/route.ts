import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createDiscussion, getDiscussions } from "@/lib/db/discussions";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const postSchema = z.object({
  author_name: z.string().min(2),
  designation: z.string().min(1),
  institution: z.string().min(1),
  category: z.enum([
    "establishment",
    "finance",
    "leave",
    "apgli",
    "gpf",
    "treasury",
    "service-rules",
    "general",
  ]),
  title: z.string().min(10).max(200),
  body: z.string().min(30).max(3000),
});

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category") ?? undefined;
  const discussions = await getDiscussions({ status: "published", category });
  return NextResponse.json({
    discussions: discussions.map((d) => ({
      id: d.id,
      created_at: d.created_at,
      author_name: d.author_name,
      designation: d.designation,
      institution: d.institution,
      category: d.category,
      title: d.title,
      body: d.body.slice(0, 200) + (d.body.length > 200 ? "…" : ""),
      reply_count: d.replies.length,
      views: d.views,
    })),
  });
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`community:${ip}`, 3, 60 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many posts. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = postSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const record = await createDiscussion(parsed.data);
    return NextResponse.json({
      success: true,
      id: record.id,
      message:
        "Question submitted for moderation. It will appear publicly once reviewed.",
    });
  } catch (error) {
    console.error("[Community] POST error:", error);
    return NextResponse.json({ error: "Failed to submit question" }, { status: 500 });
  }
}
