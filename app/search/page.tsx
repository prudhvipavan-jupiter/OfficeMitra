import { Container, SectionHeading } from "@/components/ui/Container";
import { GlobalSearchBar, SearchResults } from "@/components/search/SearchUI";
import { searchContent } from "@/lib/content";
import { getTranslations } from "@/lib/i18n/server";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Search",
  description: "Search articles, procedures, documents, templates, and updates on OfficeMitra.",
  path: "/search",
});

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const { dict: t } = await getTranslations();
  const results = searchContent(q);

  return (
    <Container className="py-10">
      <SectionHeading title={t.search.title} subtitle={t.search.placeholder} />
      <GlobalSearchBar />
      <SearchResults query={q} results={results} />
    </Container>
  );
}
