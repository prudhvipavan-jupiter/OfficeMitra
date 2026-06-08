import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { logAdminAction } from "@/lib/admin-log";
import { isAdminAuthenticated } from "@/lib/auth";
import { syncCmsFromFiles } from "@/lib/cms/seed";
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

/** Clear seed/test data and re-sync CMS from git files for production launch. */
export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cleared: Record<string, number> = {};

  if (isDatabaseEnabled()) {
    const sql = getSql();
    const seedDisc = await sql`
      DELETE FROM discussions WHERE id LIKE 'seed-discussion-%' RETURNING id
    `;
    cleared.seed_discussions = seedDisc.length;

    await sql`DELETE FROM cms_files`;
    const cmsRows = await sql`DELETE FROM cms_content RETURNING id`;
    cleared.cms_records = cmsRows.length;
  }

  const counts = await syncCmsFromFiles({ force: false, onlyEmpty: false });
  await logAdminAction("production_reset", { cleared: JSON.stringify(cleared) });
  revalidateAll();

  return NextResponse.json({
    ok: true,
    cleared,
    cms_sync: counts,
    message: "Production reset complete. Seed community posts removed; CMS synced from files.",
  });
}
