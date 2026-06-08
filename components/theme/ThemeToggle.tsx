"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  compact,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "rounded-lg border border-navy-700 bg-navy-800 p-2 text-navy-100 transition hover:bg-navy-700 hover:text-white",
        compact && "p-2",
        className
      )}
      aria-label={isDark ? t.theme.switchToLight : t.theme.switchToDark}
      title={isDark ? t.theme.light : t.theme.dark}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-gold-400" aria-hidden />
      ) : (
        <Moon className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
