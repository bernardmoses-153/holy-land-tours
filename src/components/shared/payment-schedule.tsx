"use client";

import { CheckCircle2, Circle, AlertCircle, Clock } from "lucide-react";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import type { PaymentPlan } from "@/types";

interface PaymentScheduleProps {
  plan: PaymentPlan;
  compact?: boolean;
}

export function PaymentSchedule({ plan, compact = false }: PaymentScheduleProps) {
  const paidCount = plan.schedule.filter((s) => s.status === "paid").length;
  const totalCount = plan.schedule.length;
  const paidAmount = plan.schedule
    .filter((s) => s.status === "paid")
    .reduce((sum, s) => sum + s.amount, 0);
  const nextPayment = plan.schedule.find((s) => s.status === "upcoming");
  const overduePayments = plan.schedule.filter((s) => s.status === "overdue");

  if (compact) {
    return (
      <div className="rounded-xl border border-border bg-background p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Payment Progress</span>
          <span className="text-xs text-muted mono">{paidCount}/{totalCount} payments</span>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="h-2 rounded-full bg-elevated overflow-hidden">
            <div
              className="h-full rounded-full bg-foreground transition-all"
              style={{ width: `${(paidAmount / plan.totalAmount) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted mono">
            <span>{formatCurrency(paidAmount)} paid</span>
            <span>{formatCurrency(plan.totalAmount)} total</span>
          </div>
        </div>

        {overduePayments.length > 0 && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 p-2 text-xs text-red-700">
            <AlertCircle className="h-3.5 w-3.5" />
            {overduePayments.length} overdue payment{overduePayments.length > 1 ? "s" : ""} ({formatCurrency(overduePayments.reduce((s, p) => s + p.amount, 0))})
          </div>
        )}

        {nextPayment && !overduePayments.length && (
          <div className="flex items-center justify-between rounded-lg bg-elevated p-2">
            <span className="text-xs text-secondary">Next payment</span>
            <span className="text-xs font-medium mono text-foreground">
              {formatCurrency(nextPayment.amount)} — {formatDate(nextPayment.dueDate)}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-background p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Payment Schedule</h3>
        <span className={cn(
          "rounded-full px-2 py-0.5 text-xs font-medium",
          plan.status === "completed" ? "bg-green-100 text-green-700" :
          plan.status === "defaulted" ? "bg-red-100 text-red-700" :
          "bg-sky-bg text-sky"
        )}>
          {plan.status === "active" ? "Active" : plan.status === "completed" ? "Completed" : "Defaulted"}
        </span>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <p className="text-lg font-bold mono text-foreground">{formatCurrency(paidAmount)}</p>
          <p className="text-xs text-muted">Paid</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold mono text-foreground">{formatCurrency(plan.totalAmount - paidAmount)}</p>
          <p className="text-xs text-muted">Remaining</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold mono text-foreground">{paidCount}/{totalCount}</p>
          <p className="text-xs text-muted">Installments</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="h-3 rounded-full bg-elevated overflow-hidden">
          <div
            className="h-full rounded-full bg-foreground transition-all"
            style={{ width: `${(paidAmount / plan.totalAmount) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted text-right">
          {Math.round((paidAmount / plan.totalAmount) * 100)}% paid
        </p>
      </div>

      {/* Next payment CTA */}
      {nextPayment && (
        <div className="rounded-lg bg-gold-bg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Next Payment Due</p>
            <p className="text-xs text-secondary">{formatDate(nextPayment.dueDate)}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold mono text-foreground">{formatCurrency(nextPayment.amount)}</p>
            <button className="text-xs font-medium text-gold hover:opacity-80 transition-opacity">
              Pay Now
            </button>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-0">
        {plan.schedule.map((item, index) => (
          <div key={index} className="flex items-start gap-3 relative">
            {/* Line */}
            {index < plan.schedule.length - 1 && (
              <div className={cn(
                "absolute left-[11px] top-6 w-0.5 h-full",
                item.status === "paid" ? "bg-foreground" : "bg-border"
              )} />
            )}

            {/* Icon */}
            <div className="flex-shrink-0 relative z-10">
              {item.status === "paid" ? (
                <CheckCircle2 className="h-6 w-6 text-foreground" />
              ) : item.status === "overdue" ? (
                <AlertCircle className="h-6 w-6 text-error" />
              ) : (
                <Circle className="h-6 w-6 text-border" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-4 flex items-center justify-between">
              <div>
                <p className={cn(
                  "text-sm font-medium",
                  item.status === "paid" ? "text-foreground" :
                  item.status === "overdue" ? "text-error" :
                  "text-muted"
                )}>
                  {index === 0 ? "Deposit" : `Installment ${index}`}
                </p>
                <p className="text-xs text-muted">
                  {item.status === "paid" ? `Paid ${formatDate(item.paidDate!)}` :
                   item.status === "overdue" ? `Overdue since ${formatDate(item.dueDate)}` :
                   `Due ${formatDate(item.dueDate)}`}
                </p>
              </div>
              <span className={cn(
                "text-sm font-medium mono",
                item.status === "paid" ? "text-foreground" :
                item.status === "overdue" ? "text-error" :
                "text-muted"
              )}>
                {formatCurrency(item.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
