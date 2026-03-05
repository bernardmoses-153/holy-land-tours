"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface OnboardingStepProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
  className?: string;
}

export function OnboardingStep({
  title,
  subtitle,
  children,
  onNext,
  onBack,
  nextLabel = "Continue",
  nextDisabled = false,
  showBack = true,
  className,
}: OnboardingStepProps) {
  return (
    <div className={cn("animate-fade-in space-y-6", className)}>
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted">{subtitle}</p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-6">{children}</div>

      {/* Navigation */}
      <div className="flex items-center gap-3 pt-2">
        {showBack && onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        )}
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-opacity",
              nextDisabled
                ? "cursor-not-allowed bg-elevated text-muted"
                : "bg-foreground text-background hover:opacity-90"
            )}
          >
            {nextLabel}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
