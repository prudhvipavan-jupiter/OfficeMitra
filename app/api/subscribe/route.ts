import { NextResponse } from "next/server";
import { subscribeToDigest } from "@/lib/digest-subscribe";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string };
  if (!body.email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const result = await subscribeToDigest(body.email);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
