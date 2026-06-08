"use client";



import Link from "next/link";

import { useRouter } from "next/navigation";

import { AlertTriangle, Search, ShieldCheck } from "lucide-react";

import { FormEvent, useState } from "react";

import { useTranslations } from "@/components/i18n/LanguageProvider";

import { Container } from "@/components/ui/Container";

import { popularSearches } from "@/lib/constants";



export function HeroSearch() {

  const router = useRouter();

  const [query, setQuery] = useState("");

  const t = useTranslations();



  function handleSubmit(e: FormEvent) {

    e.preventDefault();

    const q = query.trim();

    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);

  }



  return (

    <section className="hero-gradient relative overflow-hidden px-4 py-14 text-white md:py-16 lg:py-20">

      <div

        className="pointer-events-none absolute inset-0 opacity-[0.04]"

        style={{

          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,

        }}

        aria-hidden

      />



      <Container narrow className="relative text-center">

        <div className="inline-flex items-center gap-2 rounded-full border border-gold-600/40 bg-navy-800/50 px-4 py-1.5 text-xs font-medium text-gold-200 backdrop-blur-sm">

          <ShieldCheck className="h-3.5 w-3.5 text-gold-500" />

          Andhra Pradesh Government Staff Platform

        </div>



        <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-[2.75rem]">

          {t.hero.title}

        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-100/90 md:text-lg">

          {t.hero.subtitle}

        </p>



        <Link

          href="/official-links"

          className="mx-auto mt-5 inline-flex max-w-xl items-center gap-2 rounded-lg border border-gold-500/35 bg-gold-600/10 px-4 py-2 text-left text-sm text-gold-100 transition hover:border-gold-400/50 hover:bg-gold-600/20"

        >

          <AlertTriangle className="h-4 w-4 shrink-0 text-gold-400" aria-hidden />

          <span>{t.alerts.verifyGo}</span>

        </Link>



        <form

          onSubmit={handleSubmit}

          className="mx-auto mt-8 max-w-2xl"

          role="search"

        >

          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">

            <div className="relative flex-1">

              <Search

                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"

                aria-hidden

              />

              <input

                type="search"

                value={query}

                onChange={(e) => setQuery(e.target.value)}

                placeholder={t.hero.placeholder}

                aria-label={t.common.search}

                className="hero-search-input w-full rounded-xl border-0 bg-white py-3.5 pl-12 pr-4 text-base text-gray-900 shadow-xl ring-1 ring-white/10 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 sm:py-4"

              />

            </div>

            <button

              type="submit"

              className="rounded-xl bg-gold-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-gold-500 active:scale-[0.98] sm:py-4"

            >

              {t.common.search}

            </button>

          </div>

        </form>



        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">

          <span className="w-full text-sm text-navy-200 sm:w-auto">

            {t.hero.popularSearches}

          </span>

          {popularSearches.map((term) => (

            <Link

              key={term}

              href={`/search?q=${encodeURIComponent(term)}`}

              className="rounded-full border border-navy-600/80 bg-navy-800/40 px-3.5 py-1.5 text-sm text-navy-100 backdrop-blur-sm transition hover:border-gold-500/60 hover:bg-navy-800 hover:text-white"

            >

              {term}

            </Link>

          ))}

        </div>



        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">

          <Link

            href="/tools"

            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"

          >

            {t.hero.quickTools}

          </Link>

          <Link

            href="/expert-assistance"

            className="rounded-full border border-gold-500/50 bg-gold-600/90 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gold-500"

          >

            {t.hero.quickExpert}

          </Link>

          <Link

            href="/community"

            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"

          >

            {t.hero.quickCommunity}

          </Link>

        </div>

      </Container>

    </section>

  );

}


