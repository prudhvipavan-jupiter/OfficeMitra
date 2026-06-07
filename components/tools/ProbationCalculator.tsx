"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { ToolPageShell, ToolResultBox, inputClass, labelClass } from "./ToolPageShell";

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ProbationCalculator() {
  const t = useTranslations();
  const [joiningDate, setJoiningDate] = useState("");
  const [probationMonths, setProbationMonths] = useState(24);
  const [eolDays, setEolDays] = useState(0);

  const result = useMemo(() => {
    if (!joiningDate) return null;
    const start = new Date(joiningDate);
    if (Number.isNaN(start.getTime())) return null;

    const baseDays = Math.round(probationMonths * (365.25 / 12));
    const totalDays = baseDays + eolDays;
    const completion = addDays(start, totalDays);
    const declareFrom = addDays(completion, -30);

    return { completion, declareFrom, totalDays };
  }, [joiningDate, probationMonths, eolDays]);

  return (
    <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="joining" className={labelClass}>
            {t.tools.probation.joiningDate}
          </label>
          <input
            id="joining"
            type="date"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="months" className={labelClass}>
            {t.tools.probation.periodMonths}
          </label>
          <input
            id="months"
            type="number"
            min={1}
            max={60}
            value={probationMonths}
            onChange={(e) => setProbationMonths(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="eol" className={labelClass}>
            {t.tools.probation.eolExtension}
          </label>
          <input
            id="eol"
            type="number"
            min={0}
            value={eolDays}
            onChange={(e) => setEolDays(Number(e.target.value))}
            className={inputClass}
          />
        </div>
      </div>

      {result && (
        <ToolResultBox
          items={[
            { label: t.tools.probation.completionDate, value: formatDate(result.completion) },
            {
              label: t.tools.probation.declareFrom,
              value: formatDate(result.declareFrom),
              highlight: true,
            },
          ]}
          note={t.tools.probation.note}
        />
      )}
    </div>
  );
}

export function ProbationCalculatorPage() {
  const t = useTranslations();

  return (
    <ToolPageShell
      title={t.tools.probation.title}
      subtitle={t.tools.probation.subtitle}
      note={t.tools.probation.note}
    >
      <ProbationCalculator />
    </ToolPageShell>
  );
}
