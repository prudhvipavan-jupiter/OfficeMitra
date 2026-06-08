export interface FaqItem {
  id: string;
  category: string;
  question: string;
  question_te?: string;
  answer: string;
  answer_te?: string;
  related_links?: { label: string; href: string }[];
}

export const faqItems: FaqItem[] = [];

export function searchFaq(query: string): FaqItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return faqItems;
  return faqItems.filter(
    (f) =>
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      f.question_te?.includes(q)
  );
}
