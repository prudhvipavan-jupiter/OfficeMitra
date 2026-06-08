export async function triggerIntelligenceWorker(): Promise<{
  ok: boolean;
  data?: unknown;
  error?: string;
}> {
  const workerUrl = process.env.INTELLIGENCE_WORKER_URL;
  const apiKey = process.env.INTELLIGENCE_API_KEY;

  if (!workerUrl || !apiKey) {
    return {
      ok: false,
      error: "INTELLIGENCE_WORKER_URL and INTELLIGENCE_API_KEY are not configured",
    };
  }

  try {
    const res = await fetch(`${workerUrl.replace(/\/$/, "")}/monitor/run`, {
      method: "POST",
      headers: { "X-Intelligence-Key": apiKey },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: (data as { detail?: string }).detail ?? "Worker request failed" };
    }
    return { ok: true, data };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Worker unreachable",
    };
  }
}
