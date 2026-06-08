"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { ToolPageShell, ToolResultBox, inputClass, labelClass } from "./ToolPageShell";

export function DaArrearsCalculatorPage() {
  const t = useTranslations();
  const tr = t.tools.daArrears;
  const [basic, setBasic] = useState(45000);
  const [oldDa, setOldDa] = useState(42);
  const [newDa, setNewDa] = useState(46.5);
  const [months, setMonths] = useState(6);

  const result = useMemo(() => {
    const oldAmount = Math.round((basic * oldDa) / 100);
    const newAmount = Math.round((basic * newDa) / 100);
    const monthlyDiff = newAmount - oldAmount;
    const total = monthlyDiff * months;
    return { oldAmount, newAmount, monthlyDiff, total };
  }, [basic, oldDa, newDa, months]);

  return (
    <ToolPageShell title={tr.title} subtitle={tr.subtitle} note={tr.note}>
      <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="da-basic" className={labelClass}>
              {tr.basicPay}
            </label>
            <input
              id="da-basic"
              type="number"
              min={0}
              value={basic}
              onChange={(e) => setBasic(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="da-months" className={labelClass}>
              {tr.arrearsMonths}
            </label>
            <input
              id="da-months"
              type="number"
              min={1}
              max={36}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="da-old" className={labelClass}>
              {tr.oldDaPercent}
            </label>
            <input
              id="da-old"
              type="number"
              min={0}
              step={0.1}
              value={oldDa}
              onChange={(e) => setOldDa(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="da-new" className={labelClass}>
              {tr.newDaPercent}
            </label>
            <input
              id="da-new"
              type="number"
              min={0}
              step={0.1}
              value={newDa}
              onChange={(e) => setNewDa(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>
        <ToolResultBox
          items={[
            { label: tr.oldDaAmount, value: `₹${result.oldAmount.toLocaleString("en-IN")}` },
            { label: tr.newDaAmount, value: `₹${result.newAmount.toLocaleString("en-IN")}` },
            {
              label: tr.monthlyDifference,
              value: `₹${result.monthlyDiff.toLocaleString("en-IN")}`,
            },
            {
              label: tr.totalArrears,
              value: `₹${result.total.toLocaleString("en-IN")}`,
              highlight: true,
            },
          ]}
        />
      </div>
    </ToolPageShell>
  );
}
