import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  getIntelActivityLog,
  getIntelDashboardStats,
  getIntelSources,
  getIntelUpdates,
  isIntelligenceEnabled,
} from "@/lib/intelligence/store";

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isIntelligenceEnabled()) {
    return NextResponse.json(
      { error: "POSTGRES_URL required for Intelligence Engine" },
      { status: 503 }
    );
  }

  const view = request.nextUrl.searchParams.get("view");

  if (view === "activity") {
    return NextResponse.json({ activity: await getIntelActivityLog(30) });
  }

  const status = request.nextUrl.searchParams.get("status") ?? undefined;
  const [stats, updates, sources, activity] = await Promise.all([
    getIntelDashboardStats(),
    getIntelUpdates(status as Parameters<typeof getIntelUpdates>[0]),
    getIntelSources(),
    getIntelActivityLog(15),
  ]);

  return NextResponse.json({ stats, updates, sources, activity });
}
