import { NextRequest, NextResponse } from "next/server";
import { setAdminSession, verifyAdminPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  await setAdminSession();
  return NextResponse.json({ success: true });
}
