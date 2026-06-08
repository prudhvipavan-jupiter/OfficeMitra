"use client";

import { FormEvent, useState } from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/metadata";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const password = String(new FormData(e.currentTarget).get("password") ?? "").trim();
    if (!password) {
      setError("Enter your password");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.assign("/admin");
        return;
      }

      setError(res.status === 401 ? "Invalid password" : "Sign in failed. Restart the dev server and try again.");
    } catch {
      setError("Could not reach the server. Check that npm run dev is running.");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-navy-950">
      <Container narrow className="w-full max-w-md">
        <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-lg dark:border-navy-700 dark:bg-navy-900">
          <div className="mb-6 text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-600 text-sm font-bold text-white">
              OM
            </span>
            <h1 className="mt-4 text-2xl font-bold text-navy-900 dark:text-white">
              {siteConfig.name} Admin
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-navy-300">
              Sign in to manage requests and community moderation.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-navy-200">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="input-field mt-1"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-navy-700 px-6 py-2.5 font-medium text-white hover:bg-navy-600 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
