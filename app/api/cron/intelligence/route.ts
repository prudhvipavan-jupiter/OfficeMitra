import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthorizedCron } from "@/lib/cron-auth";
import { autoProcessIntelUpdates } from "@/lib/intelligence/auto-process";
import { runIntelligenceMonitorCycle } from "@/lib/intelligence/monitor-cycle";
import { triggerIntelligenceWorker } from "@/lib/intelligence/trigger-worker";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let monitor;
  const useWorker = process.env.INTELLIGENCE_USE_WORKER === "true";

  if (useWorker) {
    const worker = await triggerIntelligenceWorker();
    monitor = { mode: "worker", worker };
  } else {
    try {
      const cycle = await runIntelligenceMonitorCycle();
      monitor = { mode: "embedded", ok: true, ...cycle };
    } catch (err) {
      monitor = {
        mode: "embedded",
        ok: false,
        error: err instanceof Error ? err.message : "Monitor failed",
      };
    }
  }

  const published = await autoProcessIntelUpdates();

  if (published > 0) {
    revalidatePath("/updates");
    revalidatePath("/updates/[slug]", "page");
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
  }

  return NextResponse.json({
    ok: monitor.ok !== false,
    monitor,
    autoPublished: published,
    dailyTarget: parseInt(process.env.INTELLIGENCE_DAILY_PUBLISH_TARGET ?? "5", 10),
  });
}
