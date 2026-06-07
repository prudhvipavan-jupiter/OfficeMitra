"use client";

import { ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import {
  filterPortals,
  officialPortals,
  portalCategoryLabels,
  type PortalCategory,
} from "@/lib/official-links";

export function OfficialLinksSearch() {
  const t = useTranslations();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PortalCategory | "">("");

  const filtered = useMemo(
    () => filterPortals(query, category || undefined),
    [query, category]
  );

  const grouped = useMemo(() => {
    const categories = category
      ? [category]
      : (Object.keys(portalCategoryLabels) as PortalCategory[]);

    return categories
      .map((cat) => ({
        category: cat,
        portals: filtered.filter((p) => p.category === cat),
      }))
      .filter((group) => group.portals.length > 0);
  }, [filtered, category]);

  const countLabel = t.officialLinks.count
    .replace("{found}", String(filtered.length))
    .replace("{total}", String(officialPortals.length));

  return (
    <div>
      <div className="mb-8 grid gap-4 rounded-xl border border-navy-100 bg-navy-50 p-5 sm:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.officialLinks.searchPlaceholder}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm"
            aria-label={t.common.search}
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as PortalCategory | "")}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm"
          aria-label={t.officialLinks.allCategories}
        >
          <option value="">{t.officialLinks.allCategories}</option>
          {(Object.keys(portalCategoryLabels) as PortalCategory[]).map((cat) => (
            <option key={cat} value={cat}>
              {portalCategoryLabels[cat].en}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-6 text-sm text-gray-600">{countLabel}</p>

      <div className="space-y-10">
        {grouped.map(({ category: cat, portals }) => (
          <section key={cat}>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-navy-900">
                {portalCategoryLabels[cat].en}
              </h2>
              <p className="text-sm text-navy-600">{portalCategoryLabels[cat].te}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {portals.map((portal) => (
                <li key={portal.id}>
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-xl border border-navy-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-navy-900 group-hover:text-navy-700">
                          {portal.name}
                        </p>
                        {portal.teluguName && (
                          <p className="mt-0.5 text-xs text-navy-600">
                            {portal.teluguName}
                          </p>
                        )}
                      </div>
                      <ExternalLink className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-navy-700" />
                    </div>
                    <p className="mt-2 flex-1 text-sm text-gray-600">
                      {portal.description}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-xl border border-navy-100 bg-navy-50 p-8 text-center text-gray-600">
          {t.officialLinks.empty}
        </p>
      )}

      <p className="mt-10 rounded-lg border border-gold-200 bg-gold-50 px-4 py-3 text-sm text-navy-800">
        {t.officialLinks.disclaimer}
      </p>
    </div>
  );
}
