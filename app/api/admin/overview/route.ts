import { NextResponse } from "next/server";
import { getAdminActivityLog } from "@/lib/admin-log";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  loadArticles,
  loadDocuments,
  loadProcedures,
  loadTemplates,
  loadUpdates,
} from "@/lib/cms/loaders";
import { ensureSchema, getSql, isDatabaseEnabled } from "@/lib/db/client";
import { getExpertRequests } from "@/lib/db/requests";
import { getDiscussions } from "@/lib/db/discussions";
import { toolDefinitions } from "@/lib/tools/registry";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [requests, pendingDiscussions, publishedDiscussions, resolvedDiscussions, activity] =
    await Promise.all([
      getExpertRequests(),
      getDiscussions({ status: "pending" }),
      getDiscussions({ status: "published" }),
      getDiscussions({ status: "resolved" }),
      getAdminActivityLog(25),
    ]);

  let subscriberCount = 0;
  if (isDatabaseEnabled()) {
    try {
      await ensureSchema();
      const sql = getSql();
      const rows = await sql`SELECT COUNT(*)::int AS count FROM digest_subscribers`;
      subscriberCount = Number(rows[0]?.count ?? 0);
    } catch {
      subscriberCount = 0;
    }
  }

  const [articles, procedures, documents, templates, updates] = await Promise.all([
    loadArticles(),
    loadProcedures(),
    loadDocuments(),
    loadTemplates(),
    loadUpdates(),
  ]);

  return NextResponse.json({
    content: {
      articles: articles.length,
      procedures: procedures.length,
      documents: documents.length,
      templates: templates.length,
      updates: updates.length,
      tools: toolDefinitions.length,
    },
    queue: {
      expertRequests: requests.length,
      pendingExpert: requests.filter((r) => r.status === "pending").length,
      pendingCommunity: pendingDiscussions.length,
      publishedCommunity: publishedDiscussions.length,
      resolvedCommunity: resolvedDiscussions.length,
      subscribers: subscriberCount,
    },
    activity,
  });
}
