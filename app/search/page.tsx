import { Container, SectionHeading } from "@/components/ui/Container";
import { GlobalSearchBar, SearchResults } from "@/components/search/SearchUI";
import { countSearchResults, searchAll } from "@/lib/search";
import { logSearchQuery } from "@/lib/search-analytics";
import { getTranslations } from "@/lib/i18n/server";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Search",
  description: "Search articles, procedures, documents, FAQ, glossary, community, tools, and updates.",
  path: "/search",
});

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const { dict: t } = await getTranslations();
  const results = await searchAll(q);

  if (q.trim()) {
    await logSearchQuery(q, countSearchResults(results));
  }

  return (
    <Container className="py-10">
      <SectionHeading title={t.search.title} subtitle={t.search.placeholder} />
      <GlobalSearchBar />
      <SearchResults query={q} results={results} />
    </Container>
  );
}
