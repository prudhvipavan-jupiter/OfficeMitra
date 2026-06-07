export type ToolKey =
  | "probation"
  | "elEncashment"
  | "gpfRecovery"
  | "servicePeriod"
  | "retirementDate"
  | "incrementDue"
  | "payEstimate"
  | "workingDays";

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
];
