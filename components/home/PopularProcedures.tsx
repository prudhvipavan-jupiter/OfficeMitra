import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { getTranslations } from "@/lib/i18n/server";
import { categoryLabels } from "@/lib/categories";
import { popularProcedures } from "@/lib/constants";
import type { ArticleCategory } from "@/lib/categories";

export async function PopularProcedures() {
  const { dict: t } = await getTranslations();

  return (
    <section className="section-alt py-16 md:py-20">
      <Container>
        <SectionHeading
          title={t.popularProcedures.title}
          subtitle={t.popularProcedures.subtitle}
          action={
            <Link
              href="/procedures"
              className="inline-flex items-center gap-1 text-sm font-semibold text-navy-700 hover:text-gold-700"
            >
              {t.popularProcedures.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularProcedures.map((proc) => (
            <Link
              key={proc.slug}
              href={`/procedures/${proc.slug}`}
              className="card-hover group flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
            >
              <span className="inline-flex w-fit rounded-full bg-gold-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-gold-700">
                {t.categories[proc.category as ArticleCategory] ??
                  categoryLabels[proc.category as ArticleCategory]}
              </span>
              <h3 className="mt-3 text-lg font-bold text-navy-900 group-hover:text-navy-700">
                {proc.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                {proc.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-navy-700">
                {t.popularProcedures.readGuide}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
