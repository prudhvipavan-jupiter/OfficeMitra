"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/types";

export function LanguageSwitcher({ compact }: { compact?: boolean }) {
  const { locale, dict, setLocale } = useLanguage();

  const options: { code: Locale; label: string }[] = [
    { code: "en", label: dict.language.english },
    { code: "te", label: dict.language.telugu },
  ];

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-md border border-navy-700 bg-navy-800 p-0.5",
        compact && "text-xs"
      )}
      role="group"
      aria-label={dict.language.label}
    >
      {!compact && (
        <Globe className="ml-1.5 h-3.5 w-3.5 shrink-0 text-navy-300" aria-hidden />
      )}
      {options.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={cn(
            "rounded px-2 py-1 font-medium transition",
            locale === code
              ? "bg-gold-600 text-white"
              : "text-navy-100 hover:text-white"
          )}
          aria-pressed={locale === code}
        >
          {code === "te" ? "తె" : "EN"}
          <span className="sr-only">{label}</span>
        </button>
      ))}
    </div>
  );
}
