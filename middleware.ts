import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSessionToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  const next = () => NextResponse.next({ request: { headers: requestHeaders } });

  if (!pathname.startsWith("/admin")) {
    return next();
  }

  if (pathname === "/admin/login") {
    return next();
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (token !== getAdminSessionToken()) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
