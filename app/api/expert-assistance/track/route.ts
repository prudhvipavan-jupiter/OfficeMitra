import { NextRequest, NextResponse } from "next/server";
import { getExpertRequestByReference } from "@/lib/db/requests";

export async function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref");
  if (!ref) {
    return NextResponse.json({ error: "Reference required" }, { status: 400 });
  }
  const record = await getExpertRequestByReference(ref);
  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({
    reference_number: record.reference_number,
    status: record.status,
    created_at: record.created_at,
    service_type: record.service_type,
    responded_at: record.responded_at,
  });
}
