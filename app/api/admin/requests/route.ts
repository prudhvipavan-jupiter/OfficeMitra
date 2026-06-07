import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getExpertRequests, updateExpertRequest } from "@/lib/db/requests";
import { sendStatusUpdate } from "@/lib/email";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ requests: await getExpertRequests() });
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { id, status, response_notes, notify_user } = body;
  if (!id || !status) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = (await getExpertRequests()).find((r) => r.id === id);
  const updated = await updateExpertRequest(id, { status, response_notes });
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const shouldNotify =
    notify_user !== false &&
    response_notes &&
    (status === "responded" || status === "in_review") &&
    existing?.status !== status;

  if (shouldNotify) {
    await sendStatusUpdate({
      reference_number: updated.reference_number,
      name: updated.name,
      email: updated.email,
      status: updated.status,
      response_notes: response_notes,
    });
  }

  return NextResponse.json({ request: updated });
}
