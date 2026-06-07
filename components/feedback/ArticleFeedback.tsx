"use client";

import { useEffect, useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useTranslations } from "@/components/i18n/LanguageProvider";

interface ArticleFeedbackProps {
  slug: string;
}

export function ArticleFeedback({ slug }: ArticleFeedbackProps) {
  const t = useTranslations();
  const [counts, setCounts] = useState({ helpful: 0, not_helpful: 0 });
  const [voted, setVoted] = useState<"helpful" | "not_helpful" | null>(null);

  useEffect(() => {
    const key = `om-feedback-${slug}`;
    const stored = localStorage.getItem(key) as "helpful" | "not_helpful" | null;
    if (stored) setVoted(stored);

    fetch(`/api/feedback?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((d) => setCounts(d.feedback ?? { helpful: 0, not_helpful: 0 }))
      .catch(() => {});
  }, [slug]);

  async function vote(helpful: boolean) {
    if (voted) return;
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, helpful }),
    });
    if (res.ok) {
      const data = await res.json();
      setCounts(data.feedback);
      const key = `om-feedback-${slug}`;
      localStorage.setItem(key, helpful ? "helpful" : "not_helpful");
      setVoted(helpful ? "helpful" : "not_helpful");
    }
  }

  return (
    <div className="rounded-xl border border-navy-100 bg-navy-50 px-5 py-4">
      <p className="text-sm font-medium text-navy-900">{t.feedback.question}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => vote(true)}
          disabled={!!voted}
          className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition ${
            voted === "helpful"
              ? "border-green-300 bg-green-100 text-green-800"
              : "border-navy-200 bg-white text-navy-700 hover:border-green-400"
          }`}
        >
          <ThumbsUp className="h-4 w-4" />
          {t.feedback.yes} ({counts.helpful})
        </button>
        <button
          type="button"
          onClick={() => vote(false)}
          disabled={!!voted}
          className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition ${
            voted === "not_helpful"
              ? "border-red-300 bg-red-100 text-red-800"
              : "border-navy-200 bg-white text-navy-700 hover:border-red-400"
          }`}
        >
          <ThumbsDown className="h-4 w-4" />
          {t.feedback.no} ({counts.not_helpful})
        </button>
        {voted && (
          <span className="text-xs text-gray-500">{t.feedback.thanks}</span>
        )}
      </div>
    </div>
  );
}
