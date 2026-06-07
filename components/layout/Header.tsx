"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useTranslations } from "@/components/i18n/LanguageProvider";
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
    { href: "/expert-assistance", label: t.nav.expertAssistance },
  ];

  const moreLinks = [
    { href: "/documents", label: t.nav.documents },
    { href: "/templates", label: t.nav.templates },
    { href: "/community", label: t.nav.community },
    { href: "/faq", label: t.nav.faq },
    { href: "/glossary", label: t.nav.glossary },
    { href: "/tools", label: t.nav.tools },
    { href: "/official-links", label: t.nav.officialLinks },
    { href: "/departments/health", label: t.departments.health.title },
  ];

  const allLinks = [{ href: "/", label: t.nav.home }, ...primaryLinks, ...moreLinks];

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

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
    <header className="sticky top-0 z-50 border-b border-navy-800/80 bg-navy-900/95 shadow-lg backdrop-blur-md">
      <Container>
        <div className="flex h-[4.25rem] items-center justify-between gap-3">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label={`${siteConfig.name} home`}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-600 text-sm font-bold text-white shadow-md"
              aria-hidden
            >
              OM
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-base font-bold tracking-tight text-white sm:text-lg">
                {siteConfig.name}
              </span>
              <span className="hidden text-[10px] font-medium tracking-wider text-gold-500 sm:block">
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
                More
                <ChevronDown
                  className={cn("h-4 w-4 transition", moreOpen && "rotate-180")}
                />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-navy-700 bg-navy-900 py-2 shadow-xl">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "block px-4 py-2.5 text-sm transition",
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

          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher compact />

            <Link
              href="/search"
              className="rounded-lg p-2.5 text-navy-100 transition hover:bg-navy-800 hover:text-white"
              aria-label={t.nav.search}
            >
              <Search className="h-5 w-5" />
            </Link>

            <span
              className="hidden items-center gap-1 rounded-lg border border-navy-700/80 bg-navy-800/60 px-2.5 py-1.5 text-xs text-navy-100 xl:inline-flex"
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
              className="rounded-lg p-2.5 text-white lg:hidden"
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
          className="max-h-[70vh] overflow-y-auto border-t border-navy-800 bg-navy-900 lg:hidden"
          aria-label="Mobile navigation"
        >
          <Container className="py-3">
            <ul className="space-y-1">
              {allLinks.map((link) => (
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
          </Container>
        </nav>
      )}
    </header>
  );
}
