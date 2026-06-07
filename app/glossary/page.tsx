import { GlossarySearch } from "@/components/glossary/GlossarySearch";
import { Container, SectionHeading } from "@/components/ui/Container";
import { glossaryTerms } from "@/lib/glossary";
import { getTranslations } from "@/lib/i18n/server";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Administrative Glossary",
  description:
    "AP government administration terms explained — APGLI, GPF, CFMS, DDO, SR, and more.",
  path: "/glossary",
});

export default async function GlossaryPage() {
  const { dict: t } = await getTranslations();

  return (
    <Container className="py-10">
      <SectionHeading title={t.glossary.title} subtitle={t.glossary.subtitle} />
      <div className="mt-8">
        <GlossarySearch terms={glossaryTerms} />
      </div>
    </Container>
  );
}
