"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";

const categories = [
  "general",
  "establishment",
  "finance",
  "leave",
  "apgli",
  "gpf",
  "treasury",
  "service-rules",
] as const;

interface CommunityFormProps {
  onSuccess?: () => void;
}

export function CommunityForm({ onSuccess }: CommunityFormProps) {
  const t = useTranslations();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      author_name: String(form.get("author_name")),
      designation: String(form.get("designation")),
      institution: String(form.get("institution")),
      category: String(form.get("category")),
      title: String(form.get("title")),
      body: String(form.get("body")),
    };

    const res = await fetch("/api/community", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? t.community.form.error);
      setStatus("error");
      return;
    }

    setStatus("success");
    e.currentTarget.reset();
    onSuccess?.();
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-800">{t.community.form.successTitle}</p>
        <p className="mt-2 text-sm text-green-700">{t.community.form.successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-navy-700 underline"
        >
          {t.community.form.askAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-navy-900">{t.community.form.title}</h2>
      <p className="text-sm text-gray-600">{t.community.form.subtitle}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="author_name" className="block text-sm font-medium text-gray-700">
            {t.community.form.name}
          </label>
          <input
            id="author_name"
            name="author_name"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
            {t.community.form.designation}
          </label>
          <input
            id="designation"
            name="designation"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
          {t.community.form.institution}
        </label>
        <input
          id="institution"
          name="institution"
          required
          placeholder={t.community.form.institutionPlaceholder}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          {t.community.form.category}
        </label>
        <select
          id="category"
          name="category"
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "general"
                ? t.community.categories.general
                : t.categories[cat as keyof typeof t.categories]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          {t.community.form.questionTitle}
        </label>
        <input
          id="title"
          name="title"
          required
          minLength={10}
          maxLength={200}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
          {t.community.form.details}
        </label>
        <textarea
          id="body"
          name="body"
          required
          minLength={30}
          rows={5}
          placeholder={t.community.form.detailsPlaceholder}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-navy-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-600 disabled:opacity-50"
      >
        {status === "loading" ? t.common.submitting : t.community.form.submit}
      </button>
    </form>
  );
}
