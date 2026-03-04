import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "error" | "info" | "neutral";

interface StatusBadgeProps {
  status: string;
  variant?: BadgeVariant;
}

const statusToVariant: Record<string, BadgeVariant> = {
  approved: "success",
  confirmed: "success",
  paid_full: "success",
  completed: "success",
  paid: "success",
  uploaded: "success",
  overdue: "error",
  rejected: "error",
  error: "error",
  cancelled: "error",
  pending: "warning",
  pending_review: "warning",
  uploading: "warning",
  filling: "warning",
  recruiting: "warning",
  deposit_paid: "warning",
  partial: "warning",
  in_progress: "warning",
  almost_full: "warning",
  in_tour: "info",
  action: "info",
  info: "info",
  draft: "neutral",
  not_started: "neutral",
  refunded: "neutral",
};

const variantStyles: Record<BadgeVariant, { dot: string; bg: string; text: string }> = {
  success: { dot: "bg-success", bg: "bg-success-bg", text: "text-success" },
  warning: { dot: "bg-warning", bg: "bg-warning-bg", text: "text-warning" },
  error: { dot: "bg-error", bg: "bg-error-bg", text: "text-error" },
  info: { dot: "bg-info", bg: "bg-info-bg", text: "text-info" },
  neutral: { dot: "bg-muted", bg: "bg-elevated", text: "text-secondary" },
};

function formatStatusLabel(status: string): string {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const resolvedVariant = variant ?? statusToVariant[status] ?? "neutral";
  const styles = variantStyles[resolvedVariant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles.bg,
        styles.text
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", styles.dot)} />
      {formatStatusLabel(status)}
    </span>
  );
}
