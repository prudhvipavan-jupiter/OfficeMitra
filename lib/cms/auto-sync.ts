import { syncCmsFromFiles } from "./seed";
import { isNextBuildPhase } from "@/lib/runtime";

let syncStarted = false;

function autoSyncEnabled(): boolean {
  return process.env.CMS_AUTO_SYNC !== "false";
}

/** Sync empty CMS content types from git files (runs once per server process). */
export async function ensureCmsAutoSync(): Promise<Record<string, number | string>> {
  if (isNextBuildPhase() || !autoSyncEnabled() || syncStarted) return {};
  syncStarted = true;

  try {
    const counts = await syncCmsFromFiles({ onlyEmpty: true });
    const synced = Object.entries(counts).filter(([, v]) => typeof v === "number" && v > 0);
    if (synced.length > 0) {
      console.info("[OfficeMitra] CMS auto-sync:", Object.fromEntries(synced));
    }
    return counts;
  } catch (err) {
    console.error("[OfficeMitra] CMS auto-sync failed:", err);
    return {};
  }
}
