"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { ToolPageShell, ToolResultBox, inputClass, labelClass } from "./ToolPageShell";

export function GpfSubscriptionCalculatorPage() {
  const t = useTranslations();
  const tr = t.tools.gpfSubscription;
  const [basic, setBasic] = useState(45000);
  const [percent, setPercent] = useState(6);

  const result = useMemo(() => {
    const monthly = Math.round((basic * percent) / 100);
    return { monthly, annual: monthly * 12 };
  }, [basic, percent]);

  return (
    <ToolPageShell title={tr.title} subtitle={tr.subtitle} note={tr.note}>
      <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="gpf-sub-basic" className={labelClass}>
              {tr.basicPay}
            </label>
            <input
              id="gpf-sub-basic"
              type="number"
              min={0}
              value={basic}
              onChange={(e) => setBasic(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="gpf-sub-pct" className={labelClass}>
              {tr.subscriptionPercent}
            </label>
            <input
              id="gpf-sub-pct"
              type="number"
              min={6}
              max={100}
              step={0.5}
              value={percent}
              onChange={(e) => setPercent(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>
        <ToolResultBox
          items={[
            {
              label: tr.monthlySubscription,
              value: `₹${result.monthly.toLocaleString("en-IN")}`,
              highlight: true,
            },
            { label: tr.annualSubscription, value: `₹${result.annual.toLocaleString("en-IN")}` },
          ]}
        />
      </div>
    </ToolPageShell>
  );
}
