export const APP_NAME = "Holy Land Tours";
export const APP_DESCRIPTION = "AI-powered Israel tourism platform connecting tour operators, group leaders, and travelers.";

export const ROLES = {
  OPERATOR: "operator",
  LEADER: "leader",
  TOURIST: "tourist",
} as const;

export const ROLE_LABELS: Record<string, string> = {
  operator: "Tour Operator",
  leader: "Group Leader",
  tourist: "Tourist",
};

export const GROUP_STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  recruiting: "Recruiting",
  filling: "Filling",
  almost_full: "Almost Full",
  confirmed: "Confirmed",
  in_tour: "In Tour",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const DOCUMENT_STATUS_LABELS: Record<string, string> = {
  not_started: "Not Started",
  uploaded: "Uploaded",
  pending_review: "Pending Review",
  approved: "Approved",
  rejected: "Rejected",
};

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  not_started: "Not Started",
  deposit_paid: "Deposit Paid",
  partial: "Partial",
  paid_full: "Paid in Full",
  overdue: "Overdue",
  refunded: "Refunded",
};

export const SUPPLIER_BOOKING_STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  requested: "Requested",
  confirmed: "Confirmed",
  modified: "Modified",
  cancelled: "Cancelled",
};

export const GUIDE_ASSIGNMENT_STATUS_LABELS: Record<string, string> = {
  assigned: "Assigned",
  confirmed: "Confirmed",
  completed: "Completed",
};

export const MOCK_DELAY = 300;
