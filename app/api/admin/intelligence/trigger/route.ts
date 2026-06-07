import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const workerUrl = process.env.INTELLIGENCE_WORKER_URL;
  const apiKey = process.env.INTELLIGENCE_API_KEY;

  if (!workerUrl || !apiKey) {
    return NextResponse.json(
      {
        error:
          "Set INTELLIGENCE_WORKER_URL and INTELLIGENCE_API_KEY to trigger the Python worker",
      },
      { status: 503 }
    );
  }

  const res = await fetch(`${workerUrl.replace(/\/$/, "")}/monitor/run`, {
    method: "POST",
    headers: { "X-Intelligence-Key": apiKey },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(
      { error: data.detail ?? "Worker request failed" },
      { status: res.status }
    );
  }

  return NextResponse.json(data);
}
