"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { FormEvent, Suspense, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";

function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const t = useTranslations();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.search.placeholder}
          className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4"
          aria-label={t.search.title}
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-navy-700 px-5 py-2.5 text-white hover:bg-navy-600"
      >
        {t.common.search}
      </button>
    </form>
  );
}

export function GlobalSearchBar() {
  return (
    <Suspense fallback={null}>
      <SearchForm />
    </Suspense>
  );
}

interface SearchResultsProps {
  query: string;
  results: {
    articles: { slug: string; title: string; summary: string }[];
    procedures: { slug: string; title: string; summary: string }[];
    documents: { id: string; title: string; subject: string }[];
    templates: { id: string; title: string; description: string }[];
    updates: { slug: string; title: string; what_changed: string }[];
  };
}

export function SearchResults({ query, results }: SearchResultsProps) {
  const t = useTranslations();

  const sections = [
    {
      title: t.search.sections.articles,
      items: results.articles.map((a) => ({
        href: `/knowledge/${a.slug}`,
        title: a.title,
        summary: a.summary,
      })),
    },
    {
      title: t.search.sections.procedures,
      items: results.procedures.map((p) => ({
        href: `/procedures/${p.slug}`,
        title: p.title,
        summary: p.summary,
      })),
    },
    {
      title: t.search.sections.documents,
      items: results.documents.map((d) => ({
        href: `/documents?id=${d.id}`,
        title: d.title,
        summary: d.subject,
      })),
    },
    {
      title: t.search.sections.templates,
      items: results.templates.map((tpl) => ({
        href: `/templates`,
        title: tpl.title,
        summary: tpl.description,
      })),
    },
    {
      title: t.search.sections.updates,
      items: results.updates.map((u) => ({
        href: `/updates/${u.slug}`,
        title: u.title,
        summary: u.what_changed,
      })),
    },
  ];

  const total = sections.reduce((n, s) => n + s.items.length, 0);

  if (!query) {
    return (
      <p className="mt-8 text-gray-500">
        {t.search.emptyPrompt}{" "}
        <Link href="/" className="text-navy-700 underline">
          {t.search.homepageSearch}
        </Link>
        .
      </p>
    );
  }

  if (total === 0) {
    return (
      <p className="mt-8 text-gray-500">
        {t.search.noResults.replace("{query}", query)}{" "}
        <Link href="/expert-assistance" className="text-navy-700 underline">
          {t.search.requestExpert}
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="mt-10 space-y-10">
      {sections.map(
        (section) =>
          section.items.length > 0 && (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-navy-900">
                {section.title}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({section.items.length})
                </span>
              </h2>
              <ul className="mt-4 space-y-3">
                {section.items.map((item) => (
                  <li
                    key={item.href + item.title}
                    className="rounded-lg border border-navy-100 p-4 hover:bg-navy-50"
                  >
                    <Link
                      href={item.href}
                      className="font-medium text-navy-700 hover:underline"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-sm text-gray-600">{item.summary}</p>
                  </li>
                ))}
              </ul>
            </section>
          )
      )}
    </div>
  );
}
