"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { useLocale } from "@/components/i18n/LanguageProvider";
import { buildWhatsAppShareText } from "@/lib/share-text";
import { cn } from "@/lib/utils";

interface WhatsAppShareProps {
  title: string;
  url: string;
  slug?: string;
  contentType?: "article" | "procedure" | "update" | "tool";
  className?: string;
  compact?: boolean;
}

export function WhatsAppShare({
  title,
  url,
  slug,
  contentType = "article",
  className,
  compact = false,
}: WhatsAppShareProps) {
  const t = useTranslations();
  const locale = useLocale();

  const text = slug
    ? buildWhatsAppShareText(
        { title, slug, type: contentType },
        locale === "te" ? "te" : "en"
      )
    : `${title}\n\n${url}`;

  const href = `https://wa.me/?text=${encodeURIComponent(text)}`;
  const label = compact ? t.whatsapp.short : t.whatsapp.share;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "no-print inline-flex items-center gap-2 rounded-lg border border-[#25D366]/30 bg-[#25D366]/10 font-medium text-[#128C7E] transition hover:bg-[#25D366]/20",
        compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
        className
      )}
      aria-label={label}
    >
      <MessageCircle className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {label}
    </a>
  );
}
