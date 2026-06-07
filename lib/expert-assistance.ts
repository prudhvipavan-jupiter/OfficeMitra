export type ServiceType =
  | "draft_review"
  | "rule_clarification"
  | "establishment_guidance"
  | "finance_guidance"
  | "document_review";

export const serviceTypeLabels: Record<ServiceType, string> = {
  draft_review: "Draft Review",
  rule_clarification: "Rule Clarification",
  establishment_guidance: "Establishment Guidance",
  finance_guidance: "Finance Guidance",
  document_review: "Document Review",
};
