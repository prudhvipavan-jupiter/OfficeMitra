import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { autoProcessIntelUpdates } from "@/lib/intelligence/auto-process";
import { triggerIntelligenceWorker } from "@/lib/intelligence/trigger-worker";

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const worker = await triggerIntelligenceWorker();
  if (!worker.ok) {
    return NextResponse.json({ error: worker.error ?? "Worker request failed" }, { status: 503 });
  }

  const autoPublished = await autoProcessIntelUpdates();

  return NextResponse.json({ ...((worker.data as object) ?? {}), autoPublished });
}
