import { en, type EnDictionary } from "./dictionaries/en";
import { te } from "./dictionaries/te";
import type { Dictionary, Locale } from "./types";

const dictionaries: Record<Locale, Dictionary> = { en, te };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}

export { en, te };
export type { Dictionary, EnDictionary, Locale };
