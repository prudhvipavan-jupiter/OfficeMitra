"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import type { ServiceType } from "@/lib/expert-assistance";

function TrackInner() {
  const searchParams = useSearchParams();
  const refParam = searchParams.get("ref") ?? "";
  const t = useTranslations();
  const [ref, setRef] = useState(refParam);
  const [result, setResult] = useState<{
    reference_number: string;
    status: string;
    created_at: string;
    service_type: string;
    responded_at?: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (refParam) lookup(refParam);
  }, [refParam]);

  async function lookup(reference: string) {
    setLoading(true);
    setError("");
    setResult(null);
    const res = await fetch(
      `/api/expert-assistance/track?ref=${encodeURIComponent(reference)}`
    );
    if (res.ok) {
      setResult(await res.json());
    } else {
      setError(t.expert.trackError);
    }
    setLoading(false);
  }

  return (
    <Container narrow className="py-10">
      <h1 className="text-3xl font-bold text-navy-900">{t.expert.trackTitle}</h1>
      <p className="mt-2 text-gray-600">{t.expert.trackSubtitle}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          lookup(ref.trim());
        }}
        className="mt-6 flex gap-2"
      >
        <input
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          placeholder="OM-EA-2026-00001"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 font-mono"
          aria-label="Reference number"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-navy-700 px-5 py-2 text-white hover:bg-navy-600"
        >
          {t.common.track}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {result && (
        <div className="mt-8 rounded-xl border border-navy-100 bg-navy-50 p-6">
          <p className="font-mono text-lg font-bold text-navy-900">
            {result.reference_number}
          </p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">{t.expert.status}</dt>
              <dd className="font-medium capitalize text-navy-900">
                {result.status.replace("_", " ")}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">{t.expert.service}</dt>
              <dd className="text-navy-900">
                {t.serviceTypes[result.service_type as ServiceType] ??
                  result.service_type}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">{t.expert.submitted}</dt>
              <dd className="text-navy-900">
                {new Date(result.created_at).toLocaleDateString("en-IN")}
              </dd>
            </div>
            {result.responded_at && (
              <div className="flex justify-between">
                <dt className="text-gray-600">{t.expert.responded}</dt>
                <dd className="text-navy-900">
                  {new Date(result.responded_at).toLocaleDateString("en-IN")}
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}

      <Link
        href="/expert-assistance"
        className="mt-8 inline-block text-sm text-navy-700 hover:underline"
      >
        {t.expert.submitNew}
      </Link>
    </Container>
  );
}

export default function TrackPage() {
  const t = useTranslations();

  return (
    <Suspense fallback={<Container className="py-10">{t.common.loading}</Container>}>
      <TrackInner />
    </Suspense>
  );
}
