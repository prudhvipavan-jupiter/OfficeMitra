import fs from "fs";
import path from "path";

export interface TemplateRecord {
  id: string;
  title: string;
  category: string;
  description: string;
  usage_notes: string;
  related_articles: string[];
  related_procedures: string[];
  file_docx?: string;
  file_pdf?: string;
}

const metadataPath = path.join(
  process.cwd(),
  "content",
  "templates",
  "metadata.json"
);

export function getTemplates(): TemplateRecord[] {
  if (!fs.existsSync(metadataPath)) return [];
  return JSON.parse(fs.readFileSync(metadataPath, "utf-8")) as TemplateRecord[];
}

export function getTemplateById(id: string): TemplateRecord | undefined {
  return getTemplates().find((t) => t.id === id);
}
