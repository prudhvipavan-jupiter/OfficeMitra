import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { syncCmsFromFiles } from "@/lib/cms/seed";
import { CMS_TYPE_PATHS, type CmsContentType } from "@/lib/cms/types";
import { isAuthorizedCron } from "@/lib/cron-auth";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

function revalidateAll() {
  for (const path of Object.values(CMS_TYPE_PATHS)) {
    revalidatePath(path);
  }
  revalidatePath("/");
  revalidatePath("/search");
  revalidatePath("/sitemap.xml");
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const onlyEmpty = request.nextUrl.searchParams.get("onlyEmpty") !== "false";
  const force = request.nextUrl.searchParams.get("force") === "true";
  const type = request.nextUrl.searchParams.get("type") as CmsContentType | null;

  const counts = await syncCmsFromFiles({
    types: type ? [type] : undefined,
    onlyEmpty,
    force,
  });

  revalidateAll();

  return NextResponse.json({ ok: true, counts, onlyEmpty, force });
}
