import { cookies } from "next/headers";
import { getDictionary } from "./index";
import { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale } from "./types";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return value === "te" ? "te" : DEFAULT_LOCALE;
}

export async function getTranslations() {
  const locale = await getLocale();
  return { locale, dict: getDictionary(locale) };
}
