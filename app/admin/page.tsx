"use client";



import Link from "next/link";

import { useEffect, useMemo, useState } from "react";

import {

  BookOpen,

  FileText,

  FolderOpen,

  ListTodo,

  Mail,

  MessageCircle,

  Newspaper,

  Wrench,

} from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/Container";

import { expertResponseTemplates } from "@/lib/expert-templates";

import { serviceTypeLabels, type ServiceType } from "@/lib/expert-assistance";

import { formatDate } from "@/lib/utils";



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



interface Overview {

  content: {

    articles: number;

    procedures: number;

    documents: number;

    templates: number;

    updates: number;

    tools: number;

  };

  queue: {

    expertRequests: number;

    pendingExpert: number;

    pendingCommunity: number;

    publishedCommunity: number;

    resolvedCommunity: number;

    subscribers: number;

  };

  activity: { action: string; detail: Record<string, string>; at: string }[];

}



type QueueFilter = "all" | "pending" | "published" | "resolved";



export default function AdminDashboard() {

  const [requests, setRequests] = useState<RequestRow[]>([]);

  const [discussions, setDiscussions] = useState<DiscussionRow[]>([]);

  const [overview, setOverview] = useState<Overview | null>(null);

  const [loading, setLoading] = useState(true);

  const [draftNotes, setDraftNotes] = useState<Record<string, string>>({});

  const [discussionReplies, setDiscussionReplies] = useState<Record<string, string>>({});

  const [saving, setSaving] = useState<string | null>(null);

  const [queueFilter, setQueueFilter] = useState<QueueFilter>("pending");



  useEffect(() => {

    Promise.all([

      fetch("/api/admin/overview").then((r) => r.json()),

      fetch("/api/admin/requests").then((r) => r.json()),

      fetch("/api/admin/discussions").then((r) => r.json()),

    ])

      .then(([overviewData, reqData, discData]) => {

        setOverview(overviewData as Overview);



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



  const filteredDiscussions = useMemo(() => {

    if (queueFilter === "all") return discussions;

    return discussions.filter((d) => d.status === queueFilter);

  }, [discussions, queueFilter]);



  const contentStats = [

    { label: "Articles", href: "/admin/content/article", icon: BookOpen, count: overview?.content.articles ?? "—" },

    { label: "Procedures", href: "/admin/content/procedure", icon: ListTodo, count: overview?.content.procedures ?? "—" },

    { label: "Documents", href: "/admin/content/document", icon: FolderOpen, count: overview?.content.documents ?? "—" },

    { label: "Templates", href: "/admin/content/template", icon: FileText, count: overview?.content.templates ?? "—" },

    { label: "Updates", href: "/admin/content/update", icon: Newspaper, count: overview?.content.updates ?? "—" },

    { label: "Tools", href: "/tools", icon: Wrench, count: overview?.content.tools ?? "—" },

  ];



  async function refreshOverview() {

    const res = await fetch("/api/admin/overview");

    if (res.ok) setOverview(await res.json());

  }



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

        r.id === id ? { ...r, status, response_notes: draftNotes[id] ?? "" } : r

      )

    );

    setSaving(null);

    await refreshOverview();

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

        ...(reply ? { reply_body: reply, reply_author: "OfficeMitra Moderator" } : {}),

      }),

    });

    const res = await fetch("/api/admin/discussions");

    const data = await res.json();

    setDiscussions((data.discussions ?? []) as DiscussionRow[]);

    setDiscussionReplies((prev) => ({ ...prev, [id]: "" }));

    setSaving(null);

    await refreshOverview();

  }



  return (

    <Container className="py-8 md:py-10">

      <SectionHeading

        title="Dashboard"

        subtitle="Moderate community questions, respond to expert requests, and monitor platform activity."

      />



      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <QueueCard

          label="Pending community"

          value={overview?.queue.pendingCommunity ?? "—"}

          tone="gold"

        />

        <QueueCard

          label="Expert requests"

          value={overview?.queue.expertRequests ?? "—"}

          sub={`${overview?.queue.pendingExpert ?? 0} pending`}

        />

        <QueueCard

          label="Digest subscribers"

          value={overview?.queue.subscribers ?? "—"}

          icon={Mail}

        />

        <QueueCard

          label="Resolved Q&A"

          value={overview?.queue.resolvedCommunity ?? "—"}

        />

      </div>



      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

        {contentStats.map(({ label, href, icon: Icon, count }) => (

          <Link

            key={label}

            href={href}

            className="rounded-xl border border-navy-100 bg-white p-4 shadow-sm transition hover:border-navy-300 dark:border-navy-700 dark:bg-navy-800/80 dark:hover:border-navy-500"

          >

            <Icon className="h-5 w-5 text-navy-700 dark:text-navy-200" />

            <p className="mt-2 text-xl font-bold text-navy-900 dark:text-white">{count}</p>

            <p className="text-xs text-gray-600 dark:text-navy-300">{label}</p>

          </Link>

        ))}

      </div>



      {overview && overview.activity.length > 0 && (

        <section className="mt-10">

          <h2 className="text-lg font-semibold text-navy-900 dark:text-white">Recent activity</h2>

          <ul className="mt-3 divide-y divide-navy-100 rounded-xl border border-navy-100 bg-white dark:divide-navy-700 dark:border-navy-700 dark:bg-navy-800/80">

            {overview.activity.map((entry, i) => (

              <li key={`${entry.at}-${i}`} className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 text-sm">

                <span className="font-medium text-navy-900 dark:text-white">{entry.action}</span>

                <span className="text-xs text-gray-500 dark:text-navy-400">

                  {formatDate(entry.at)}

                </span>

                {Object.keys(entry.detail).length > 0 && (

                  <span className="w-full text-xs text-gray-600 dark:text-navy-300">

                    {Object.entries(entry.detail)

                      .map(([k, v]) => `${k}: ${v}`)

                      .join(" · ")}

                  </span>

                )}

              </li>

            ))}

          </ul>

        </section>

      )}



      <section id="discussions" className="mt-12">

        <div className="flex flex-wrap items-center justify-between gap-3">

          <h2 className="text-lg font-semibold text-navy-900 dark:text-white">Community</h2>

          <div className="flex flex-wrap gap-2">

            {(["pending", "published", "resolved", "all"] as QueueFilter[]).map((f) => (

              <button

                key={f}

                type="button"

                onClick={() => setQueueFilter(f)}

                className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${

                  queueFilter === f

                    ? "bg-navy-700 text-white"

                    : "bg-navy-100 text-navy-700 dark:bg-navy-800 dark:text-navy-200"

                }`}

              >

                {f}

              </button>

            ))}

          </div>

        </div>

        {loading ? (

          <p className="mt-4 text-gray-500">Loading...</p>

        ) : filteredDiscussions.length === 0 ? (

          <p className="mt-4 text-gray-500">No discussions in this filter.</p>

        ) : (

          <div className="mt-4 space-y-6">

            {filteredDiscussions.map((disc) => (

              <div

                key={disc.id}

                className="rounded-xl border border-navy-100 bg-white p-5 dark:border-navy-700 dark:bg-navy-800/80"

              >

                <div className="flex flex-wrap items-start justify-between gap-4">

                  <div className="min-w-0 flex-1">

                    <p className="font-medium text-navy-900 dark:text-white">{disc.title}</p>

                    <p className="mt-1 text-sm text-gray-600 dark:text-navy-300">

                      {disc.author_name} · {disc.designation} · {disc.institution}

                    </p>

                    <p className="mt-2 text-sm text-gray-700 dark:text-navy-200">{disc.body}</p>

                    {disc.replies.length > 0 && (

                      <div className="mt-3 rounded-lg bg-navy-50 p-3 text-sm dark:bg-navy-900/60">

                        <p className="font-semibold">Published replies: {disc.replies.length}</p>

                        {disc.replies.map((r) => (

                          <p key={r.id} className="mt-1 text-gray-700 dark:text-navy-200">

                            {r.author}: {r.body.slice(0, 120)}…

                          </p>

                        ))}

                      </div>

                    )}

                  </div>

                  <StatusBadge status={disc.status} />

                </div>

                <div className="mt-4">

                  <label className="text-xs font-semibold uppercase text-gray-500">

                    Official reply (published with answer)

                  </label>

                  <textarea

                    rows={4}

                    value={discussionReplies[disc.id] ?? ""}

                    onChange={(e) =>

                      setDiscussionReplies((prev) => ({ ...prev, [disc.id]: e.target.value }))

                    }

                    className="input-field mt-1"

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

                    onClick={() => saveDiscussion(disc.id, "resolved")}

                    className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50"

                  >

                    Mark resolved

                  </button>

                  <button

                    type="button"

                    disabled={saving === disc.id}

                    onClick={() => saveDiscussion(disc.id, "closed")}

                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-navy-600 dark:text-navy-200 dark:hover:bg-navy-700"

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

        <h2 className="text-lg font-semibold text-navy-900 dark:text-white">Expert requests</h2>

        {loading ? (

          <p className="mt-4 text-gray-500">Loading...</p>

        ) : requests.length === 0 ? (

          <p className="mt-4 text-gray-500">No requests yet.</p>

        ) : (

          <div className="mt-4 space-y-6">

            {requests.map((req) => (

              <div

                key={req.id}

                className="rounded-xl border border-navy-100 bg-white p-5 dark:border-navy-700 dark:bg-navy-800/80"

              >

                <div className="flex flex-wrap items-start justify-between gap-4">

                  <div className="min-w-0 flex-1">

                    <p className="font-mono text-sm font-bold text-navy-900 dark:text-white">

                      {req.reference_number}

                    </p>

                    <p className="mt-1 font-medium text-navy-900 dark:text-white">

                      {req.name} — {req.designation}

                    </p>

                    <p className="text-sm text-gray-600 dark:text-navy-300">

                      {req.institution} · {req.email} · {formatDate(req.created_at)}

                    </p>

                    <p className="mt-2 text-sm">{serviceTypeLabels[req.service_type]}</p>

                    <p className="mt-2 text-sm text-gray-700 dark:text-navy-200">{req.case_summary}</p>

                  </div>

                  <select

                    value={req.status}

                    onChange={(e) =>

                      setRequests((prev) =>

                        prev.map((r) => (r.id === req.id ? { ...r, status: e.target.value } : r))

                      )

                    }

                    className="input-field w-auto py-1.5"

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

                    className="input-field mt-1 sm:max-w-xs"

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

                  <label htmlFor={`notes-${req.id}`} className="text-xs font-semibold uppercase text-gray-500">

                    Response notes (emailed to user when saved)

                  </label>

                  <textarea

                    id={`notes-${req.id}`}

                    rows={6}

                    value={draftNotes[req.id] ?? ""}

                    onChange={(e) =>

                      setDraftNotes((prev) => ({ ...prev, [req.id]: e.target.value }))

                    }

                    className="input-field mt-1"

                  />

                </div>



                <div className="mt-3 flex flex-wrap gap-2">

                  <button

                    type="button"

                    disabled={saving === req.id}

                    onClick={() => saveRequest(req.id, req.status, false)}

                    className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50 disabled:opacity-50 dark:border-navy-600 dark:text-navy-100 dark:hover:bg-navy-700"

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



function QueueCard({

  label,

  value,

  sub,

  tone,

  icon: Icon = MessageCircle,

}: {

  label: string;

  value: number | string;

  sub?: string;

  tone?: "gold";

  icon?: typeof MessageCircle;

}) {

  return (

    <div

      className={`rounded-xl border p-5 ${

        tone === "gold"

          ? "border-gold-200 bg-gold-50 dark:border-gold-500/30 dark:bg-gold-600/10"

          : "border-navy-100 bg-white dark:border-navy-700 dark:bg-navy-800/80"

      }`}

    >

      <Icon className={`h-6 w-6 ${tone === "gold" ? "text-gold-600" : "text-navy-700 dark:text-navy-200"}`} />

      <p className="mt-2 text-2xl font-bold text-navy-900 dark:text-white">{value}</p>

      <p className="text-sm text-gray-600 dark:text-navy-300">{label}</p>

      {sub && <p className="text-xs text-gray-500 dark:text-navy-400">{sub}</p>}

    </div>

  );

}



function StatusBadge({ status }: { status: string }) {

  const styles =

    status === "pending"

      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"

      : status === "published"

        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"

        : status === "resolved"

          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200"

          : "bg-gray-100 text-gray-700 dark:bg-navy-700 dark:text-navy-200";



  return (

    <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${styles}`}>

      {status}

    </span>

  );

}


