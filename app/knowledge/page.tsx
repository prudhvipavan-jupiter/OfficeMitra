import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/Container";
import { loadArticles } from "@/lib/cms/loaders";
import type { ArticleCategory } from "@/lib/content";
import { getTranslations } from "@/lib/i18n/server";
import { formatDate } from "@/lib/utils";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Knowledge Hub",
  description: "Structured articles on rules, procedures, and office practice for AP government employees.",
  path: "/knowledge",
});

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function KnowledgePage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const { dict: t } = await getTranslations();
  let articles = await loadArticles();

  if (category) {
    articles = articles.filter((a) => a.category === category);
  }

  const categoryKeys = Object.keys(t.categories) as ArticleCategory[];

  return (
    <Container className="py-10">
      <SectionHeading title={t.knowledge.title} subtitle={t.knowledge.subtitle} />

      <div className="flex flex-wrap gap-2">
        <Link
          href="/knowledge"
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            !category
              ? "bg-navy-700 text-white"
              : "bg-navy-100 text-navy-700 hover:bg-navy-200"
          }`}
        >
          {t.common.all}
        </Link>
        {categoryKeys.map((cat) => (
          <Link
            key={cat}
            href={`/knowledge?category=${cat}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              category === cat
                ? "bg-navy-700 text-white"
                : "bg-navy-100 text-navy-700 hover:bg-navy-200"
            }`}
          >
            {t.categories[cat]}
          </Link>
        ))}
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <li
            key={article.slug}
            className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm transition hover:border-navy-300 hover:shadow-md"
          >
            <span className="rounded-full bg-navy-100 px-2.5 py-0.5 text-xs font-medium text-navy-700">
              {t.categories[article.category as ArticleCategory]}
            </span>
            <Link
              href={`/knowledge/${article.slug}`}
              className="mt-3 block text-lg font-semibold text-navy-900 hover:text-navy-700"
            >
              {article.title}
            </Link>
            {article.telugu_summary && (
              <p className="mt-1 text-sm text-navy-700">{article.telugu_summary}</p>
            )}
            <p className="mt-2 text-sm text-gray-600">{article.summary}</p>
            <time
              dateTime={article.published_at}
              className="mt-3 block text-xs text-gray-500"
            >
              {formatDate(article.published_at)}
            </time>
          </li>
        ))}
      </ul>

      {articles.length === 0 && (
        <p className="mt-8 text-gray-500">{t.knowledge.empty}</p>
      )}
    </Container>
  );
}
