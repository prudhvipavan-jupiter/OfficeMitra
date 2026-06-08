import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthorizedCron } from "@/lib/cron-auth";
import { autoProcessIntelUpdates } from "@/lib/intelligence/auto-process";
import { triggerIntelligenceWorker } from "@/lib/intelligence/trigger-worker";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const worker = await triggerIntelligenceWorker();
  const published = await autoProcessIntelUpdates();

  if (published > 0) {
    revalidatePath("/updates");
    revalidatePath("/updates/[slug]", "page");
    revalidatePath("/");
  }

  return NextResponse.json({
    ok: worker.ok,
    worker,
    autoPublished: published,
  });
}
