import { cookies } from "next/headers";

const COOKIE_NAME = "officemitra_admin";

function sessionToken() {
  return process.env.ADMIN_SESSION_TOKEN ?? "dev-session-change-me";
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === sessionToken();
}

export function verifyAdminPassword(password: string) {
  return password === (process.env.ADMIN_PASSWORD ?? "officemitra2026");
}

export function getSessionTokenForMiddleware() {
  return sessionToken();
}
