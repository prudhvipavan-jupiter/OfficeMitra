"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";

interface ExpertBannerProps {
  articleSlug?: string;
  fullWidth?: boolean;
}

export function ExpertBanner({ articleSlug, fullWidth }: ExpertBannerProps) {
  const t = useTranslations();

  const href = articleSlug
    ? `/expert-assistance?article=${articleSlug}`
    : "/expert-assistance";

  const inner = (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gold-100 via-gold-50 to-white p-8 ring-1 ring-gold-200/80 md:p-10">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gold-200/40 blur-2xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-700">
            Health Department
          </p>
          <h2 className="mt-2 text-2xl font-bold text-navy-900 md:text-3xl">
            {t.expertBanner.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-gray-700">
            {t.expertBanner.description}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            href={href}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold-600 px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-gold-500"
          >
            <MessageCircle className="h-5 w-5" />
            {t.expertBanner.cta}
          </Link>
          <Link
            href="/expert-assistance"
            className="inline-flex items-center justify-center rounded-xl border-2 border-navy-800 px-6 py-3.5 font-semibold text-navy-900 transition hover:bg-white"
          >
            {t.common.learnMore}
          </Link>
        </div>
      </div>
    </div>
  );

  if (fullWidth === false) return inner;

  return (
    <section className="bg-navy-900 py-16 md:py-20">
      <Container>{inner}</Container>
    </section>
  );
}
