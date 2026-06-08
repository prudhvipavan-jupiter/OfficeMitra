import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";
import { autoProcessIntelUpdates } from "@/lib/intelligence/auto-process";
import { runIntelligenceMonitorCycle } from "@/lib/intelligence/monitor-cycle";
import { triggerIntelligenceWorker } from "@/lib/intelligence/trigger-worker";

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let monitor;
  if (process.env.INTELLIGENCE_USE_WORKER === "true") {
    const worker = await triggerIntelligenceWorker();
    if (!worker.ok) {
      return NextResponse.json({ error: worker.error ?? "Worker request failed" }, { status: 503 });
    }
    monitor = { mode: "worker", ...worker };
  } else {
    const cycle = await runIntelligenceMonitorCycle();
    monitor = { mode: "embedded", ok: true, ...cycle };
  }

  const autoPublished = await autoProcessIntelUpdates();

  if (autoPublished > 0) {
    revalidatePath("/updates");
    revalidatePath("/updates/[slug]", "page");
    revalidatePath("/");
  }

  return NextResponse.json({ ...monitor, autoPublished });
}
