"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import type { FaqItem } from "@/lib/faq";

interface FaqSearchProps {
  items: FaqItem[];
  locale: "en" | "te";
}

export function FaqSearch({ items, locale }: FaqSearchProps) {
  const t = useTranslations();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return items.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.question_te?.includes(q)
      );
    });
  }, [items, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.faq.searchPlaceholder}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2.5"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? t.common.all : cat}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 space-y-4">
        {filtered.length === 0 ? (
          <p className="text-gray-500">{t.common.noResults}</p>
        ) : (
          filtered.map((item) => (
            <details
              key={item.id}
              className="group rounded-xl border border-navy-100 bg-white shadow-sm"
            >
              <summary className="cursor-pointer list-none px-5 py-4 font-medium text-navy-900 marker:content-none">
                <span className="flex items-start justify-between gap-4">
                  <span>
                    <span className="mr-2 rounded bg-navy-100 px-2 py-0.5 text-xs font-normal text-navy-700">
                      {item.category}
                    </span>
                    {locale === "te" && item.question_te ? item.question_te : item.question}
                  </span>
                  <span className="shrink-0 text-gold-600 group-open:rotate-180">▼</span>
                </span>
              </summary>
              <div className="border-t border-navy-50 px-5 py-4 text-sm leading-relaxed text-gray-700">
                {locale === "te" && item.answer_te ? item.answer_te : item.answer}
                {item.related_links && item.related_links.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {item.related_links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-sm font-medium text-navy-700 underline hover:text-gold-700"
                        >
                          {link.label} →
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          ))
        )}
      </div>
    </div>
  );
}
