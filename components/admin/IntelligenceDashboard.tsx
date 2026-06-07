"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Eye,
  Play,
  Radio,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import type {
  IntelActivityLog,
  IntelDashboardStats,
  IntelDetectedUpdate,
  IntelSource,
  IntelTab,
} from "@/lib/intelligence/types";
import { INTEL_STATUS_TABS } from "@/lib/intelligence/types";
import { formatDate } from "@/lib/utils";

interface DashboardData {
  stats: IntelDashboardStats;
  updates: IntelDetectedUpdate[];
  sources: IntelSource[];
  activity: IntelActivityLog[];
}

export function IntelligenceDashboard() {
  const [tab, setTab] = useState<IntelTab>("DRAFT_GENERATED");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<IntelDetectedUpdate | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<IntelDetectedUpdate>>({});
  const [triggering, setTriggering] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async (status?: IntelTab) => {
    setLoading(true);
    setError("");
    try {
      const qs = status ? `?status=${status}` : "";
      const res = await fetch(`/api/admin/intelligence${qs}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to load");
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(tab);
  }, [tab, load]);

  function openEdit(update: IntelDetectedUpdate) {
    setSelected(update);
    setEditDraft({
      ai_title: update.ai_title ?? update.title,
      ai_summary: update.ai_summary ?? "",
      ai_what_changed: update.ai_what_changed ?? "",
      ai_who_affected: update.ai_who_affected ?? "",
      ai_action_required: update.ai_action_required ?? "",
      ai_reference_source: update.ai_reference_source ?? "",
      ai_department_impact: update.ai_department_impact ?? "",
      ai_body: update.ai_body ?? "",
      admin_notes: update.admin_notes ?? "",
    });
  }

  async function patchUpdate(id: string, action: string, fields?: Record<string, unknown>) {
    setSaving(true);
    await fetch(`/api/admin/intelligence/updates/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, fields }),
    });
    setSaving(false);
    setSelected(null);
    load(tab);
  }

  async function publishUpdate(id: string) {
    setSaving(true);
    await fetch(`/api/admin/intelligence/updates/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "publish" }),
    });
    setSaving(false);
    setSelected(null);
    load(tab);
  }

  async function saveEdits() {
    if (!selected) return;
    setSaving(true);
    await fetch(`/api/admin/intelligence/updates/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: editDraft }),
    });
    setSaving(false);
    load(tab);
  }

  async function triggerMonitor() {
    setTriggering(true);
    await fetch("/api/admin/intelligence/trigger", { method: "POST" });
    setTriggering(false);
    load(tab);
  }

  const stats = data?.stats;

  return (
    <Container className="py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-widest text-gold-600 uppercase">
            Admin
          </p>
          <SectionHeading
            title="OfficeMitra Intelligence"
            subtitle="Government source monitoring — detect, draft, review, publish. Nothing auto-publishes."
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin"
            className="rounded-lg border border-navy-200 px-4 py-2 text-sm text-navy-700 hover:bg-navy-50"
          >
            ← Admin Home
          </Link>
          <button
            type="button"
            onClick={() => load(tab)}
            className="inline-flex items-center gap-2 rounded-lg border border-navy-200 px-4 py-2 text-sm text-navy-700 hover:bg-navy-50"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button
            type="button"
            disabled={triggering}
            onClick={triggerMonitor}
            className="inline-flex items-center gap-2 rounded-lg bg-navy-700 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600 disabled:opacity-50"
          >
            <Play className="h-4 w-4" />
            {triggering ? "Running…" : "Run Monitor Now"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {stats && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Detected Today" value={stats.detected_today} icon={Radio} />
          <StatCard label="Pending Review" value={stats.pending_review} icon={Eye} />
          <StatCard label="Published Today" value={stats.published_today} icon={CheckCircle2} />
          <StatCard
            label="Sources Monitored"
            value={`${stats.active_sources}/${stats.sources_monitored}`}
            icon={Activity}
          />
          <div className="rounded-xl border border-navy-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-gray-500">Last Run</p>
            <p className="mt-1 text-sm font-medium text-navy-900">
              {stats.last_run
                ? formatDate(stats.last_run.started_at)
                : "Not yet run"}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {stats.last_run?.status ?? "—"}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-2 border-b border-navy-100 pb-1">
        {INTEL_STATUS_TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`rounded-t-lg px-4 py-2 text-sm font-medium transition ${
              tab === t.key
                ? "bg-navy-700 text-white"
                : "text-navy-700 hover:bg-navy-50"
            }`}
          >
            {t.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setTab("NEW");
            load(undefined);
          }}
          className="ml-auto text-sm text-navy-600 hover:underline"
        >
          Sources ({data?.sources.length ?? 0})
        </button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          {loading ? (
            <p className="text-gray-500">Loading queue…</p>
          ) : !data?.updates.length ? (
            <p className="rounded-xl border border-dashed border-navy-200 bg-navy-50 px-6 py-12 text-center text-gray-600">
              No items in this queue.
            </p>
          ) : (
            <ul className="space-y-4">
              {data.updates.map((update) => (
                <li
                  key={update.id}
                  className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gold-700">
                        {update.source?.name ?? "Source"}
                      </p>
                      <h3 className="mt-1 font-semibold text-navy-900">
                        {update.ai_title ?? update.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                        {update.ai_summary ?? update.title}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        Detected {formatDate(update.detected_at)}
                      </p>
                    </div>
                    <StatusBadge status={update.status} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={update.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-navy-200 px-3 py-1.5 text-xs text-navy-700 hover:bg-navy-50"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Official source
                    </a>
                    <button
                      type="button"
                      onClick={() => openEdit(update)}
                      className="rounded-lg border border-navy-200 px-3 py-1.5 text-xs text-navy-700 hover:bg-navy-50"
                    >
                      View / Edit
                    </button>
                    {update.status === "DRAFT_GENERATED" && (
                      <>
                        <button
                          type="button"
                          disabled={saving}
                          onClick={() => patchUpdate(update.id, "approve")}
                          className="rounded-lg bg-green-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          disabled={saving}
                          onClick={() => patchUpdate(update.id, "reject")}
                          className="rounded-lg border border-red-300 px-3 py-1.5 text-xs text-red-700 hover:bg-red-50"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {update.status === "APPROVED" && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => publishUpdate(update.id)}
                        className="rounded-lg bg-gold-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-gold-500"
                      >
                        Publish
                      </button>
                    )}
                    {update.status === "PUBLISHED" && update.published_slug && (
                      <Link
                        href={`/updates/${update.published_slug}`}
                        className="rounded-lg bg-navy-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-navy-600"
                      >
                        View live
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside>
          <h3 className="font-semibold text-navy-900">Recent Activity</h3>
          <ul className="mt-3 max-h-96 space-y-2 overflow-y-auto text-sm">
            {(data?.activity ?? []).map((log) => (
              <li
                key={log.id}
                className="rounded-lg border border-navy-50 bg-navy-50/50 px-3 py-2"
              >
                <p className="text-xs text-gray-500">{formatDate(log.created_at)}</p>
                <p className="text-navy-800">{log.message}</p>
              </li>
            ))}
          </ul>

          <SourceManager sources={data?.sources ?? []} onChange={() => load(tab)} />
        </aside>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-navy-900">Review draft</h2>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Detected title (metadata only): {selected.title}
            </p>
            <div className="mt-4 space-y-3">
              {(
                [
                  ["ai_title", "Title"],
                  ["ai_summary", "Summary"],
                  ["ai_what_changed", "What changed"],
                  ["ai_who_affected", "Who is affected"],
                  ["ai_action_required", "Action required"],
                  ["ai_reference_source", "Reference source"],
                  ["ai_department_impact", "Department impact"],
                  ["ai_body", "Body (markdown)"],
                  ["admin_notes", "Admin notes"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <label className="text-xs font-semibold uppercase text-gray-500">
                    {label}
                  </label>
                  {key === "ai_body" || key === "ai_action_required" ? (
                    <textarea
                      rows={4}
                      value={(editDraft[key] as string) ?? ""}
                      onChange={(e) =>
                        setEditDraft((p) => ({ ...p, [key]: e.target.value }))
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                  ) : (
                    <input
                      value={(editDraft[key] as string) ?? ""}
                      onChange={(e) =>
                        setEditDraft((p) => ({ ...p, [key]: e.target.value }))
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={saving}
                onClick={saveEdits}
                className="rounded-lg bg-navy-700 px-4 py-2 text-sm font-medium text-white"
              >
                Save edits
              </button>
              {selected.status === "DRAFT_GENERATED" && (
                <button
                  type="button"
                  disabled={saving}
                  onClick={async () => {
                    await saveEdits();
                    await patchUpdate(selected.id, "approve", editDraft);
                  }}
                  className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white"
                >
                  Save & Approve
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-navy-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-navy-700" />
        <p className="text-xs font-semibold uppercase text-gray-500">{label}</p>
      </div>
      <p className="mt-2 text-2xl font-bold text-navy-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-800",
    DRAFT_GENERATED: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    PUBLISHED: "bg-navy-100 text-navy-800",
    REJECTED: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${colors[status] ?? "bg-gray-100"}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}

function SourceManager({
  sources,
  onChange,
}: {
  sources: IntelSource[];
  onChange: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    url: "",
    category: "General",
  });

  async function addSource(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/intelligence/sources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", url: "", category: "General" });
    setShowForm(false);
    onChange();
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-navy-900">Sources</h3>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="text-xs font-medium text-navy-700 hover:underline"
        >
          + Add source
        </button>
      </div>
      {showForm && (
        <form onSubmit={addSource} className="mt-3 space-y-2 rounded-lg border p-3">
          <input
            placeholder="Name"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded border px-2 py-1 text-sm"
          />
          <input
            placeholder="URL"
            required
            type="url"
            value={form.url}
            onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
            className="w-full rounded border px-2 py-1 text-sm"
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="w-full rounded border px-2 py-1 text-sm"
          />
          <button type="submit" className="rounded bg-navy-700 px-3 py-1 text-xs text-white">
            Save
          </button>
        </form>
      )}
      <ul className="mt-2 max-h-48 space-y-1 overflow-y-auto text-xs">
        {sources.map((s) => (
          <li key={s.id} className="flex items-center justify-between gap-2 rounded bg-white px-2 py-1">
            <span className="truncate text-navy-800">{s.name}</span>
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 ${s.active ? "bg-green-100 text-green-800" : "bg-gray-100"}`}
            >
              {s.active ? "On" : "Off"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
