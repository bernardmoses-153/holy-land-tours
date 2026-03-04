"use client";

import { Bot, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIAssistantCardProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  category?: string;
  variant?: "default" | "gold";
}

export function AIAssistantCard({
  message,
  actionLabel,
  onAction,
  category,
  variant = "default",
}: AIAssistantCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 space-y-3",
        variant === "gold"
          ? "border-gold/20 bg-gold-bg"
          : "border-sky/20 bg-sky-bg"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex items-center justify-center h-8 w-8 rounded-full shrink-0",
            variant === "gold" ? "bg-gold/10 text-gold" : "bg-sky/10 text-sky"
          )}
        >
          <Bot className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          {category && (
            <p className={cn(
              "text-[10px] font-medium uppercase tracking-wider mb-1",
              variant === "gold" ? "text-gold" : "text-sky"
            )}>
              {category}
            </p>
          )}
          <p className="text-sm text-body leading-relaxed">{message}</p>
        </div>
      </div>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-medium transition-colors",
            variant === "gold"
              ? "text-gold hover:text-gold/80"
              : "text-sky hover:text-sky/80"
          )}
        >
          {actionLabel}
          <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
