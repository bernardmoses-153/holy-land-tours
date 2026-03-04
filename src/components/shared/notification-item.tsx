import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import type { Notification } from "@/types";
import { Info, CheckCircle, AlertTriangle, AlertOctagon, Zap } from "lucide-react";

interface NotificationItemProps {
  notification: Notification;
}

const typeConfig = {
  info: { icon: Info, color: "text-info", borderColor: "border-info" },
  success: { icon: CheckCircle, color: "text-success", borderColor: "border-success" },
  warning: { icon: AlertTriangle, color: "text-warning", borderColor: "border-warning" },
  error: { icon: AlertOctagon, color: "text-error", borderColor: "border-error" },
  action: { icon: Zap, color: "text-foreground", borderColor: "border-foreground" },
} as const;

export function NotificationItem({ notification }: NotificationItemProps) {
  const { type, title, message, read, createdAt } = notification;
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-3 border-l-2 transition-colors",
        read
          ? "border-l-transparent bg-background"
          : cn("bg-surface", config.borderColor)
      )}
    >
      <div className={cn("shrink-0 mt-0.5", config.color)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              "text-sm",
              read ? "text-secondary font-normal" : "text-foreground font-medium"
            )}
          >
            {title}
          </p>
          <span className="text-xs text-muted shrink-0">
            {formatDate(createdAt)}
          </span>
        </div>
        <p className="text-xs text-muted mt-0.5 line-clamp-2">{message}</p>
      </div>
    </div>
  );
}
