export interface GlossaryTerm {
  term: string;
  telugu?: string;
  definition: string;
  category: string;
}

export const glossaryTerms: GlossaryTerm[] = [];

export function searchGlossary(query: string): GlossaryTerm[] {
  const q = query.toLowerCase().trim();
  if (!q) return glossaryTerms;
  return glossaryTerms.filter(
    (g) =>
      g.term.toLowerCase().includes(q) ||
      g.definition.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.telugu?.includes(q)
  );
}
