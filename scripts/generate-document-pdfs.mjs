/**
 * Generates PDF reference documents from content/documents/metadata.json.
 * Run: node scripts/generate-document-pdfs.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const metadataPath = path.join(root, "content", "documents", "metadata.json");
const outDir = path.join(root, "public", "downloads", "documents");

const NAVY = rgb(0.04, 0.09, 0.16);
const GOLD = rgb(0.83, 0.63, 0.09);
const GRAY = rgb(0.42, 0.45, 0.5);
const BLACK = rgb(0.1, 0.1, 0.1);

const typeLabels = {
  go: "Government Order",
  circular: "Circular",
  manual: "Manual / Guide",
  checklist: "Checklist",
  form: "Form / Template",
};

function wrapText(text, maxWidth, font, size) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) <= maxWidth) {
      line = test;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function buildPdf(doc) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const margin = 50;
  const contentWidth = width - margin * 2;
  let y = height - margin;

  // Header bar
  page.drawRectangle({
    x: 0,
    y: height - 72,
    width,
    height: 72,
    color: NAVY,
  });
  page.drawText("OfficeMitra", {
    x: margin,
    y: height - 46,
    size: 14,
    font: bold,
    color: GOLD,
  });
  page.drawText("Document Library Reference", {
    x: margin,
    y: height - 62,
    size: 9,
    font: regular,
    color: rgb(0.66, 0.72, 0.83),
  });

  y = height - 100;

  const typeLabel = typeLabels[doc.type] ?? doc.type;
  page.drawText(typeLabel.toUpperCase(), {
    x: margin,
    y,
    size: 9,
    font: bold,
    color: GOLD,
  });
  y -= 22;

  const titleLines = wrapText(doc.title, contentWidth, bold, 16);
  for (const line of titleLines.slice(0, 3)) {
    page.drawText(line, { x: margin, y, size: 16, font: bold, color: BLACK });
    y -= 20;
  }
  y -= 8;

  const metaRows = [
    ["Reference No.", doc.number],
    ["Date", doc.date],
    ["Department", doc.department],
    ["Category", doc.category.replace(/-/g, " ")],
    ["Year", String(doc.year)],
  ];

  for (const [label, value] of metaRows) {
    page.drawText(`${label}:`, {
      x: margin,
      y,
      size: 10,
      font: bold,
      color: GRAY,
    });
    page.drawText(value, {
      x: margin + 110,
      y,
      size: 10,
      font: regular,
      color: BLACK,
    });
    y -= 16;
  }

  y -= 12;
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 1,
    color: rgb(0.88, 0.9, 0.94),
  });
  y -= 24;

  page.drawText("Subject", { x: margin, y, size: 11, font: bold, color: BLACK });
  y -= 16;
  for (const line of wrapText(doc.subject, contentWidth, regular, 11)) {
    page.drawText(line, { x: margin, y, size: 11, font: regular, color: BLACK });
    y -= 14;
  }

  if (doc.related_articles?.length) {
    y -= 12;
    page.drawText("Related OfficeMitra Articles", {
      x: margin,
      y,
      size: 11,
      font: bold,
      color: BLACK,
    });
    y -= 16;
    for (const slug of doc.related_articles) {
      page.drawText(`• theofficemitra.com/knowledge/${slug}`, {
        x: margin,
        y,
        size: 10,
        font: regular,
        color: rgb(0.17, 0.24, 0.42),
      });
      y -= 14;
    }
  }

  y -= 16;
  page.drawRectangle({
    x: margin,
    y: y - 72,
    width: contentWidth,
    height: 88,
    color: rgb(0.96, 0.97, 0.98),
    borderColor: rgb(0.88, 0.9, 0.94),
    borderWidth: 1,
  });

  const disclaimer =
    "This PDF is an OfficeMitra reference sheet for administrative guidance. " +
    "Always verify the official Government Order or circular on GOIR (goir.ap.gov.in) " +
    "or the issuing department before taking official action. OfficeMitra does not " +
    "host or reproduce copyrighted government publications.";

  let dy = y - 14;
  for (const line of wrapText(disclaimer, contentWidth - 24, regular, 9)) {
    page.drawText(line, { x: margin + 12, y: dy, size: 9, font: regular, color: GRAY });
    dy -= 12;
  }

  page.drawText("© OfficeMitra — TheOfficeMitra.com", {
    x: margin,
    y: 36,
    size: 8,
    font: regular,
    color: GRAY,
  });

  return pdf.save();
}

async function main() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const docs = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
  let count = 0;

  for (const doc of docs) {
    const baseName = path.basename(doc.file ?? `${doc.id}.txt`, ".txt");
    const pdfName = `${baseName}.pdf`;
    const outPath = path.join(outDir, pdfName);
    const bytes = await buildPdf(doc);
    fs.writeFileSync(outPath, bytes);
    doc.file = `/downloads/documents/${pdfName}`;
    count++;
    console.log(`  ✓ ${pdfName}`);
  }

  fs.writeFileSync(metadataPath, `${JSON.stringify(docs, null, 2)}\n`);
  console.log(`\nGenerated ${count} PDFs and updated metadata.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
