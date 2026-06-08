"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, Home, Search, Users } from "lucide-react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const hiddenPrefixes = ["/admin"];

export function MobileQuickBar() {
  const pathname = usePathname();
  const t = useTranslations();

  if (hiddenPrefixes.some((p) => pathname.startsWith(p))) return null;

  const items = [
    { href: "/", label: t.nav.home, icon: Home, match: (p: string) => p === "/" },
    { href: "/search", label: t.nav.search, icon: Search, match: (p: string) => p.startsWith("/search") },
    { href: "/tools", label: t.nav.tools, icon: Calculator, match: (p: string) => p.startsWith("/tools") },
    {
      href: "/expert-assistance",
      label: t.nav.expertAssistance,
      icon: Users,
      match: (p: string) => p.startsWith("/expert-assistance"),
    },
  ];

  return (
    <nav
      className="mobile-quick-bar no-print lg:hidden"
      aria-label={t.a11y.mobileQuickNav}
    >
      {items.map(({ href, label, icon: Icon, match }) => {
        const active = match(pathname);
        return (
          <Link
            key={href}
            href={href}
            className={cn("mobile-quick-bar-item", active && "mobile-quick-bar-item-active")}
          >
            <Icon className="h-5 w-5" aria-hidden />
            <span>{label.split(" ")[0]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
