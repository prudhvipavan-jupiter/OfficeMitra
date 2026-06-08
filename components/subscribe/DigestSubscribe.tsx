"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { useTranslations } from "@/components/i18n/LanguageProvider";

export function DigestSubscribe() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStatus(res.ok ? "done" : "error");
    if (res.ok) setEmail("");
  }

  return (
    <section className="bg-navy-900 py-12">
      <div className="mx-auto max-w-xl px-4 text-center">
        <Mail className="mx-auto h-8 w-8 text-gold-500" />
        <h2 className="mt-3 text-xl font-bold text-white">{t.digest.title}</h2>
        <p className="mt-2 text-sm text-navy-200">{t.digest.subtitle}</p>
        {status === "done" ? (
          <p className="mt-4 text-sm font-medium text-gold-400">{t.digest.success}</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.digest.placeholder}
              className="flex-1 rounded-lg border-0 px-4 py-2.5 text-gray-900"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-lg bg-gold-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gold-500 disabled:opacity-50"
            >
              {status === "loading" ? t.common.submitting : t.digest.subscribe}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 text-sm text-red-300">{t.digest.error}</p>
        )}
      </div>
    </section>
  );
}
