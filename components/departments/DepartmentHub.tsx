import Link from "next/link";
import {
  loadArticles,
  loadDocuments,
  loadProcedures,
  loadUpdates,
} from "@/lib/cms/loaders";
import { Container, SectionHeading } from "@/components/ui/Container";
import { getTranslations } from "@/lib/i18n/server";
import type { DepartmentHubConfig } from "@/lib/departments";

interface DepartmentHubProps {
  config: DepartmentHubConfig;
}

export async function DepartmentHub({ config }: DepartmentHubProps) {
  const { dict: t } = await getTranslations();
  const dept = t.departments[config.titleKey];

  const [allArticles, allProcedures, allUpdates, allDocuments] = await Promise.all([
    loadArticles(),
    loadProcedures(),
    loadUpdates(),
    loadDocuments(),
  ]);

  let articles = allArticles;
  if (config.articleTags?.length) {
    articles = articles.filter((a) =>
      config.articleTags!.some((tag) => a.tags?.includes(tag))
    );
  }
  if (config.articleCategories?.length) {
    articles = articles.filter((a) => config.articleCategories!.includes(a.category));
  }

  const procedures = allProcedures.filter((p) =>
    config.articleCategories?.includes(p.category) ?? true
  );
  const updates = allUpdates.slice(0, 3);
  const documents = allDocuments
    .filter((d) => config.articleCategories?.includes(d.category as typeof d.category) ?? true)
    .slice(0, 6);

  const displayArticles = (articles.length ? articles : allArticles).slice(0, 6);
  const displayProcedures = procedures.slice(0, 4);

  return (
    <Container className="py-10">
      <SectionHeading title={dept.title} subtitle={dept.subtitle} />
      <div className="mt-6 rounded-xl border border-gold-200 bg-gold-50 px-5 py-4 text-sm text-navy-800">
        {dept.notice}
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-navy-900">{t.departments.expertCta}</h2>
        <p className="mt-2 text-gray-600">{dept.expertDesc ?? t.departments.health.expertDesc}</p>
        <Link
          href="/expert-assistance"
          className="mt-4 inline-block rounded-lg bg-navy-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-600"
        >
          {t.nav.expertAssistance} →
        </Link>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-navy-900">{t.nav.knowledge}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {displayArticles.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/knowledge/${a.slug}`}
                className="block rounded-lg border border-navy-100 px-4 py-3 text-sm hover:border-navy-700"
              >
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-navy-900">{t.nav.procedures}</h2>
        <ul className="mt-4 space-y-2">
          {displayProcedures.map((p) => (
            <li key={p.slug}>
              <Link href={`/procedures/${p.slug}`} className="text-navy-700 hover:underline">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        <Link href="/community" className="rounded-xl border border-navy-100 p-5 hover:border-navy-700">
          <p className="font-semibold text-navy-900">{t.nav.community}</p>
        </Link>
        <Link href="/tools" className="rounded-xl border border-navy-100 p-5 hover:border-navy-700">
          <p className="font-semibold text-navy-900">{t.nav.tools}</p>
        </Link>
        <Link href="/official-links" className="rounded-xl border border-navy-100 p-5 hover:border-navy-700">
          <p className="font-semibold text-navy-900">{t.nav.officialLinks}</p>
        </Link>
      </section>

      {documents.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-navy-900">{t.nav.documents}</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {documents.map((d) => (
              <li key={d.id} className="text-sm text-navy-800">
                <Link href={`/documents?id=${d.id}`} className="hover:underline">
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {updates.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-navy-900">{t.nav.updates}</h2>
          <ul className="mt-4 space-y-2">
            {updates.map((u) => (
              <li key={u.slug}>
                <Link href={`/updates/${u.slug}`} className="text-navy-700 hover:underline">
                  {u.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
