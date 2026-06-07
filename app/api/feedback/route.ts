import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getArticleFeedback, recordArticleFeedback } from "@/lib/db/feedback";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  slug: z.string().min(1),
  helpful: z.boolean(),
});

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }
  return NextResponse.json({ feedback: await getArticleFeedback(slug) });
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limited = rateLimit(`feedback:${ip}`, 20, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const feedback = await recordArticleFeedback(parsed.data.slug, parsed.data.helpful);
  return NextResponse.json({ feedback });
}
