import Link from "next/link";
import { CommunityForm } from "@/components/community/CommunityForm";
import { DiscussionList } from "@/components/community/DiscussionList";
import { Container, SectionHeading } from "@/components/ui/Container";
import { getDiscussions } from "@/lib/db/discussions";
import { getTranslations } from "@/lib/i18n/server";
import { createPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Staff Community",
  description:
    "Public Q&A and discussions for Andhra Pradesh government ministerial staff — moderated by OfficeMitra.",
  path: "/community",
});

function mapDiscussion(d: Awaited<ReturnType<typeof getDiscussions>>[number]) {
  return {
    id: d.id,
    created_at: d.created_at,
    author_name: d.author_name,
    designation: d.designation,
    institution: d.institution,
    category: d.category,
    title: d.title,
    body: d.body,
    reply_count: d.replies.length,
    views: d.views,
    status: d.status,
  };
}

export default async function CommunityPage() {
  const { dict: t } = await getTranslations();
  const published = (await getDiscussions({ status: "published" })).map(mapDiscussion);
  const resolved = (await getDiscussions({ status: "resolved" })).map(mapDiscussion);

  return (
    <Container className="py-10">
      <SectionHeading title={t.community.title} subtitle={t.community.subtitle} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          {resolved.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-navy-900">{t.community.solvedTitle}</h2>
              <div className="mt-4">
                <DiscussionList discussions={resolved} />
              </div>
            </section>
          )}

          <h2 className="text-lg font-semibold text-navy-900">{t.community.recentTitle}</h2>
          <div className="mt-4">
            <DiscussionList discussions={published} />
          </div>

          <p className="mt-6 text-sm text-gray-500">
            {t.community.moderationNote}{" "}
            <Link href="/faq" className="text-navy-700 underline">
              FAQ
            </Link>
          </p>
        </div>
        <aside>
          <CommunityForm />
        </aside>
      </div>
    </Container>
  );
}
