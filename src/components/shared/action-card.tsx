"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "warm" | "accent";
  className?: string;
}

export function ActionCard({
  icon: Icon,
  title,
  description,
  actionLabel,
  onClick,
  variant = "default",
  className,
}: ActionCardProps) {
  const content = (
    <>
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex items-center justify-center h-10 w-10 rounded-xl shrink-0",
            variant === "warm" ? "bg-gold-bg text-gold" :
            variant === "accent" ? "bg-sky-bg text-sky" :
            "bg-elevated text-secondary"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          <p className="text-xs text-secondary mt-0.5 leading-relaxed">{description}</p>
        </div>
        {actionLabel && <ChevronRight className="h-4 w-4 text-muted shrink-0 mt-0.5" />}
      </div>
    </>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-xl border border-border bg-background p-4 hover:bg-surface transition-colors",
        className
      )}
    >
      {content}
    </button>
  );
}
