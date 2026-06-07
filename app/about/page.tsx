import { Container } from "@/components/ui/Container";
import { getTranslations } from "@/lib/i18n/server";
import { createPageMetadata, siteConfig } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description: "About OfficeMitra — administrative knowledge platform for Andhra Pradesh government employees.",
  path: "/about",
});

export default async function AboutPage() {
  const { dict: t } = await getTranslations();

  return (
    <Container narrow className="py-10">
      <h1 className="text-3xl font-bold text-navy-900">
        {t.about.title} {siteConfig.name}
      </h1>
      <p className="mt-4 text-lg text-gray-600">{t.meta.tagline}</p>
      <div className="prose-article mt-8 space-y-4 text-gray-700">
        <p>{t.meta.siteDescription}</p>
        <p>{t.about.p1}</p>
        <p>{t.about.p2}</p>
        <p>{t.about.p3}</p>
      </div>
    </Container>
  );
}
