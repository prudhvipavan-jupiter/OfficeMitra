"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { ToolPageShell, ToolResultBox, inputClass, labelClass } from "./ToolPageShell";

export function ElEncashmentCalculator() {
  const t = useTranslations();
  const [balanceDays, setBalanceDays] = useState(240);
  const [maxEncashDays, setMaxEncashDays] = useState(300);
  const [lastBasic, setLastBasic] = useState(45000);

  const result = useMemo(() => {
    const encashable = Math.min(balanceDays, maxEncashDays);
    const amount = Math.round((lastBasic / 30) * encashable);
    return { encashable, amount };
  }, [balanceDays, maxEncashDays, lastBasic]);

  return (
    <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="el-balance" className={labelClass}>
            {t.tools.elEncashment.balanceDays}
          </label>
          <input
            id="el-balance"
            type="number"
            min={0}
            value={balanceDays}
            onChange={(e) => setBalanceDays(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="el-max" className={labelClass}>
            {t.tools.elEncashment.maxDays}
          </label>
          <input
            id="el-max"
            type="number"
            min={0}
            value={maxEncashDays}
            onChange={(e) => setMaxEncashDays(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="el-basic" className={labelClass}>
            {t.tools.elEncashment.lastBasic}
          </label>
          <input
            id="el-basic"
            type="number"
            min={0}
            value={lastBasic}
            onChange={(e) => setLastBasic(Number(e.target.value))}
            className={inputClass}
          />
        </div>
      </div>

      <ToolResultBox
        items={[
          { label: t.tools.elEncashment.encashableDays, value: String(result.encashable) },
          {
            label: t.tools.elEncashment.estimatedAmount,
            value: `₹${result.amount.toLocaleString("en-IN")}`,
            highlight: true,
          },
        ]}
        note={t.tools.elEncashment.note}
      />
    </div>
  );
}

export function ElEncashmentCalculatorPage() {
  const t = useTranslations();
  return (
    <ToolPageShell
      title={t.tools.elEncashment.title}
      subtitle={t.tools.elEncashment.subtitle}
      note={t.tools.elEncashment.note}
    >
      <ElEncashmentCalculator />
    </ToolPageShell>
  );
}
