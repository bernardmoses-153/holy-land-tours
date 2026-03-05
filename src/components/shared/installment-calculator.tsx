"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface InstallmentCalculatorProps {
  totalPrice: number;
  depositAmount: number;
  installmentOptions: number[];
}

export function InstallmentCalculator({
  totalPrice,
  depositAmount,
  installmentOptions,
}: InstallmentCalculatorProps) {
  const [selectedPlan, setSelectedPlan] = useState(installmentOptions[installmentOptions.length - 1] || 12);

  const remaining = totalPrice - depositAmount;
  const monthly = Math.ceil(remaining / selectedPlan);

  return (
    <div className="rounded-xl border border-border bg-background p-6 space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Calculator className="h-4 w-4" />
        Payment Calculator
      </div>

      <div className="text-center space-y-1">
        <p className="text-3xl font-bold mono text-foreground">
          {formatCurrency(monthly)}
          <span className="text-base font-normal text-secondary">/month</span>
        </p>
        <p className="text-xs text-muted">
          for {selectedPlan} months after {formatCurrency(depositAmount)} deposit
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setSelectedPlan(0)}
          className={cn(
            "flex-1 rounded-lg border py-2 text-sm font-medium transition-all",
            selectedPlan === 0
              ? "border-foreground bg-foreground text-background"
              : "border-border text-secondary hover:border-border-hover"
          )}
        >
          Pay in Full
        </button>
        {installmentOptions.map((months) => (
          <button
            key={months}
            type="button"
            onClick={() => setSelectedPlan(months)}
            className={cn(
              "flex-1 rounded-lg border py-2 text-sm font-medium transition-all",
              selectedPlan === months
                ? "border-foreground bg-foreground text-background"
                : "border-border text-secondary hover:border-border-hover"
            )}
          >
            {months} mo
          </button>
        ))}
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-secondary">Trip price</span>
          <span className="mono font-medium text-foreground">{formatCurrency(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-secondary">Deposit (due now)</span>
          <span className="mono font-medium text-foreground">{formatCurrency(depositAmount)}</span>
        </div>
        {selectedPlan > 0 && (
          <>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="text-secondary">Remaining balance</span>
              <span className="mono font-medium text-foreground">{formatCurrency(remaining)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">{selectedPlan} monthly payments of</span>
              <span className="mono font-semibold text-foreground">{formatCurrency(monthly)}</span>
            </div>
          </>
        )}
        {selectedPlan === 0 && (
          <div className="border-t border-border pt-2 flex justify-between">
            <span className="text-secondary">Total due now</span>
            <span className="mono font-semibold text-foreground">{formatCurrency(totalPrice)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
