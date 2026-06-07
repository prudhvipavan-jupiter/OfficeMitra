import Link from "next/link";
import {
  getArticles,
  getProcedures,
  getUpdates,
} from "@/lib/content";
import { getDocuments } from "@/lib/documents";
import { Container, SectionHeading } from "@/components/ui/Container";
import { getTranslations } from "@/lib/i18n/server";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Health Department Hub",
  description:
    "Curated knowledge, procedures, and resources for Andhra Pradesh Health Department ministerial staff.",
  path: "/departments/health",
});

export default async function HealthDepartmentPage() {
  const { dict: t } = await getTranslations();

  const articles = getArticles().slice(0, 6);
  const procedures = getProcedures().slice(0, 4);
  const updates = getUpdates().slice(0, 3);
  const documents = getDocuments().slice(0, 6);

  return (
    <Container className="py-10">
      <SectionHeading
        title={t.departments.health.title}
        subtitle={t.departments.health.subtitle}
      />

      <div className="mt-6 rounded-xl border border-gold-200 bg-gold-50 px-5 py-4 text-sm text-navy-800">
        {t.departments.health.notice}
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-navy-900">{t.departments.health.expertCta}</h2>
        <p className="mt-2 text-gray-600">{t.departments.health.expertDesc}</p>
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
          {articles.map((a) => (
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
        <Link href="/knowledge" className="mt-3 inline-block text-sm text-navy-700 hover:underline">
          {t.common.viewAll} →
        </Link>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-navy-900">{t.nav.procedures}</h2>
        <ul className="mt-4 space-y-2">
          {procedures.map((p) => (
            <li key={p.slug}>
              <Link href={`/procedures/${p.slug}`} className="text-navy-700 hover:underline">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

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

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-navy-900">{t.nav.documents}</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {documents.map((d) => (
            <li key={d.id} className="text-sm text-navy-800">
              {d.title}
            </li>
          ))}
        </ul>
        <Link href="/documents" className="mt-3 inline-block text-sm text-navy-700 hover:underline">
          {t.common.browse} →
        </Link>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        <Link
          href="/community"
          className="rounded-xl border border-navy-100 p-5 hover:border-navy-700"
        >
          <p className="font-semibold text-navy-900">{t.nav.community}</p>
          <p className="mt-1 text-sm text-gray-600">{t.oneStop.communityDesc}</p>
        </Link>
        <Link
          href="/faq"
          className="rounded-xl border border-navy-100 p-5 hover:border-navy-700"
        >
          <p className="font-semibold text-navy-900">{t.nav.faq}</p>
          <p className="mt-1 text-sm text-gray-600">{t.oneStop.faqDesc}</p>
        </Link>
        <Link
          href="/official-links"
          className="rounded-xl border border-navy-100 p-5 hover:border-navy-700"
        >
          <p className="font-semibold text-navy-900">{t.nav.officialLinks}</p>
          <p className="mt-1 text-sm text-gray-600">{t.oneStop.portalsDesc}</p>
        </Link>
      </section>
    </Container>
  );
}
