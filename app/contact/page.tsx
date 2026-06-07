import { Container } from "@/components/ui/Container";
import { getTranslations } from "@/lib/i18n/server";
import { createPageMetadata, siteConfig } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact OfficeMitra.",
  path: "/contact",
});

export default async function ContactPage() {
  const { dict: t } = await getTranslations();

  return (
    <Container narrow className="py-10">
      <h1 className="text-3xl font-bold text-navy-900">{t.contact.title}</h1>
      <p className="mt-4 text-gray-600">
        {t.contact.intro}{" "}
        <a href="/expert-assistance" className="text-navy-700 underline">
          {t.contact.requestForm}
        </a>
        . {t.contact.general} {siteConfig.name}:
      </p>
      <p className="mt-6 rounded-xl border border-navy-100 bg-navy-50 p-6 text-gray-700">
        Email: contact@{siteConfig.domain.toLowerCase()}
        <br />
        Domain: {siteConfig.domain}
      </p>
    </Container>
  );
}
