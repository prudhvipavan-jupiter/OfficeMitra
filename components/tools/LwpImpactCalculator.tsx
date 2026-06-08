"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { ToolPageShell, ToolResultBox, inputClass, labelClass } from "./ToolPageShell";

function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function LwpImpactCalculatorPage() {
  const t = useTranslations();
  const tr = t.tools.lwpImpact;
  const [basic, setBasic] = useState(45000);
  const [daPercent, setDaPercent] = useState(46.5);
  const [lwpDays, setLwpDays] = useState(5);
  const [month, setMonth] = useState("2026-06");

  const result = useMemo(() => {
    const [y, m] = month.split("-").map(Number);
    const dim = daysInMonth(y, m);
    const da = Math.round((basic * daPercent) / 100);
    const gross = basic + da;
    const perDay = gross / dim;
    const deduction = Math.round(perDay * lwpDays);
    const netEstimate = gross - deduction;
    return { da, gross, perDay, deduction, netEstimate, dim };
  }, [basic, daPercent, lwpDays, month]);

  return (
    <ToolPageShell title={tr.title} subtitle={tr.subtitle} note={tr.note}>
      <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="lwp-basic" className={labelClass}>
              {tr.basicPay}
            </label>
            <input
              id="lwp-basic"
              type="number"
              min={0}
              value={basic}
              onChange={(e) => setBasic(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lwp-da" className={labelClass}>
              {tr.daPercent}
            </label>
            <input
              id="lwp-da"
              type="number"
              min={0}
              step={0.1}
              value={daPercent}
              onChange={(e) => setDaPercent(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lwp-month" className={labelClass}>
              {tr.payMonth}
            </label>
            <input
              id="lwp-month"
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lwp-days" className={labelClass}>
              {tr.lwpDays}
            </label>
            <input
              id="lwp-days"
              type="number"
              min={0}
              max={31}
              value={lwpDays}
              onChange={(e) => setLwpDays(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>
        <ToolResultBox
          items={[
            { label: tr.daysInMonth, value: String(result.dim) },
            { label: tr.grossPay, value: `₹${result.gross.toLocaleString("en-IN")}` },
            {
              label: tr.lwpDeduction,
              value: `₹${result.deduction.toLocaleString("en-IN")}`,
              highlight: true,
            },
            {
              label: tr.estimatedNet,
              value: `₹${result.netEstimate.toLocaleString("en-IN")}`,
            },
          ]}
        />
      </div>
    </ToolPageShell>
  );
}
