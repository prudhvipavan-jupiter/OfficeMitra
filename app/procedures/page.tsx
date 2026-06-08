import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/Container";
import { loadProcedures } from "@/lib/cms/loaders";
import type { ArticleCategory } from "@/lib/content";
import { getTranslations } from "@/lib/i18n/server";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Procedure Guides",
  description: "Step-by-step workflows for common administrative processes.",
  path: "/procedures",
});

export default async function ProceduresPage() {
  const { dict: t } = await getTranslations();
  const procedures = await loadProcedures();

  return (
    <Container className="py-10">
      <SectionHeading title={t.procedures.title} subtitle={t.procedures.subtitle} />

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {procedures.map((proc) => (
          <li
            key={proc.slug}
            className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm hover:border-navy-300 hover:shadow-md"
          >
            <span className="text-xs font-semibold uppercase text-gold-600">
              {t.categories[proc.category as ArticleCategory]}
            </span>
            <Link
              href={`/procedures/${proc.slug}`}
              className="mt-2 block text-lg font-semibold text-navy-900 hover:text-navy-700"
            >
              {proc.title}
            </Link>
            <p className="mt-2 text-sm text-gray-600">{proc.summary}</p>
            {proc.estimated_time && (
              <p className="mt-3 text-xs text-gray-500">⏱ {proc.estimated_time}</p>
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
}
