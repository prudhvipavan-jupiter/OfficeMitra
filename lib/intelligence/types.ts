export type IntelUpdateStatus =
  | "NEW"
  | "DRAFT_GENERATED"
  | "APPROVED"
  | "REJECTED"
  | "PUBLISHED";

export type IntelCheckMethod = "rss" | "html_links" | "page_hash";

export interface IntelSource {
  id: string;
  name: string;
  url: string;
  category: string;
  active: boolean;
  check_method: IntelCheckMethod;
  feed_url: string | null;
  link_selector: string | null;
  config: Record<string, unknown>;
  last_checked: string | null;
  last_update_found: string | null;
  created_at: string;
  updated_at: string;
}

export interface IntelDetectedUpdate {
  id: string;
  source_id: string;
  title: string;
  source_url: string;
  published_date: string | null;
  fingerprint: string;
  status: IntelUpdateStatus;
  detected_at: string;
  ai_title: string | null;
  ai_summary: string | null;
  ai_what_changed: string | null;
  ai_who_affected: string | null;
  ai_action_required: string | null;
  ai_reference_source: string | null;
  ai_department_impact: string | null;
  ai_keywords: string[];
  ai_body: string | null;
  admin_notes: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  published_at: string | null;
  published_slug: string | null;
  created_at: string;
  updated_at: string;
  source?: IntelSource;
}

export interface IntelMonitoringRun {
  id: string;
  started_at: string;
  finished_at: string | null;
  status: "running" | "completed" | "failed";
  sources_checked: number;
  items_found: number;
  drafts_generated: number;
  error_message: string | null;
  details: Record<string, unknown>;
}

export interface IntelActivityLog {
  id: string;
  event_type: string;
  message: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface IntelDashboardStats {
  detected_today: number;
  pending_review: number;
  published_today: number;
  sources_monitored: number;
  active_sources: number;
  last_run: IntelMonitoringRun | null;
}

export type IntelTab = "NEW" | "DRAFT_GENERATED" | "APPROVED" | "PUBLISHED" | "REJECTED";

export const INTEL_STATUS_TABS: { key: IntelTab; label: string }[] = [
  { key: "NEW", label: "New Updates" },
  { key: "DRAFT_GENERATED", label: "Drafts" },
  { key: "APPROVED", label: "Approved" },
  { key: "PUBLISHED", label: "Published" },
  { key: "REJECTED", label: "Rejected" },
];
