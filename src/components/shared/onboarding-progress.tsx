"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
  className?: string;
}

export function OnboardingProgress({
  currentStep,
  totalSteps,
  labels,
  className,
}: OnboardingProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Step indicators */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <div key={step} className="flex flex-1 flex-col items-center gap-1.5">
              {/* Bar segment */}
              <div
                className={cn(
                  "h-1.5 w-full rounded-full transition-all duration-300",
                  isCompleted
                    ? "bg-foreground"
                    : isCurrent
                      ? "bg-foreground"
                      : "bg-border"
                )}
              />
              {/* Label */}
              {labels && labels[i] && (
                <div className="flex items-center gap-1">
                  {isCompleted && (
                    <Check className="h-3 w-3 text-success" />
                  )}
                  <span
                    className={cn(
                      "text-[10px] font-medium hidden sm:block",
                      isCurrent
                        ? "text-foreground"
                        : isCompleted
                          ? "text-success"
                          : "text-muted"
                    )}
                  >
                    {labels[i]}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Step counter */}
      <p className="mt-2 text-center text-xs text-muted sm:hidden">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
