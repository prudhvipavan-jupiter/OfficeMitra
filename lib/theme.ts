export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "officemitra-theme";

export function resolveTheme(stored: Theme | null, prefersDark: boolean): Theme {
  if (stored === "light" || stored === "dark") return stored;
  return prefersDark ? "dark" : "light";
}

export function applyThemeClass(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}
