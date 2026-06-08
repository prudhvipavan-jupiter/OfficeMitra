export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { isNextBuildPhase } = await import("./lib/runtime");
    if (isNextBuildPhase()) return;
    const { ensureCmsAutoSync } = await import("./lib/cms/auto-sync");
    ensureCmsAutoSync().catch((err) => {
      console.error("[OfficeMitra] Startup CMS sync error:", err);
    });
  }
}
