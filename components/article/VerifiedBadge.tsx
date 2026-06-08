import { ShieldCheck } from "lucide-react";
import { getTranslations } from "@/lib/i18n/server";
import { formatDate } from "@/lib/utils";

interface VerifiedBadgeProps {
  verifiedAt?: string;
  note?: string;
}

export async function VerifiedBadge({ verifiedAt, note }: VerifiedBadgeProps) {
  if (!verifiedAt && !note) return null;

  const { dict: t } = await getTranslations();

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-200">
      <ShieldCheck className="h-3.5 w-3.5" />
      {verifiedAt
        ? t.verified.lastVerified.replace("{date}", formatDate(verifiedAt))
        : note}
    </span>
  );
}
