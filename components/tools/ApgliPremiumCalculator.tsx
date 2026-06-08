"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { ToolPageShell, ToolResultBox, inputClass, labelClass } from "./ToolPageShell";

function apgliRateForAge(age: number): number {
  if (age <= 30) return 0.45;
  if (age <= 40) return 0.55;
  if (age <= 50) return 0.7;
  return 0.85;
}

export function ApgliPremiumCalculatorPage() {
  const t = useTranslations();
  const tr = t.tools.apgliPremium;
  const [basic, setBasic] = useState(45000);
  const [age, setAge] = useState(35);
  const [sumAssured, setSumAssured] = useState<number | "">("");
  const [rate, setRate] = useState<number | "">("");

  const result = useMemo(() => {
    const sa = sumAssured === "" ? basic * 100 : Number(sumAssured);
    const r = rate === "" ? apgliRateForAge(age) : Number(rate);
    const monthly = Math.round((sa / 1000) * r);
    return { sa, rate: r, monthly, annual: monthly * 12 };
  }, [basic, age, sumAssured, rate]);

  return (
    <ToolPageShell title={tr.title} subtitle={tr.subtitle} note={tr.note}>
      <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="apgli-basic" className={labelClass}>
              {tr.basicPay}
            </label>
            <input
              id="apgli-basic"
              type="number"
              min={0}
              value={basic}
              onChange={(e) => setBasic(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="apgli-age" className={labelClass}>
              {tr.age}
            </label>
            <input
              id="apgli-age"
              type="number"
              min={18}
              max={60}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="apgli-sa" className={labelClass}>
              {tr.sumAssured}
            </label>
            <input
              id="apgli-sa"
              type="number"
              min={0}
              placeholder={String(basic * 100)}
              value={sumAssured}
              onChange={(e) => setSumAssured(e.target.value === "" ? "" : Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="apgli-rate" className={labelClass}>
              {tr.ratePerThousand}
            </label>
            <input
              id="apgli-rate"
              type="number"
              min={0}
              step={0.01}
              placeholder={String(apgliRateForAge(age))}
              value={rate}
              onChange={(e) => setRate(e.target.value === "" ? "" : Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>
        <ToolResultBox
          items={[
            { label: tr.estimatedSa, value: `₹${result.sa.toLocaleString("en-IN")}` },
            {
              label: tr.monthlyPremium,
              value: `₹${result.monthly.toLocaleString("en-IN")}`,
              highlight: true,
            },
            { label: tr.annualPremium, value: `₹${result.annual.toLocaleString("en-IN")}` },
          ]}
        />
      </div>
    </ToolPageShell>
  );
}
