import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { getAllPublishedUpdates } from "@/lib/intelligence/merged-updates";
import { formatDate } from "@/lib/utils";
import { getTranslations } from "@/lib/i18n/server";

export async function LatestUpdates() {
  const { dict: t } = await getTranslations();
  const updates = (await getAllPublishedUpdates()).slice(0, 4);

  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <SectionHeading
          title={t.latestUpdates.title}
          subtitle={t.latestUpdates.subtitle}
          action={
            <Link
              href="/updates"
              className="inline-flex items-center gap-1 text-sm font-semibold text-navy-700 hover:text-gold-700"
            >
              {t.latestUpdates.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        {updates.length === 0 ? (
          <p className="rounded-xl border border-dashed border-navy-200 bg-navy-50 px-6 py-10 text-center text-gray-500">
            {t.latestUpdates.empty}
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {updates.map((update) => (
              <article
                key={update.slug}
                className="card-hover rounded-2xl border border-navy-100 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-navy-100 px-2.5 py-0.5 text-xs font-semibold capitalize text-navy-700">
                    {update.category}
                  </span>
                  <time dateTime={update.date} className="text-xs text-gray-500">
                    {formatDate(update.date)}
                  </time>
                </div>
                <h3 className="mt-3 text-lg font-bold text-navy-900">
                  <Link href={`/updates/${update.slug}`} className="hover:text-navy-700">
                    {update.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
                  {update.what_changed}
                </p>
                <Link
                  href={`/updates/${update.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-700 hover:text-gold-700"
                >
                  {t.latestUpdates.readMore}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
