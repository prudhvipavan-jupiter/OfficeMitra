"use client";

import { useState } from "react";

export function ProductionResetButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function runReset() {
    if (
      !confirm(
        "Clear all dummy data? This removes every CMS item, community post, and expert request."
      )
    ) {
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/production-reset", { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Reset failed");
      setMessage(json.message ?? "Done");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm dark:border-amber-500/30 dark:bg-amber-600/10">
      <strong className="text-navy-900 dark:text-white">Clear all content</strong>
      <p className="mt-1 text-navy-800 dark:text-navy-200">
        Remove all CMS content, community posts, and expert requests from the database.
      </p>
      <button
        type="button"
        onClick={runReset}
        disabled={loading}
        className="mt-3 rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {loading ? "Clearing…" : "Clear all dummy data"}
      </button>
      {message && <p className="mt-2 text-navy-700 dark:text-navy-200">{message}</p>}
    </div>
  );
}
