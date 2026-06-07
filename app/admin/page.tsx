"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BookOpen,
  FileText,
  FolderOpen,
  ListTodo,
  MessageCircle,
  Newspaper,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { expertResponseTemplates } from "@/lib/expert-templates";
import { serviceTypeLabels, type ServiceType } from "@/lib/expert-assistance";

interface RequestRow {
  id: string;
  reference_number: string;
  created_at: string;
  status: string;
  name: string;
  designation: string;
  email: string;
  institution: string;
  service_type: ServiceType;
  case_summary: string;
  response_notes?: string;
}

interface DiscussionRow {
  id: string;
  created_at: string;
  status: string;
  author_name: string;
  designation: string;
  institution: string;
  category: string;
  title: string;
  body: string;
  replies: { id: string; author: string; body: string; created_at: string; is_official: boolean }[];
}

const stats = [
  { label: "Articles", href: "/knowledge", icon: BookOpen, count: 8 },
  { label: "Procedures", href: "/procedures", icon: ListTodo, count: 8 },
  { label: "Documents", href: "/documents", icon: FolderOpen, count: 20 },
  { label: "Templates", href: "/templates", icon: FileText, count: 8 },
  { label: "Updates", href: "/updates", icon: Newspaper, count: 5 },
];

export default function AdminDashboard() {
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [discussions, setDiscussions] = useState<DiscussionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [draftNotes, setDraftNotes] = useState<Record<string, string>>({});
  const [discussionReplies, setDiscussionReplies] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/requests").then((r) => r.json()),
      fetch("/api/admin/discussions").then((r) => r.json()),
    ])
      .then(([reqData, discData]) => {
        const rows = (reqData.requests ?? []) as RequestRow[];
        setRequests(rows);
        const notes: Record<string, string> = {};
        rows.forEach((r) => {
          notes[r.id] = r.response_notes ?? "";
        });
        setDraftNotes(notes);

        const discs = (discData.discussions ?? []) as DiscussionRow[];
        setDiscussions(discs);
        const replies: Record<string, string> = {};
        discs.forEach((d) => {
          replies[d.id] = "";
        });
        setDiscussionReplies(replies);
      })
      .finally(() => setLoading(false));
  }, []);

  async function saveRequest(id: string, status: string, notifyUser: boolean) {
    setSaving(id);
    await fetch("/api/admin/requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        status,
        response_notes: draftNotes[id] ?? "",
        notify_user: notifyUser,
      }),
    });
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status, response_notes: draftNotes[id] ?? "" }
          : r
      )
    );
    setSaving(null);
  }

  function applyTemplate(id: string, key: string) {
    const template = expertResponseTemplates[key];
    if (template) {
      setDraftNotes((prev) => ({ ...prev, [id]: template.body }));
    }
  }

  async function saveDiscussion(id: string, status: string) {
    setSaving(id);
    const reply = discussionReplies[id]?.trim();
    await fetch("/api/admin/discussions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        status,
        ...(reply
          ? { reply_body: reply, reply_author: "OfficeMitra Moderator" }
          : {}),
      }),
    });
    const res = await fetch("/api/admin/discussions");
    const data = await res.json();
    setDiscussions((data.discussions ?? []) as DiscussionRow[]);
    setDiscussionReplies((prev) => ({ ...prev, [id]: "" }));
    setSaving(null);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <Container className="py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeading title="Admin Dashboard" subtitle="Expert requests, community moderation & templates" />
        <div className="flex items-center gap-4">
          <Link
            href="/admin/intelligence"
            className="rounded-lg bg-gold-600 px-4 py-2 text-sm font-medium text-white hover:bg-gold-500"
          >
            Intelligence Engine
          </Link>
          <button
            type="button"
            onClick={logout}
            className="text-sm text-navy-700 hover:underline"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map(({ label, href, icon: Icon, count }) => (
          <Link
            key={label}
            href={href}
            className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm hover:border-navy-700"
          >
            <Icon className="h-7 w-7 text-navy-700" />
            <p className="mt-2 text-2xl font-bold text-navy-900">{count}</p>
            <p className="text-sm text-gray-600">{label}</p>
          </Link>
        ))}
        <div className="rounded-xl border border-gold-200 bg-gold-50 p-5">
          <MessageCircle className="h-7 w-7 text-gold-600" />
          <p className="mt-2 text-2xl font-bold text-navy-900">{requests.length}</p>
          <p className="text-sm text-gray-600">Expert Requests</p>
        </div>
        <div className="rounded-xl border border-navy-100 bg-white p-5">
          <MessageCircle className="h-7 w-7 text-navy-700" />
          <p className="mt-2 text-2xl font-bold text-navy-900">
            {discussions.filter((d) => d.status === "pending").length}
          </p>
          <p className="text-sm text-gray-600">Pending Community</p>
        </div>
      </div>

      <section id="discussions" className="mt-12">
        <h2 className="text-lg font-semibold text-navy-900">Community Discussions</h2>
        {loading ? (
          <p className="mt-4 text-gray-500">Loading...</p>
        ) : discussions.length === 0 ? (
          <p className="mt-4 text-gray-500">No discussions yet.</p>
        ) : (
          <div className="mt-4 space-y-6">
            {discussions.map((disc) => (
              <div
                key={disc.id}
                className="rounded-xl border border-navy-100 bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{disc.title}</p>
                    <p className="mt-1 text-sm text-gray-600">
                      {disc.author_name} · {disc.designation} · {disc.institution}
                    </p>
                    <p className="mt-2 text-sm text-gray-700">{disc.body}</p>
                    {disc.replies.length > 0 && (
                      <div className="mt-3 rounded-lg bg-navy-50 p-3 text-sm">
                        <p className="font-semibold">Published replies: {disc.replies.length}</p>
                        {disc.replies.map((r) => (
                          <p key={r.id} className="mt-1 text-gray-700">
                            {r.author}: {r.body.slice(0, 120)}…
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      disc.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : disc.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {disc.status}
                  </span>
                </div>
                <div className="mt-4">
                  <label className="text-xs font-semibold uppercase text-gray-500">
                    Official reply (published with answer)
                  </label>
                  <textarea
                    rows={4}
                    value={discussionReplies[disc.id] ?? ""}
                    onChange={(e) =>
                      setDiscussionReplies((prev) => ({
                        ...prev,
                        [disc.id]: e.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={saving === disc.id}
                    onClick={() => saveDiscussion(disc.id, "published")}
                    className="rounded-lg bg-navy-700 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600 disabled:opacity-50"
                  >
                    Publish with reply
                  </button>
                  <button
                    type="button"
                    disabled={saving === disc.id}
                    onClick={() => saveDiscussion(disc.id, "closed")}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section id="requests" className="mt-12">
        <h2 className="text-lg font-semibold text-navy-900">Expert Requests</h2>
        {loading ? (
          <p className="mt-4 text-gray-500">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="mt-4 text-gray-500">No requests yet.</p>
        ) : (
          <div className="mt-4 space-y-6">
            {requests.map((req) => (
              <div
                key={req.id}
                className="rounded-xl border border-navy-100 bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm font-bold">{req.reference_number}</p>
                    <p className="mt-1 font-medium">
                      {req.name} — {req.designation}
                    </p>
                    <p className="text-sm text-gray-600">
                      {req.institution} · {req.email}
                    </p>
                    <p className="mt-2 text-sm">{serviceTypeLabels[req.service_type]}</p>
                    <p className="mt-2 text-sm text-gray-700">{req.case_summary}</p>
                  </div>
                  <select
                    value={req.status}
                    onChange={(e) =>
                      setRequests((prev) =>
                        prev.map((r) =>
                          r.id === req.id ? { ...r, status: e.target.value } : r
                        )
                      )
                    }
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                    aria-label="Update status"
                  >
                    <option value="pending">Pending</option>
                    <option value="assigned">Assigned</option>
                    <option value="in_review">In Review</option>
                    <option value="responded">Responded</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label className="text-xs font-semibold uppercase text-gray-500">
                    Response template
                  </label>
                  <select
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:max-w-xs"
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value) applyTemplate(req.id, e.target.value);
                      e.target.value = "";
                    }}
                  >
                    <option value="">Insert template…</option>
                    {Object.entries(expertResponseTemplates).map(([key, tpl]) => (
                      <option key={key} value={key}>
                        {tpl.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-3">
                  <label
                    htmlFor={`notes-${req.id}`}
                    className="text-xs font-semibold uppercase text-gray-500"
                  >
                    Response notes (emailed to user when saved)
                  </label>
                  <textarea
                    id={`notes-${req.id}`}
                    rows={6}
                    value={draftNotes[req.id] ?? ""}
                    onChange={(e) =>
                      setDraftNotes((prev) => ({ ...prev, [req.id]: e.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={saving === req.id}
                    onClick={() => saveRequest(req.id, req.status, false)}
                    className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50 disabled:opacity-50"
                  >
                    Save draft
                  </button>
                  <button
                    type="button"
                    disabled={saving === req.id}
                    onClick={() => saveRequest(req.id, req.status, true)}
                    className="rounded-lg bg-navy-700 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600 disabled:opacity-50"
                  >
                    Save & email user
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}
