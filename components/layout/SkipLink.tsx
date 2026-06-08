import { getTranslations } from "@/lib/i18n/server";

export async function SkipLink() {
  const { dict: t } = await getTranslations();
  return (
    <a
      href="#main-content"
      className="skip-link"
    >
      {t.a11y.skipToContent}
    </a>
  );
}
