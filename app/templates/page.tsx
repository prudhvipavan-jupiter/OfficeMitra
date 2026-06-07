import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { getTemplates } from "@/lib/templates";
import { getTranslations } from "@/lib/i18n/server";
import type { ArticleCategory } from "@/lib/categories";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Templates Library",
  description: "Ready-to-use proceedings, office notes, memos, and service register entry formats.",
  path: "/templates",
});

export default async function TemplatesPage() {
  const { dict: t } = await getTranslations();
  const templates = getTemplates();

  return (
    <Container className="py-10">
      <SectionHeading title={t.templates.title} subtitle={t.templates.subtitle} />

      <div className="grid gap-6 md:grid-cols-2">
        {templates.map((tpl) => (
          <article
            key={tpl.id}
            className="flex flex-col rounded-xl border border-navy-100 bg-white p-6 shadow-sm"
          >
            <div className="flex h-32 items-center justify-center rounded-lg bg-navy-50">
              <FileText className="h-12 w-12 text-navy-300" />
            </div>
            <span className="mt-4 text-xs font-semibold uppercase text-gold-600">
              {t.categories[tpl.category as ArticleCategory] ?? tpl.category}
            </span>
            <h3 className="mt-1 text-lg font-semibold text-navy-900">{tpl.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{tpl.description}</p>
            <div className="mt-3 rounded-lg bg-navy-50 p-3 text-sm text-gray-700">
              <strong className="text-navy-900">{t.common.usage}:</strong> {tpl.usage_notes}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {tpl.file_docx && (
                <a
                  href={tpl.file_docx}
                  download
                  className="inline-flex items-center gap-1 rounded-md bg-navy-700 px-3 py-1.5 text-sm text-white hover:bg-navy-600"
                >
                  <Download className="h-4 w-4" />
                  {t.templates.download}
                </a>
              )}
            </div>
            {tpl.related_procedures[0] && (
              <Link
                href={`/procedures/${tpl.related_procedures[0]}`}
                className="mt-4 text-sm font-medium text-navy-700 hover:underline"
              >
                {t.templates.viewProcedure}
              </Link>
            )}
          </article>
        ))}
      </div>
    </Container>
  );
}
