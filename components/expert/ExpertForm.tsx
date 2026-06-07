"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import type { ServiceType } from "@/lib/expert-assistance";

const serviceTypeKeys: ServiceType[] = [
  "draft_review",
  "rule_clarification",
  "establishment_guidance",
  "finance_guidance",
  "document_review",
];

function ExpertFormInner() {
  const searchParams = useSearchParams();
  const relatedArticle = searchParams.get("article") ?? "";
  const t = useTranslations();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      designation: formData.get("designation"),
      institution: formData.get("institution"),
      department: formData.get("department"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      service_type: formData.get("service_type"),
      case_summary: formData.get("case_summary"),
      related_article_slug: formData.get("related_article_slug") || undefined,
      disclaimer_accepted: formData.get("disclaimer_accepted") === "on",
    };

    try {
      const res = await fetch("/api/expert-assistance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? t.expert.form.submissionFailed);
      }
      setReferenceNumber(data.reference_number);
      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.expert.form.submissionFailed);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-green-200 bg-green-50 p-8 text-center"
        role="status"
      >
        <h2 className="text-2xl font-bold text-green-800">
          {t.expert.form.successTitle}
        </h2>
        <p className="mt-3 text-green-700">{t.expert.form.referenceLabel}</p>
        <p className="mt-1 font-mono text-xl font-bold text-navy-900">
          {referenceNumber}
        </p>
        <p className="mt-4 text-sm text-green-700">{t.expert.form.successMessage}</p>
        <p className="mt-2 text-xs text-gray-600">{t.expert.form.successNote}</p>
        <Link
          href={`/expert-assistance/track?ref=${encodeURIComponent(referenceNumber)}`}
          className="mt-4 inline-block text-sm font-medium text-navy-700 underline"
        >
          {t.expert.form.trackRequest}
        </Link>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-navy-700 underline"
        >
          {t.expert.form.submitAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            {t.expert.form.fullName}
          </label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
          />
        </div>
        <div>
          <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
            {t.expert.form.designation}
          </label>
          <input
            id="designation"
            name="designation"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
            {t.expert.form.institution}
          </label>
          <input
            id="institution"
            name="institution"
            required
            placeholder={t.expert.form.institutionPlaceholder}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
          />
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            {t.expert.form.department}
          </label>
          <select
            id="department"
            name="department"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
          >
            <option value="Health Department">{t.expert.form.healthDept}</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {t.expert.form.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            {t.expert.form.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service_type" className="block text-sm font-medium text-gray-700">
          {t.expert.form.serviceType}
        </label>
        <select
          id="service_type"
          name="service_type"
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
        >
          {serviceTypeKeys.map((value) => (
            <option key={value} value={value}>
              {t.serviceTypes[value]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="case_summary" className="block text-sm font-medium text-gray-700">
          {t.expert.form.caseSummary}
        </label>
        <textarea
          id="case_summary"
          name="case_summary"
          required
          minLength={50}
          rows={5}
          placeholder={t.expert.form.casePlaceholder}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
        />
      </div>

      <input type="hidden" name="related_article_slug" value={relatedArticle} />

      <div className="rounded-lg border border-navy-100 bg-navy-50 p-4">
        <label className="flex items-start gap-3 text-sm text-navy-900">
          <input type="checkbox" name="disclaimer_accepted" required className="mt-1" />
          <span>{t.expert.form.disclaimer}</span>
        </label>
      </div>

      {error && (
        <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-navy-700 py-3 font-medium text-white transition hover:bg-navy-600 disabled:opacity-50 sm:w-auto sm:px-8"
      >
        {status === "loading" ? t.common.submitting : t.expert.form.submit}
      </button>
    </form>
  );
}

export function ExpertForm() {
  const t = useTranslations();

  return (
    <Suspense fallback={<p>{t.common.loading}</p>}>
      <ExpertFormInner />
    </Suspense>
  );
}
