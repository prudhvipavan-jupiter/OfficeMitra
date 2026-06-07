import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { WhatsAppShare } from "@/components/ui/WhatsAppShare";
import { getDiscussionById, incrementDiscussionViews } from "@/lib/db/discussions";
import { getTranslations } from "@/lib/i18n/server";
import { siteConfig } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";
import type { ArticleCategory } from "@/lib/categories";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DiscussionPage({ params }: PageProps) {
  const { id } = await params;
  const { dict: t } = await getTranslations();
  const discussion = await getDiscussionById(id);

  if (!discussion || discussion.status !== "published") notFound();

  await incrementDiscussionViews(id);

  const categoryLabel =
    discussion.category === "general"
      ? t.community.categories.general
      : t.categories[discussion.category as ArticleCategory];

  return (
    <Container className="py-10">
      <nav className="text-sm text-gray-500">
        <Link href="/community" className="hover:text-navy-700">
          {t.nav.community}
        </Link>
        <span className="mx-2">/</span>
        <span>{categoryLabel}</span>
      </nav>

      <article className="mt-4 max-w-3xl">
        <span className="rounded-full bg-navy-100 px-3 py-0.5 text-xs font-medium text-navy-700">
          {categoryLabel}
        </span>
        <h1 className="mt-4 text-2xl font-bold text-navy-900 md:text-3xl">
          {discussion.title}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {discussion.author_name} · {discussion.designation} · {discussion.institution}
          <span className="mx-2">·</span>
          <time dateTime={discussion.created_at}>{formatDate(discussion.created_at)}</time>
        </p>

        <div className="mt-6 rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
          <p className="whitespace-pre-wrap text-gray-800">{discussion.body}</p>
        </div>

        {discussion.replies.length > 0 && (
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-navy-900">{t.community.answersTitle}</h2>
            <ul className="mt-4 space-y-4">
              {discussion.replies.map((reply) => (
                <li
                  key={reply.id}
                  className={`rounded-xl border p-5 ${
                    reply.is_official
                      ? "border-gold-200 bg-gold-50"
                      : "border-navy-100 bg-white"
                  }`}
                >
                  <p className="text-sm font-semibold text-navy-900">
                    {reply.author}
                    {reply.is_official && (
                      <span className="ml-2 rounded bg-gold-200 px-2 py-0.5 text-xs font-normal text-gold-800">
                        {t.community.officialAnswer}
                      </span>
                    )}
                  </p>
                  <time dateTime={reply.created_at} className="text-xs text-gray-500">
                    {formatDate(reply.created_at)}
                  </time>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-gray-800">{reply.body}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-8 flex flex-wrap gap-4">
          <WhatsAppShare
            title={discussion.title}
            url={`${siteConfig.url}/community/${discussion.id}`}
          />
          <Link
            href="/community"
            className="text-sm font-medium text-navy-700 hover:underline"
          >
            ← {t.community.backToBoard}
          </Link>
        </div>
      </article>
    </Container>
  );
}
