import { siteConfig } from "./metadata";

interface ExpertRequestEmail {
  reference_number: string;
  name: string;
  email: string;
  service_type: string;
  institution: string;
}

interface StatusUpdateEmail {
  reference_number: string;
  name: string;
  email: string;
  status: string;
  response_notes?: string;
}

async function sendEmail(payload: {
  to: string[];
  bcc?: string[];
  subject: string;
  text: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[Email]", payload.subject);
    console.log(`To: ${payload.to.join(", ")}`);
    console.log(payload.text);
    return { sent: false, logged: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM ?? "OfficeMitra <noreply@theofficemitra.com>",
        to: payload.to,
        bcc: payload.bcc,
        subject: payload.subject,
        text: payload.text,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[Email] Resend error:", err);
      return { sent: false, error: err };
    }

    return { sent: true };
  } catch (e) {
    console.error("[Email] Resend failed:", e);
    return { sent: false, error: String(e) };
  }
}

export async function sendExpertConfirmation(data: ExpertRequestEmail) {
  const trackUrl = `${siteConfig.url}/expert-assistance/track?ref=${encodeURIComponent(data.reference_number)}`;
  const subject = `OfficeMitra Expert Assistance — ${data.reference_number}`;
  const body = `
Dear ${data.name},

Your Expert Assistance request has been received.

Reference: ${data.reference_number}
Service: ${data.service_type}
Institution: ${data.institution}

We aim to respond within 2-3 working days at ${data.email}.

Track your request: ${trackUrl}

This guidance is based on administrative practice, not legal advice.

— OfficeMitra
`.trim();

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@theofficemitra.com";

  return sendEmail({
    to: [data.email],
    bcc: [adminEmail],
    subject,
    text: body,
  });
}

export async function sendStatusUpdate(data: StatusUpdateEmail) {
  const trackUrl = `${siteConfig.url}/expert-assistance/track?ref=${encodeURIComponent(data.reference_number)}`;
  const statusLabel = data.status.replace(/_/g, " ");
  const subject = `OfficeMitra — Update on ${data.reference_number}`;

  const body = `
Dear ${data.name},

Your Expert Assistance request has been updated.

Reference: ${data.reference_number}
Status: ${statusLabel}
${data.response_notes ? `\nGuidance:\n${data.response_notes}\n` : ""}
Track your request: ${trackUrl}

This guidance is based on administrative practice, not legal advice.

— OfficeMitra
`.trim();

  return sendEmail({
    to: [data.email],
    subject,
    text: body,
  });
}
