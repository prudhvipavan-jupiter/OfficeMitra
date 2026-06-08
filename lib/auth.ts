import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "officemitra_admin";

export function getAdminSessionToken() {
  return process.env.ADMIN_SESSION_TOKEN ?? "dev-session-change-me";
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "officemitra2026";
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24,
  path: "/",
};

export function applyAdminSessionCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE_NAME, getAdminSessionToken(), cookieOptions);
  return response;
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, getAdminSessionToken(), cookieOptions);
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === getAdminSessionToken();
}

export function verifyAdminPassword(password: string) {
  const input = password.trim();
  return input.length > 0 && input === getAdminPassword();
}

export function getSessionTokenForMiddleware() {
  return getAdminSessionToken();
}
