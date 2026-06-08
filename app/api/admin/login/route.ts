import { NextRequest, NextResponse } from "next/server";
import { applyAdminSessionCookie, verifyAdminPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  return applyAdminSessionCookie(NextResponse.json({ success: true }));
}
