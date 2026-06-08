"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { ToolPageShell, ToolResultBox, inputClass, labelClass } from "./ToolPageShell";
import { CalendarExportButton } from "./CalendarExport";

function diffYMD(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function ServicePeriodCalculatorPage() {
  const t = useTranslations();
  const tr = t.tools.servicePeriod;
  const [joining, setJoining] = useState("2010-04-01");
  const [asOn, setAsOn] = useState(() => new Date().toISOString().slice(0, 10));

  const result = useMemo(() => {
    const start = new Date(joining);
    const end = new Date(asOn);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
      return null;
    }
    const { years, months, days } = diffYMD(start, end);
    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return { years, months, days, totalDays };
  }, [joining, asOn]);

  return (
    <ToolPageShell title={tr.title} subtitle={tr.subtitle} note={tr.note}>
      <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="sp-join" className={labelClass}>
              {tr.joiningDate}
            </label>
            <input
              id="sp-join"
              type="date"
              value={joining}
              onChange={(e) => setJoining(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="sp-as" className={labelClass}>
              {tr.asOnDate}
            </label>
            <input
              id="sp-as"
              type="date"
              value={asOn}
              onChange={(e) => setAsOn(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        {result && (
          <ToolResultBox
            items={[
              { label: tr.years, value: String(result.years) },
              { label: tr.months, value: String(result.months) },
              { label: tr.days, value: String(result.days) },
              { label: tr.totalDays, value: String(result.totalDays), highlight: true },
            ]}
          />
        )}
      </div>
    </ToolPageShell>
  );
}

export function RetirementDateCalculatorPage() {
  const t = useTranslations();
  const tr = t.tools.retirementDate;
  const [dob, setDob] = useState("1968-06-15");
  const [age, setAge] = useState(60);

  const result = useMemo(() => {
    const birth = new Date(dob);
    if (Number.isNaN(birth.getTime())) return null;
    const retirement = new Date(birth);
    retirement.setFullYear(retirement.getFullYear() + age);
    return { label: formatDate(retirement), date: retirement };
  }, [dob, age]);

  return (
    <ToolPageShell title={tr.title} subtitle={tr.subtitle} note={tr.note}>
      <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ret-dob" className={labelClass}>
              {tr.dateOfBirth}
            </label>
            <input
              id="ret-dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="ret-age" className={labelClass}>
              {tr.retirementAge}
            </label>
            <input
              id="ret-age"
              type="number"
              min={50}
              max={65}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>
        {result && (
          <>
            <ToolResultBox
              items={[{ label: tr.retirementDate, value: result.label, highlight: true }]}
            />
            <div className="mt-4">
              <CalendarExportButton
                title="Retirement — OfficeMitra reminder"
                date={result.date}
                description={`Estimated superannuation date: ${result.label}. Verify with service rules.`}
                label={t.calendar.addToCalendar}
              />
            </div>
          </>
        )}
      </div>
    </ToolPageShell>
  );
}

export function IncrementDueCalculatorPage() {
  const t = useTranslations();
  const tr = t.tools.incrementDue;
  const [lastIncrement, setLastIncrement] = useState("2024-07-01");
  const [intervalMonths, setIntervalMonths] = useState(12);

  const result = useMemo(() => {
    const last = new Date(lastIncrement);
    if (Number.isNaN(last.getTime())) return null;
    const next = new Date(last);
    next.setMonth(next.getMonth() + intervalMonths);
    const prepStart = new Date(next);
    prepStart.setDate(prepStart.getDate() - 30);
    return {
      nextDue: formatDate(next),
      nextDate: next,
      prepFrom: formatDate(prepStart),
    };
  }, [lastIncrement, intervalMonths]);

  return (
    <ToolPageShell title={tr.title} subtitle={tr.subtitle} note={tr.note}>
      <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="inc-last" className={labelClass}>
              {tr.lastIncrementDate}
            </label>
            <input
              id="inc-last"
              type="date"
              value={lastIncrement}
              onChange={(e) => setLastIncrement(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="inc-int" className={labelClass}>
              {tr.intervalMonths}
            </label>
            <input
              id="inc-int"
              type="number"
              min={1}
              max={24}
              value={intervalMonths}
              onChange={(e) => setIntervalMonths(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>
        {result && (
          <>
            <ToolResultBox
              items={[
                { label: tr.nextDueDate, value: result.nextDue, highlight: true },
                { label: tr.prepFrom, value: result.prepFrom },
              ]}
            />
            <div className="mt-4">
              <CalendarExportButton
                title="Increment due — OfficeMitra reminder"
                date={result.nextDate}
                description={`Next increment due: ${result.nextDue}. Start SR prep from ${result.prepFrom}.`}
                label={t.calendar.addToCalendar}
              />
            </div>
          </>
        )}
      </div>
    </ToolPageShell>
  );
}
