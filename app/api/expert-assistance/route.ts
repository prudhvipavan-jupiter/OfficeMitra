import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createExpertRequest } from "@/lib/db/requests";
import { sendExpertConfirmation } from "@/lib/email";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { serviceTypeLabels } from "@/lib/expert-assistance";

const requestSchema = z.object({
  name: z.string().min(2),
  designation: z.string().min(1),
  institution: z.string().min(1),
  department: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  service_type: z.enum([
    "draft_review",
    "rule_clarification",
    "establishment_guidance",
    "finance_guidance",
    "document_review",
  ]),
  case_summary: z.string().min(50),
  related_article_slug: z.string().optional(),
  disclaimer_accepted: z.literal(true),
});

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`expert:${ip}`, 5, 60 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: limited.retryAfter
            ? { "Retry-After": String(limited.retryAfter) }
            : undefined,
        }
      );
    }

    const body = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const record = await createExpertRequest({
      name: data.name,
      designation: data.designation,
      institution: data.institution,
      department: data.department,
      email: data.email,
      phone: data.phone,
      service_type: data.service_type,
      case_summary: data.case_summary,
      related_article_slug: data.related_article_slug,
    });

    await sendExpertConfirmation({
      reference_number: record.reference_number,
      name: data.name,
      email: data.email,
      service_type: serviceTypeLabels[data.service_type],
      institution: data.institution,
    });

    return NextResponse.json({
      success: true,
      reference_number: record.reference_number,
      message: "Request submitted successfully",
    });
  } catch (error) {
    console.error("[Expert Assistance] Error:", error);
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    );
  }
}
