"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Plus, RefreshCw, Trash2 } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import type { CmsContentType, CmsRecord, CmsStatus } from "@/lib/cms/types";
import { CMS_TYPE_LABELS } from "@/lib/cms/types";

const MARKDOWN_TYPES: CmsContentType[] = ["article", "procedure", "update"];

interface ContentManagerProps {
  type: CmsContentType;
}

function itemTitle(item: CmsRecord): string {
  const d = item.data;
  return String(
    d.title ?? d.number ?? d.question ?? d.term ?? d.id ?? item.slug ?? item.id.slice(0, 8)
  );
}

export function ContentManager({ type }: ContentManagerProps) {
  const [items, setItems] = useState<CmsRecord[]>([]);
  const [storage, setStorage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"all" | CmsStatus>("all");
  const [editing, setEditing] = useState<CmsRecord | "new" | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/cms?type=${type}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to load");
      setItems(json.items ?? []);
      setStorage(json.storage ?? "");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    load();
  }, [load]);

  async function runSync(action: "sync" | "seed", force = false) {
    setSaving(true);
    await fetch("/api/admin/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, force, type }),
    });
    setSaving(false);
    await load();
  }

  async function publishAllDrafts() {
    const drafts = items.filter((i) => i.status === "draft");
    if (drafts.length === 0) return;
    if (!confirm(`Publish all ${drafts.length} draft items? They will appear on the public site.`)) return;
    setSaving(true);
    for (const item of drafts) {
      await fetch(`/api/admin/cms/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "published", data: item.data, body: item.body }),
      });
    }
    setSaving(false);
    await load();
  }

  async function seedImport(force = false) {
    if (force && !confirm("Reset this section and re-import everything from files?")) return;
    await runSync(force ? "seed" : "sync", force);
  }

  const filtered =
    statusFilter === "all" ? items : items.filter((i) => i.status === statusFilter);
  const draftCount = items.filter((i) => i.status === "draft").length;

  async function remove(id: string) {
    if (!confirm("Delete this item permanently?")) return;
    await fetch(`/api/admin/cms/${id}`, { method: "DELETE" });
    await load();
    setEditing(null);
  }

  return (
    <Container className="py-8">
      <Link
        href="/admin/content"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-700 hover:text-gold-700"
      >
        <ArrowLeft className="h-4 w-4" />
        All content
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <SectionHeading
          title={CMS_TYPE_LABELS[type]}
          subtitle={`Create, edit, publish, or delete ${CMS_TYPE_LABELS[type].toLowerCase()}. Storage: ${storage || "…"}`}
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => load()}
            className="inline-flex items-center gap-1 rounded-lg border border-navy-200 px-3 py-2 text-sm"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => seedImport(false)}
            disabled={saving}
            className="rounded-lg border border-navy-200 px-3 py-2 text-sm"
          >
            Sync from files
          </button>
          <button
            type="button"
            onClick={() => seedImport(true)}
            disabled={saving}
            className="rounded-lg border border-amber-200 px-3 py-2 text-sm text-amber-900"
          >
            Reset &amp; reimport
          </button>
          <button
            type="button"
            onClick={() => setEditing("new")}
            className="inline-flex items-center gap-1 rounded-lg bg-navy-700 px-3 py-2 text-sm font-medium text-white"
          >
            <Plus className="h-4 w-4" />
            Add new
          </button>
          {draftCount > 0 && (
            <button
              type="button"
              onClick={publishAllDrafts}
              disabled={saving}
              className="rounded-lg bg-gold-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              Publish all drafts ({draftCount})
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="text-xs font-semibold uppercase text-gray-500">Filter</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | CmsStatus)}
          className="rounded-lg border border-navy-200 px-3 py-1.5 text-sm"
        >
          <option value="all">All ({items.length})</option>
          <option value="draft">Draft ({draftCount})</option>
          <option value="published">Published ({items.filter((i) => i.status === "published").length})</option>
          <option value="archived">Archived ({items.filter((i) => i.status === "archived").length})</option>
        </select>
        {type === "article" && draftCount > 0 && (
          <span className="text-xs text-amber-800 dark:text-amber-200">
            {draftCount} articles awaiting your review — edit and set status to Published when approved.
          </span>
        )}
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="mt-6 text-gray-500">Loading…</p>
      ) : (
        <ul className="mt-6 divide-y divide-navy-100 rounded-xl border border-navy-100 bg-white dark:divide-navy-700 dark:border-navy-700 dark:bg-navy-800/80">
          {filtered.length === 0 && (
            <li className="p-6 text-center text-sm text-gray-500">
              {items.length === 0
                ? 'No items yet. Run "Sync from files" or "Add new".'
                : "No items match this filter."}
            </li>
          )}
          {filtered.map((item) => (
            <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <p className="font-medium text-navy-900 dark:text-white">
                  {itemTitle(item)}
                  {item.data.priority === 1 && (
                    <span className="ml-2 rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-bold uppercase text-gold-800">
                      Week 1
                    </span>
                  )}
                  {item.status === "draft" && (
                    <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-900">
                      Review
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-500">
                  {item.status} · {String(item.data.category ?? "—")} · {item.slug ?? "no slug"} · updated{" "}
                  {new Date(item.updated_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(item)}
                  className="rounded-lg bg-navy-100 px-3 py-1.5 text-sm font-medium text-navy-800 dark:bg-navy-700 dark:text-white"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="rounded-lg border border-red-200 p-1.5 text-red-600"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <EditPanel
          type={type}
          item={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}
    </Container>
  );
}

function EditPanel({
  type,
  item,
  onClose,
  onSaved,
}: {
  type: CmsContentType;
  item: CmsRecord | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isNew = !item;
  const [status, setStatus] = useState<CmsStatus>(item?.status ?? "draft");
  const [slug, setSlug] = useState(item?.slug ?? "");
  const [dataJson, setDataJson] = useState(JSON.stringify(item?.data ?? defaultData(type), null, 2));
  const [body, setBody] = useState(item?.body ?? defaultBody(type));
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function save() {
    setSaving(true);
    setErr("");
    try {
      const data = JSON.parse(dataJson) as Record<string, unknown>;

      if (isNew) {
        const res = await fetch("/api/admin/cms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content_type: type, slug, status, data, body: MARKDOWN_TYPES.includes(type) ? body : null }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Create failed");
        if (file && (type === "document" || type === "template")) {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("field", type === "document" ? "file" : "file_pdf");
          await fetch(`/api/admin/cms/${json.item.id}`, { method: "PATCH", body: fd });
        }
      } else {
        const res = await fetch(`/api/admin/cms/${item.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug, status, data, body: MARKDOWN_TYPES.includes(type) ? body : null }),
        });
        if (!res.ok) throw new Error("Update failed");
        if (file && (type === "document" || type === "template")) {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("field", type === "document" ? "file" : "file_pdf");
          await fetch(`/api/admin/cms/${item.id}`, { method: "PATCH", body: fd });
        }
      }
      onSaved();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-navy-100 bg-white p-6 shadow-xl dark:border-navy-700 dark:bg-navy-900">
        <h2 className="text-lg font-bold text-navy-900 dark:text-white">
          {isNew ? "Add" : "Edit"} {CMS_TYPE_LABELS[type].slice(0, -1)}
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase text-gray-500">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as CmsStatus)} className="input-field mt-1">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-gray-500">Slug / ID</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} className="input-field mt-1" />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-xs font-semibold uppercase text-gray-500">Metadata (JSON)</label>
          <textarea
            rows={12}
            value={dataJson}
            onChange={(e) => setDataJson(e.target.value)}
            className="input-field mt-1 font-mono text-xs"
          />
        </div>

        {MARKDOWN_TYPES.includes(type) && (
          <div className="mt-4">
            <label className="text-xs font-semibold uppercase text-gray-500">Body (Markdown)</label>
            <textarea rows={10} value={body} onChange={(e) => setBody(e.target.value)} className="input-field mt-1 font-mono text-xs" />
          </div>
        )}

        {(type === "document" || type === "template") && (
          <div className="mt-4">
            <label className="text-xs font-semibold uppercase text-gray-500">Upload file (PDF)</label>
            <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mt-1 block w-full text-sm" />
          </div>
        )}

        {err && <p className="mt-3 text-sm text-red-600">{err}</p>}

        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" onClick={save} disabled={saving} className="rounded-lg bg-gold-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
            {saving ? "Saving…" : "Save"}
          </button>
          <button type="button" onClick={onClose} className="rounded-lg border border-navy-200 px-4 py-2 text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function defaultData(type: CmsContentType): Record<string, unknown> {
  switch (type) {
    case "document":
      return {
        id: "new-document-id",
        title: "New document",
        type: "go",
        number: "GO Ms.No. —",
        date: new Date().toISOString().slice(0, 10),
        department: "Finance Department",
        category: "finance",
        year: new Date().getFullYear(),
        subject: "Subject line",
        related_articles: [],
      };
    case "article":
      return {
        title: "New article",
        slug: "new-article",
        category: "establishment",
        summary: "Summary",
        status: "draft",
        published_at: new Date().toISOString().slice(0, 10),
      };
    case "procedure":
      return {
        title: "New procedure",
        slug: "new-procedure",
        category: "establishment",
        summary: "Summary",
        status: "draft",
        published_at: new Date().toISOString().slice(0, 10),
      };
    case "update":
      return {
        title: "New update",
        slug: "new-update",
        date: new Date().toISOString().slice(0, 10),
        category: "finance",
        what_changed: "",
        who_is_affected: "",
        action_required: "",
        status: "draft",
      };
    case "template":
      return {
        id: "new-template",
        title: "New template",
        category: "establishment",
        description: "",
        usage_notes: "",
        related_articles: [],
        related_procedures: [],
      };
    case "faq":
      return { id: "new-faq", category: "General", question: "Question?", answer: "Answer." };
    case "glossary":
      return { term: "Term", definition: "Definition", category: "General" };
  }
}

function defaultBody(type: CmsContentType): string {
  if (!MARKDOWN_TYPES.includes(type)) return "";
  return "## Overview\n\nWrite content here.\n";
}
