import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "officemitra_admin";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const expected =
    process.env.ADMIN_SESSION_TOKEN ?? "dev-session-change-me";

  if (token !== expected) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
