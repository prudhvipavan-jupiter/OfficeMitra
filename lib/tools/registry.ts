export type ToolKey =
  | "probation"
  | "elEncashment"
  | "gpfRecovery"
  | "servicePeriod"
  | "retirementDate"
  | "incrementDue"
  | "payEstimate"
  | "workingDays"
  | "payBillChecklist"
  | "apgliPremium"
  | "hraCalculator"
  | "gpfSubscription"
  | "lwpImpact"
  | "leaveAccrual"
  | "daArrears";

export interface ToolDefinition {
  key: ToolKey;
  href: string;
}

export const toolDefinitions: ToolDefinition[] = [
  { key: "probation", href: "/tools/probation-calculator" },
  { key: "elEncashment", href: "/tools/el-encashment-calculator" },
  { key: "gpfRecovery", href: "/tools/gpf-recovery-calculator" },
  { key: "servicePeriod", href: "/tools/service-period-calculator" },
  { key: "retirementDate", href: "/tools/retirement-date-calculator" },
  { key: "incrementDue", href: "/tools/increment-due-calculator" },
  { key: "payEstimate", href: "/tools/pay-estimate-calculator" },
  { key: "workingDays", href: "/tools/working-days-calculator" },
  { key: "payBillChecklist", href: "/tools/pay-bill-checklist" },
  { key: "apgliPremium", href: "/tools/apgli-premium-calculator" },
  { key: "hraCalculator", href: "/tools/hra-calculator" },
  { key: "gpfSubscription", href: "/tools/gpf-subscription-calculator" },
  { key: "lwpImpact", href: "/tools/lwp-impact-calculator" },
  { key: "leaveAccrual", href: "/tools/leave-accrual-calculator" },
  { key: "daArrears", href: "/tools/da-arrears-calculator" },
];

export const toolHrefByKey = Object.fromEntries(
  toolDefinitions.map((d) => [d.key, d.href])
) as Record<ToolKey, string>;

export const toolSearchTitles: Record<ToolKey, string> = {
  probation: "Probation Calculator",
  elEncashment: "EL Encashment Calculator",
  gpfRecovery: "GPF Recovery Calculator",
  servicePeriod: "Service Period Calculator",
  retirementDate: "Retirement Date Calculator",
  incrementDue: "Increment Due Calculator",
  payEstimate: "Pay Estimate Calculator",
  workingDays: "Working Days Calculator",
  payBillChecklist: "Pay Bill Checklist",
  apgliPremium: "APGLI Premium Calculator",
  hraCalculator: "HRA Calculator",
  gpfSubscription: "GPF Subscription Calculator",
  lwpImpact: "LWP Salary Impact Calculator",
  leaveAccrual: "Leave Accrual Estimator",
  daArrears: "DA Arrears Calculator",
};
