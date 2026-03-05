"use client";

import { useState } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import { ChevronDown, ChevronUp, ShieldCheck, Check } from "lucide-react";
import { FillRateBar } from "./fill-rate-bar";
import { depositConfig } from "@/data/onboarding-data";

interface DepositCardProps {
  totalPrice: number;
  spotsRemaining: number;
  maxCapacity: number;
  currentSize: number;
  joinedCount?: number;
  onSecureSpot?: () => void;
  termsAccepted?: boolean;
  onToggleTerms?: () => void;
  className?: string;
}

export function DepositCard({
  totalPrice,
  spotsRemaining,
  maxCapacity,
  currentSize,
  joinedCount = 0,
  onSecureSpot,
  termsAccepted = false,
  onToggleTerms,
  className,
}: DepositCardProps) {
  const [showIncluded, setShowIncluded] = useState(false);
  const depositAmount = Math.round(totalPrice * depositConfig.percentage);
  const remainingAmount = totalPrice - depositAmount;

  return (
    <div className={cn("rounded-xl border border-border bg-background space-y-4 p-5", className)}>
      {/* Header */}
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-foreground">Secure Your Spot</h3>
        <p className="text-xs text-muted">
          Reserve your place on this life-changing journey
        </p>
      </div>

      {/* Fill rate */}
      <div className="space-y-1">
        <FillRateBar
          current={currentSize}
          max={maxCapacity}
          label="Group capacity"
        />
        <p className="text-xs font-medium text-warning">
          Only {spotsRemaining} spot{spotsRemaining !== 1 ? "s" : ""} remaining
        </p>
      </div>

      {/* What's included — expandable */}
      <button
        type="button"
        onClick={() => setShowIncluded(!showIncluded)}
        className="flex w-full items-center justify-between rounded-lg bg-surface px-3 py-2 text-xs font-medium text-foreground hover:bg-elevated transition-colors"
      >
        What&apos;s included
        {showIncluded ? (
          <ChevronUp className="h-3.5 w-3.5" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )}
      </button>
      {showIncluded && (
        <div className="rounded-lg bg-surface px-3 py-2 space-y-1.5">
          {depositConfig.includedItems.map((item) => (
            <div key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 h-3 w-3 shrink-0 text-success" />
              <span className="text-xs text-secondary">{item}</span>
            </div>
          ))}
        </div>
      )}

      {/* Price breakdown */}
      <div className="space-y-2 rounded-lg border border-border p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-secondary">Total per person</span>
          <span className="font-semibold text-foreground">
            {formatCurrency(totalPrice)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Deposit today</span>
          <span className="text-lg font-bold text-foreground">
            {formatCurrency(depositAmount)}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Remaining balance</span>
          <span>{formatCurrency(remainingAmount)} due 60 days before</span>
        </div>
      </div>

      {/* Refund guarantee */}
      <div className="flex items-start gap-2 rounded-lg bg-olive-bg px-3 py-2.5">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
        <p className="text-xs text-olive">
          <span className="font-semibold">{depositConfig.refundDays}-day full refund guarantee.</span>{" "}
          Change your mind? Get a complete refund within {depositConfig.refundDays} days.
        </p>
      </div>

      {/* Social proof */}
      {joinedCount > 0 && (
        <p className="text-center text-xs text-muted">
          {joinedCount} {joinedCount === 1 ? "person has" : "people have"} already joined
        </p>
      )}

      {/* Terms */}
      {onToggleTerms && (
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={onToggleTerms}
            className="mt-0.5 h-4 w-4 rounded border-border accent-foreground"
          />
          <span className="text-xs text-secondary">
            I agree to the{" "}
            <span className="underline">Terms of Service</span> and{" "}
            <span className="underline">Cancellation Policy</span>
          </span>
        </label>
      )}

      {/* CTA */}
      {onSecureSpot && (
        <button
          type="button"
          onClick={onSecureSpot}
          disabled={onToggleTerms ? !termsAccepted : false}
          className={cn(
            "w-full rounded-lg px-4 py-3 text-sm font-medium transition-opacity",
            onToggleTerms && !termsAccepted
              ? "cursor-not-allowed bg-elevated text-muted"
              : "bg-foreground text-background hover:opacity-90"
          )}
        >
          Secure My Spot — {formatCurrency(depositAmount)}
        </button>
      )}
    </div>
  );
}
