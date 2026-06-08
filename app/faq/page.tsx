import { FaqSearch } from "@/components/faq/FaqSearch";
import { Container, SectionHeading } from "@/components/ui/Container";
import { loadFaqItems } from "@/lib/cms/loaders";
import { getTranslations } from "@/lib/i18n/server";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Quick answers to common questions for Andhra Pradesh government ministerial staff.",
  path: "/faq",
});

export default async function FaqPage() {
  const { dict: t, locale } = await getTranslations();
  const faqItems = await loadFaqItems();

  return (
    <Container className="py-10">
      <SectionHeading title={t.faq.title} subtitle={t.faq.subtitle} />
      <div className="mt-8">
        <FaqSearch items={faqItems} locale={locale} />
      </div>
      <p className="mt-8 text-sm text-gray-500">{t.common.guidanceOnly}</p>
    </Container>
  );
}
