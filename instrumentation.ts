export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { ensureCmsAutoSync } = await import("./lib/cms/auto-sync");
    ensureCmsAutoSync().catch((err) => {
      console.error("[OfficeMitra] Startup CMS sync error:", err);
    });
  }
}
