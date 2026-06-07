"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import type { GlossaryTerm } from "@/lib/glossary";

interface GlossarySearchProps {
  terms: GlossaryTerm[];
}

export function GlossarySearch({ terms }: GlossarySearchProps) {
  const t = useTranslations();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return terms;
    return terms.filter(
      (term) =>
        term.term.toLowerCase().includes(q) ||
        term.definition.toLowerCase().includes(q) ||
        term.telugu?.includes(q) ||
        term.category.toLowerCase().includes(q)
    );
  }, [terms, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, GlossaryTerm[]>();
    filtered.forEach((term) => {
      const list = map.get(term.category) ?? [];
      list.push(term);
      map.set(term.category, list);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.glossary.searchPlaceholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
      />

      {filtered.length === 0 ? (
        <p className="mt-8 text-gray-500">{t.common.noResults}</p>
      ) : (
        <div className="mt-8 space-y-8">
          {grouped.map(([category, categoryTerms]) => (
            <section key={category}>
              <h2 className="text-lg font-semibold text-navy-900">{category}</h2>
              <dl className="mt-4 space-y-4">
                {categoryTerms.map((term) => (
                  <div
                    key={term.term}
                    className="rounded-xl border border-navy-100 bg-white p-4 shadow-sm"
                  >
                    <dt className="font-bold text-navy-900">
                      {term.term}
                      {term.telugu && (
                        <span className="ml-2 font-normal text-navy-600">({term.telugu})</span>
                      )}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                      {term.definition}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
