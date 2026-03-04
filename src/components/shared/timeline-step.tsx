"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TimelineStepProps {
  title: string;
  description?: string;
  time?: string;
  icon?: LucideIcon;
  status?: "completed" | "current" | "upcoming";
  isLast?: boolean;
}

export function TimelineStep({
  title,
  description,
  time,
  icon: Icon,
  status = "upcoming",
  isLast = false,
}: TimelineStepProps) {
  return (
    <div className="flex gap-4">
      {/* Vertical line + dot */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex items-center justify-center h-8 w-8 rounded-full border-2 shrink-0",
            status === "completed"
              ? "bg-foreground border-foreground text-background"
              : status === "current"
              ? "bg-background border-foreground text-foreground"
              : "bg-background border-border text-muted"
          )}
        >
          {status === "completed" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : Icon ? (
            <Icon className="h-4 w-4" />
          ) : (
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                status === "current" ? "bg-foreground" : "bg-muted"
              )}
            />
          )}
        </div>
        {!isLast && (
          <div
            className={cn(
              "w-0.5 flex-1 min-h-[24px]",
              status === "completed" ? "bg-foreground" : "bg-border"
            )}
          />
        )}
      </div>

      {/* Content */}
      <div className={cn("pb-6", isLast && "pb-0")}>
        {time && (
          <p className="text-[10px] font-medium text-muted uppercase tracking-wider mb-0.5">
            {time}
          </p>
        )}
        <p
          className={cn(
            "text-sm font-medium",
            status === "upcoming" ? "text-muted" : "text-foreground"
          )}
        >
          {title}
        </p>
        {description && (
          <p className="text-xs text-secondary mt-1 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
