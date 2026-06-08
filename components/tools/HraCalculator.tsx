"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/i18n/LanguageProvider";
import { ToolPageShell, ToolResultBox, inputClass, labelClass } from "./ToolPageShell";

const cityRates = { I: 24, II: 16, III: 8 } as const;

export function HraCalculatorPage() {
  const t = useTranslations();
  const tr = t.tools.hraCalculator;
  const [basic, setBasic] = useState(45000);
  const [cityClass, setCityClass] = useState<keyof typeof cityRates>("I");
  const [customPercent, setCustomPercent] = useState<number | "">("");

  const result = useMemo(() => {
    const percent = customPercent === "" ? cityRates[cityClass] : Number(customPercent);
    const hra = Math.round((basic * percent) / 100);
    return { percent, hra };
  }, [basic, cityClass, customPercent]);

  return (
    <ToolPageShell title={tr.title} subtitle={tr.subtitle} note={tr.note}>
      <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="hra-basic" className={labelClass}>
              {tr.basicPay}
            </label>
            <input
              id="hra-basic"
              type="number"
              min={0}
              value={basic}
              onChange={(e) => setBasic(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="hra-class" className={labelClass}>
              {tr.cityClass}
            </label>
            <select
              id="hra-class"
              value={cityClass}
              onChange={(e) => setCityClass(e.target.value as keyof typeof cityRates)}
              className={inputClass}
            >
              <option value="I">{tr.classI}</option>
              <option value="II">{tr.classII}</option>
              <option value="III">{tr.classIII}</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="hra-custom" className={labelClass}>
              {tr.customPercent}
            </label>
            <input
              id="hra-custom"
              type="number"
              min={0}
              max={30}
              step={0.5}
              placeholder={String(cityRates[cityClass])}
              value={customPercent}
              onChange={(e) => setCustomPercent(e.target.value === "" ? "" : Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>
        <ToolResultBox
          items={[
            { label: tr.hraPercent, value: `${result.percent}%` },
            {
              label: tr.hraAmount,
              value: `₹${result.hra.toLocaleString("en-IN")}`,
              highlight: true,
            },
          ]}
        />
      </div>
    </ToolPageShell>
  );
}
