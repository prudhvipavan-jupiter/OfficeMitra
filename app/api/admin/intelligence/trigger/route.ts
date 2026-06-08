import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";
import { autoProcessIntelUpdates } from "@/lib/intelligence/auto-process";
import { runIntelligenceMonitorCycle } from "@/lib/intelligence/monitor-cycle";
import { triggerIntelligenceWorker } from "@/lib/intelligence/trigger-worker";
import { upgradeBriefIntelPosts } from "@/lib/intelligence/upgrade-content";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let monitor;
    if (process.env.INTELLIGENCE_USE_WORKER === "true") {
      const worker = await triggerIntelligenceWorker();
      if (!worker.ok) {
        return NextResponse.json({ error: worker.error ?? "Worker request failed" }, { status: 503 });
      }
      monitor = { mode: "worker", ...worker };
    } else {
      const cycle = await runIntelligenceMonitorCycle();
      monitor = { mode: "embedded", ...cycle };
    }

    const upgraded = await upgradeBriefIntelPosts();
    const autoPublished = await autoProcessIntelUpdates();

    if (autoPublished > 0) {
      revalidatePath("/updates");
      revalidatePath("/updates/[slug]", "page");
      revalidatePath("/");
    }

    return NextResponse.json({
      ...monitor,
      autoPublished,
      dailyTarget: parseInt(process.env.INTELLIGENCE_DAILY_PUBLISH_TARGET ?? "5", 10),
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Intelligence run failed" },
      { status: 500 }
    );
  }
}
