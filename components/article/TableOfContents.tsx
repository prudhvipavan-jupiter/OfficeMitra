"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "@/components/i18n/LanguageProvider";

interface TableOfContentsProps {
  headings: { id: string; text: string }[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const t = useTranslations();

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label={t.toc.label}
      className="sticky top-24 rounded-xl border border-navy-100 bg-navy-50 p-5"
    >
      <p className="text-sm font-semibold text-navy-900">{t.toc.label}</p>
      <ul className="mt-3 space-y-2">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "block text-sm text-gray-600 transition hover:text-navy-700"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
