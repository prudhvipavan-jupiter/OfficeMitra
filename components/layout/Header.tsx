"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const t = useTranslations();

  const primaryLinks = [
    { href: "/knowledge", label: t.nav.knowledge },
    { href: "/procedures", label: t.nav.procedures },
    { href: "/updates", label: t.nav.updates },
  ];

  const resourceLinks = [
    { href: "/documents", label: t.nav.documents },
    { href: "/templates", label: t.nav.templates },
    { href: "/community", label: t.nav.community },
    { href: "/faq", label: t.nav.faq },
    { href: "/glossary", label: t.nav.glossary },
    { href: "/tools", label: t.nav.tools },
    { href: "/official-links", label: t.nav.officialLinks },
    { href: "/expert-assistance", label: t.nav.expertAssistance },
  ];

  const departmentLinks = [
    { href: "/departments/health", label: t.departments.health.title },
    { href: "/departments/finance", label: t.departments.finance.title },
    { href: "/departments/education", label: t.departments.education.title },
  ];

  const moreLinks = [...resourceLinks, ...departmentLinks];

  const mobileSections = [
    { title: t.nav.main, links: [{ href: "/", label: t.nav.home }, ...primaryLinks] },
    { title: t.nav.resources, links: resourceLinks },
    { title: t.nav.departments, links: departmentLinks },
  ];

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="site-header sticky top-0 z-50 border-b border-navy-800/80 bg-navy-900/95 shadow-lg backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-2 sm:gap-3 lg:h-[4.25rem]">
          <Link
            href="/"
            className="flex min-w-0 shrink items-center gap-2.5 sm:gap-3"
            aria-label={`${siteConfig.name} home`}
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-600 text-sm font-bold text-white shadow-md sm:h-10 sm:w-10"
              aria-hidden
            >
              OM
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-base font-bold tracking-tight text-white sm:text-lg">
                {siteConfig.name}
              </span>
              <span className="hidden text-[10px] font-medium tracking-wider text-gold-500 md:block">
                {t.meta.tagline}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive(link.href)
                    ? "bg-navy-800 text-white"
                    : "text-navy-100 hover:bg-navy-800/80 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen(!moreOpen)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition",
                  moreLinks.some((l) => isActive(l.href))
                    ? "bg-navy-800 text-white"
                    : "text-navy-100 hover:bg-navy-800/80 hover:text-white"
                )}
                aria-expanded={moreOpen}
              >
                {t.nav.more}
                <ChevronDown
                  className={cn("h-4 w-4 transition", moreOpen && "rotate-180")}
                />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-navy-700 bg-navy-900 py-2 shadow-xl">
                  <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-navy-400">
                    {t.nav.resources}
                  </p>
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "block px-4 py-2 text-sm transition",
                        isActive(link.href)
                          ? "bg-navy-800 text-white"
                          : "text-navy-100 hover:bg-navy-800 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <p className="mt-2 border-t border-navy-800 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-navy-400">
                    {t.nav.departments}
                  </p>
                  {departmentLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "block px-4 py-2 text-sm transition",
                        isActive(link.href)
                          ? "bg-navy-800 text-white"
                          : "text-navy-100 hover:bg-navy-800 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <div className="flex items-center gap-0.5 rounded-lg border border-navy-700/80 bg-navy-800/50 p-0.5">
              <ThemeToggle
                compact
                className="border-0 bg-transparent p-1.5 hover:bg-navy-700/80 sm:p-2"
              />
              <LanguageSwitcher compact className="border-0 bg-transparent p-0" />
            </div>

            <Link
              href="/search"
              className="hidden rounded-lg p-2 text-navy-100 transition hover:bg-navy-800 hover:text-white lg:inline-flex"
              aria-label={t.nav.search}
            >
              <Search className="h-5 w-5" />
            </Link>

            <Link
              href="/expert-assistance"
              className="hidden rounded-lg bg-gold-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-gold-500 sm:inline-flex"
            >
              {t.hero.quickExpert}
            </Link>

            <span
              className="hidden items-center gap-1 rounded-lg border border-navy-700/80 bg-navy-800/60 px-2.5 py-1.5 text-xs text-navy-100 2xl:inline-flex"
              title="Mitra AI coming in V3"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold-500" />
              {t.nav.askMitra}
              <span className="ml-0.5 rounded bg-navy-700 px-1.5 py-0.5 text-[10px] uppercase">
                {t.nav.soon}
              </span>
            </span>

            <button
              type="button"
              className="rounded-lg p-2 text-white lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </Container>

      {mobileOpen && (
        <nav
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-navy-800 bg-navy-900 lg:hidden"
          aria-label="Mobile navigation"
        >
          <Container className="py-4">
            <Link
              href="/expert-assistance"
              onClick={() => setMobileOpen(false)}
              className="mb-5 flex items-center justify-center rounded-xl bg-gold-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gold-500"
            >
              {t.nav.expertAssistance}
            </Link>

            {mobileSections.map((section) => (
              <div key={section.title} className="mb-5 last:mb-0">
                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-navy-400">
                  {section.title}
                </p>
                <ul className="space-y-1">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block rounded-lg px-3 py-2.5 text-sm font-medium",
                          isActive(link.href)
                            ? "bg-navy-800 text-white"
                            : "text-navy-100 hover:bg-navy-800"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
