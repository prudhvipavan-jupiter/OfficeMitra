import { NextRequest, NextResponse } from "next/server";
import { cmsGetFile } from "@/lib/cms/store";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ contentId: string; field: string }> }
) {
  const { contentId, field } = await params;
  const fileId = `${contentId}-${field}`;
  const file = await cmsGetFile(fileId);

  if (!file) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(file.buffer), {
    headers: {
      "Content-Type": file.meta.mime_type,
      "Content-Disposition": `inline; filename="${file.meta.filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
