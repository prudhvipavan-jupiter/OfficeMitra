"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { ToolPageShell, ToolResultBox, inputClass, labelClass } from "./ToolPageShell";

function monthsBetween(from: Date, to: Date) {
  let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
  if (to.getDate() < from.getDate()) months -= 1;
  return Math.max(0, months);
}

export function LeaveAccrualCalculatorPage() {
  const t = useTranslations();
  const tr = t.tools.leaveAccrual;
  const [joining, setJoining] = useState("2018-06-01");
  const [asOn, setAsOn] = useState("2026-06-01");
  const [opening, setOpening] = useState(0);
  const [leaveType, setLeaveType] = useState<"EL" | "HPL">("EL");
  const [availed, setAvailed] = useState(0);

  const result = useMemo(() => {
    const start = new Date(joining);
    const end = new Date(asOn);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
      return null;
    }
    const months = monthsBetween(start, end);
    const ratePerMonth = leaveType === "EL" ? 15 / 12 : 20 / 12;
    const accrued = Math.round(months * ratePerMonth * 10) / 10;
    const balance = Math.max(0, opening + accrued - availed);
    return { months, accrued, balance };
  }, [joining, asOn, opening, leaveType, availed]);

  return (
    <ToolPageShell title={tr.title} subtitle={tr.subtitle} note={tr.note}>
      <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="la-join" className={labelClass}>
              {tr.joiningDate}
            </label>
            <input
              id="la-join"
              type="date"
              value={joining}
              onChange={(e) => setJoining(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="la-as" className={labelClass}>
              {tr.asOnDate}
            </label>
            <input
              id="la-as"
              type="date"
              value={asOn}
              onChange={(e) => setAsOn(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="la-type" className={labelClass}>
              {tr.leaveType}
            </label>
            <select
              id="la-type"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value as "EL" | "HPL")}
              className={inputClass}
            >
              <option value="EL">{tr.elOption}</option>
              <option value="HPL">{tr.hplOption}</option>
            </select>
          </div>
          <div>
            <label htmlFor="la-open" className={labelClass}>
              {tr.openingBalance}
            </label>
            <input
              id="la-open"
              type="number"
              min={0}
              step={0.5}
              value={opening}
              onChange={(e) => setOpening(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="la-avail" className={labelClass}>
              {tr.availedDays}
            </label>
            <input
              id="la-avail"
              type="number"
              min={0}
              step={0.5}
              value={availed}
              onChange={(e) => setAvailed(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>
        {result && (
          <ToolResultBox
            items={[
              { label: tr.completedMonths, value: String(result.months) },
              { label: tr.accruedDays, value: String(result.accrued) },
              {
                label: tr.estimatedBalance,
                value: `${result.balance} days`,
                highlight: true,
              },
            ]}
          />
        )}
      </div>
    </ToolPageShell>
  );
}
