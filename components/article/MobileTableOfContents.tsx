"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";

interface MobileTableOfContentsProps {
  headings: { id: string; text: string }[];
}

export function MobileTableOfContents({ headings }: MobileTableOfContentsProps) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  if (headings.length === 0) return null;

  return (
    <nav aria-label={t.toc.label} className="mb-6 lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border border-navy-100 bg-navy-50 px-4 py-3 text-left text-sm font-semibold text-navy-900"
        aria-expanded={open}
      >
        {t.toc.label}
        <ChevronDown
          className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open && (
        <ul className="mt-2 space-y-1 rounded-xl border border-navy-100 bg-white p-3 shadow-sm">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-navy-50 hover:text-navy-800"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
