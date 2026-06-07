import { OfficialLinksSearch } from "@/components/official-links/OfficialLinksSearch";
import { Container, SectionHeading } from "@/components/ui/Container";
import { getTranslations } from "@/lib/i18n/server";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Official Portals",
  description:
    "Curated links to CFMS, GOIR, APGLI, EHS, NIDHI, HRMS, and other official Andhra Pradesh government portals for ministerial staff.",
  path: "/official-links",
});

export default async function OfficialLinksPage() {
  const { dict: t } = await getTranslations();

  return (
    <Container className="py-10">
      <SectionHeading
        title={t.officialLinks.title}
        subtitle={t.officialLinks.subtitle}
      />
      <OfficialLinksSearch />
    </Container>
  );
}
