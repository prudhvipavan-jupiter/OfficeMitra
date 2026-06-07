"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { ToolPageShell, ToolResultBox, inputClass, labelClass } from "./ToolPageShell";

export function GpfRecoveryCalculatorPage() {
  const t = useTranslations();
  const tr = t.tools.gpfRecovery;
  const [advance, setAdvance] = useState(100000);
  const [installments, setInstallments] = useState(60);

  const result = useMemo(() => {
    const monthly = installments > 0 ? Math.ceil(advance / installments) : 0;
    return { monthly, total: monthly * installments };
  }, [advance, installments]);

  return (
    <ToolPageShell title={tr.title} subtitle={tr.subtitle} note={tr.note}>
      <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="gpf-advance" className={labelClass}>
              {tr.advanceAmount}
            </label>
            <input
              id="gpf-advance"
              type="number"
              min={0}
              value={advance}
              onChange={(e) => setAdvance(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="gpf-inst" className={labelClass}>
              {tr.installments}
            </label>
            <input
              id="gpf-inst"
              type="number"
              min={1}
              max={120}
              value={installments}
              onChange={(e) => setInstallments(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>
        <ToolResultBox
          items={[
            {
              label: tr.monthlyRecovery,
              value: `₹${result.monthly.toLocaleString("en-IN")}`,
              highlight: true,
            },
            {
              label: tr.totalRecovery,
              value: `₹${result.total.toLocaleString("en-IN")}`,
            },
          ]}
        />
      </div>
    </ToolPageShell>
  );
}
