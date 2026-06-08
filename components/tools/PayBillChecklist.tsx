"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { ToolPageShell, ToolResultBox, labelClass } from "./ToolPageShell";

const defaultItems = [
  { id: "basic", labelKey: "basic" as const },
  { id: "da", labelKey: "da" as const },
  { id: "apgli", labelKey: "apgli" as const },
  { id: "gpf", labelKey: "gpf" as const },
  { id: "pt", labelKey: "pt" as const },
  { id: "it", labelKey: "it" as const },
  { id: "loans", labelKey: "loans" as const },
  { id: "sr", labelKey: "sr" as const },
];

export function PayBillChecklist() {
  const t = useTranslations();
  const tr = t.tools.payBillChecklist;
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const done = useMemo(
    () => defaultItems.filter((i) => checked[i.id]).length,
    [checked]
  );

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-600">{tr.instructions}</p>
      <ul className="mt-4 space-y-3">
        {defaultItems.map((item) => (
          <li key={item.id}>
            <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${
              checked[item.id] ? "border-emerald-300 bg-emerald-50" : "border-gray-200"
            }`}>
              <input
                type="checkbox"
                checked={!!checked[item.id]}
                onChange={() => toggle(item.id)}
                className="mt-1 h-4 w-4 rounded border-gray-300"
              />
              <span className={labelClass.replace("block ", "")}>{tr.items[item.labelKey]}</span>
            </label>
          </li>
        ))}
      </ul>
      <ToolResultBox
        items={[
          { label: tr.progress, value: `${done} / ${defaultItems.length}` },
          {
            label: tr.status,
            value: done === defaultItems.length ? tr.complete : tr.inProgress,
            highlight: done === defaultItems.length,
          },
        ]}
        note={tr.note}
      />
    </div>
  );
}

export function PayBillChecklistPage() {
  const t = useTranslations();
  const tr = t.tools.payBillChecklist;
  return (
    <ToolPageShell title={tr.title} subtitle={tr.subtitle} note={tr.note}>
      <PayBillChecklist />
    </ToolPageShell>
  );
}
