import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { logAdminAction } from "@/lib/admin-log";
import { isAdminAuthenticated } from "@/lib/auth";
import { CMS_TYPE_PATHS, type CmsContentType } from "@/lib/cms/types";
import { getSql, isDatabaseEnabled } from "@/lib/db/client";

const CMS_TYPES: CmsContentType[] = [
  "article",
  "procedure",
  "update",
  "document",
  "template",
  "faq",
  "glossary",
];

function revalidateAll() {
  for (const type of CMS_TYPES) {
    revalidatePath(CMS_TYPE_PATHS[type]);
  }
  revalidatePath("/");
  revalidatePath("/search");
  revalidatePath("/community");
  revalidatePath("/sitemap.xml");
}

/** Wipe all CMS content and user-submitted dummy data from the database. */
export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cleared: Record<string, number> = {};

  if (isDatabaseEnabled()) {
    const sql = getSql();

    const discussions = await sql`DELETE FROM discussions RETURNING id`;
    cleared.discussions = discussions.length;

    const requests = await sql`DELETE FROM expert_requests RETURNING id`;
    cleared.expert_requests = requests.length;

    await sql`DELETE FROM cms_files`;
    const cmsRows = await sql`DELETE FROM cms_content RETURNING id`;
    cleared.cms_records = cmsRows.length;

    try {
      const intel = await sql`DELETE FROM intel_detected_updates RETURNING id`;
      cleared.intel_updates = intel.length;
    } catch {
      cleared.intel_updates = 0;
    }
  }

  await logAdminAction("production_reset", { cleared: JSON.stringify(cleared) });
  revalidateAll();

  return NextResponse.json({
    ok: true,
    cleared,
    message: "All dummy data cleared. Add real content via Admin → Content.",
  });
}
