"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, FolderKanban, LayoutDashboard, LogOut } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/metadata";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/content", label: "Content", icon: FolderKanban, exact: false },
  { href: "/admin/intelligence", label: "Intelligence", icon: Brain, exact: false },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <>{children}</>;
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-950">
      <header className="border-b border-navy-200 bg-white dark:border-navy-800 dark:bg-navy-900">
        <Container>
          <div className="flex h-14 items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-6">
              <Link href="/admin" className="flex shrink-0 items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-600 text-xs font-bold text-white">
                  OM
                </span>
                <span className="truncate font-semibold text-navy-900 dark:text-white">
                  {siteConfig.name} Admin
                </span>
              </Link>
              <nav className="hidden items-center gap-1 sm:flex" aria-label="Admin navigation">
                {navItems.map(({ href, label, icon: Icon, exact }) => {
                  const active = exact ? pathname === href : pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition",
                        active
                          ? "bg-navy-100 text-navy-900 dark:bg-navy-800 dark:text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-navy-900 dark:text-navy-200 dark:hover:bg-navy-800 dark:hover:text-white"
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="hidden text-sm text-gray-500 hover:text-navy-700 dark:text-navy-300 dark:hover:text-white sm:inline"
              >
                View site
              </Link>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1.5 rounded-lg border border-navy-200 px-3 py-1.5 text-sm text-navy-700 transition hover:bg-navy-50 dark:border-navy-700 dark:text-navy-100 dark:hover:bg-navy-800"
              >
                <LogOut className="h-4 w-4" aria-hidden />
                Sign out
              </button>
            </div>
          </div>
        </Container>
      </header>
      {children}
    </div>
  );
}
