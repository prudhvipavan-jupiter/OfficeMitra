"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { ToolPageShell, ToolResultBox, inputClass, labelClass } from "./ToolPageShell";

export function PayEstimateCalculatorPage() {
  const t = useTranslations();
  const tr = t.tools.payEstimate;
  const [basic, setBasic] = useState(45000);
  const [daPercent, setDaPercent] = useState(46.5);
  const [hraPercent, setHraPercent] = useState(24);

  const result = useMemo(() => {
    const da = Math.round((basic * daPercent) / 100);
    const hra = Math.round((basic * hraPercent) / 100);
    const gross = basic + da + hra;
    return { da, hra, gross };
  }, [basic, daPercent, hraPercent]);

  return (
    <ToolPageShell title={tr.title} subtitle={tr.subtitle} note={tr.note}>
      <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="pay-basic" className={labelClass}>
              {tr.basicPay}
            </label>
            <input
              id="pay-basic"
              type="number"
              min={0}
              value={basic}
              onChange={(e) => setBasic(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="pay-da" className={labelClass}>
              {tr.daPercent}
            </label>
            <input
              id="pay-da"
              type="number"
              min={0}
              step={0.1}
              value={daPercent}
              onChange={(e) => setDaPercent(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="pay-hra" className={labelClass}>
              {tr.hraPercent}
            </label>
            <input
              id="pay-hra"
              type="number"
              min={0}
              step={0.1}
              value={hraPercent}
              onChange={(e) => setHraPercent(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>
        <ToolResultBox
          items={[
            { label: tr.daAmount, value: `₹${result.da.toLocaleString("en-IN")}` },
            { label: tr.hraAmount, value: `₹${result.hra.toLocaleString("en-IN")}` },
            {
              label: tr.grossEstimate,
              value: `₹${result.gross.toLocaleString("en-IN")}`,
              highlight: true,
            },
          ]}
        />
      </div>
    </ToolPageShell>
  );
}

export function WorkingDaysCalculatorPage() {
  const t = useTranslations();
  const tr = t.tools.workingDays;
  const [from, setFrom] = useState("2026-01-01");
  const [to, setTo] = useState("2026-01-31");
  const [excludeSat, setExcludeSat] = useState(true);

  const result = useMemo(() => {
    const start = new Date(from);
    const end = new Date(to);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
      return null;
    }
    let working = 0;
    let calendar = 0;
    const cur = new Date(start);
    while (cur <= end) {
      calendar += 1;
      const day = cur.getDay();
      const isSunday = day === 0;
      const isSaturday = day === 6;
      if (!isSunday && !(excludeSat && isSaturday)) working += 1;
      cur.setDate(cur.getDate() + 1);
    }
    return { working, calendar, offDays: calendar - working };
  }, [from, to, excludeSat]);

  return (
    <ToolPageShell title={tr.title} subtitle={tr.subtitle} note={tr.note}>
      <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="wd-from" className={labelClass}>
              {tr.fromDate}
            </label>
            <input
              id="wd-from"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="wd-to" className={labelClass}>
              {tr.toDate}
            </label>
            <input
              id="wd-to"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={excludeSat}
            onChange={(e) => setExcludeSat(e.target.checked)}
            className="rounded border-gray-300"
          />
          {tr.excludeSaturday}
        </label>
        {result && (
          <ToolResultBox
            items={[
              { label: tr.calendarDays, value: String(result.calendar) },
              { label: tr.offDays, value: String(result.offDays) },
              {
                label: tr.workingDays,
                value: String(result.working),
                highlight: true,
              },
            ]}
          />
        )}
      </div>
    </ToolPageShell>
  );
}
