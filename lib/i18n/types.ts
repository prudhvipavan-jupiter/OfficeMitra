import type { en } from "./dictionaries/en";

export type Locale = "en" | "te";

export const LOCALE_COOKIE = "officemitra-locale";
export const DEFAULT_LOCALE: Locale = "en";

export const locales: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
];

type DeepStringRecord<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends Record<string, unknown>
      ? DeepStringRecord<T[K]>
      : never;
};

export type Dictionary = DeepStringRecord<typeof en>;
