import fs from "fs";
import path from "path";

export type DocumentType = "go" | "circular" | "manual" | "checklist" | "form";

export interface DocumentRecord {
  id: string;
  title: string;
  type: DocumentType;
  number: string;
  date: string;
  department: string;
  category: string;
  year: number;
  subject: string;
  related_articles: string[];
  file?: string;
  goir_url?: string;
}

const metadataPath = path.join(
  process.cwd(),
  "content",
  "documents",
  "metadata.json"
);

export function getDocuments(): DocumentRecord[] {
  if (!fs.existsSync(metadataPath)) return [];
  const data = JSON.parse(fs.readFileSync(metadataPath, "utf-8")) as DocumentRecord[];
  return data.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getDocumentById(id: string): DocumentRecord | undefined {
  return getDocuments().find((d) => d.id === id);
}

export const documentTypeLabels: Record<DocumentType, string> = {
  go: "Government Order",
  circular: "Circular",
  manual: "Manual",
  checklist: "Checklist",
  form: "Form",
};

export function filterDocuments(filters: {
  department?: string;
  year?: string;
  category?: string;
  type?: string;
  q?: string;
}, source?: DocumentRecord[]): DocumentRecord[] {
  let docs = source ?? getDocuments();

  if (filters.department) {
    docs = docs.filter((d) =>
      d.department.toLowerCase().includes(filters.department!.toLowerCase())
    );
  }
  if (filters.year) {
    docs = docs.filter((d) => d.year === parseInt(filters.year!, 10));
  }
  if (filters.category) {
    docs = docs.filter((d) => d.category === filters.category);
  }
  if (filters.type) {
    docs = docs.filter((d) => d.type === filters.type);
  }
  if (filters.q) {
    const q = filters.q.toLowerCase();
    docs = docs.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.subject.toLowerCase().includes(q) ||
        d.number.toLowerCase().includes(q)
    );
  }

  return docs;
}
