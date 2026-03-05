"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DollarSign, TrendingUp, AlertCircle, Percent } from "lucide-react";
import {
  useGroup,
  useTouristsByGroup,
  usePaymentsByGroup,
} from "@/hooks/use-mock-data";
import {
  PageHeader,
  StatCard,
  DataTable,
  StatusBadge,
  LoadingSkeleton,
} from "@/components/shared";
import { formatCurrency, formatDate, formatPercent, cn } from "@/lib/utils";
import { getGroupCosts, getSupplierBookingsByGroup, getGuideAssignmentsByGroup } from "@/data/mock-data";
import { Building, Bus, UtensilsCrossed, MapPin, Activity, ArrowRightLeft, TrendingDown, TrendingUp as TrendingUpIcon } from "lucide-react";

function TabNav({ groupId, active }: { groupId: string; active: string }) {
  const tabs = [
    { label: "Overview", href: `/operator/groups/${groupId}`, key: "overview" },
    {
      label: "Tourists",
      href: `/operator/groups/${groupId}/tourists`,
      key: "tourists",
    },
    {
      label: "Financials",
      href: `/operator/groups/${groupId}/financials`,
      key: "financials",
    },
    {
      label: "Itinerary",
      href: `/operator/groups/${groupId}/itinerary`,
      key: "itinerary",
    },
  ];

  return (
    <div className="border-b border-border mb-6">
      <nav className="flex gap-0 -mb-px">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={tab.href}
            className={cn(
              "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
              active === tab.key
                ? "border-foreground text-foreground"
                : "border-transparent text-secondary hover:text-foreground hover:border-border"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function GroupFinancialsPage() {
  const params = useParams();
  const groupId = params.groupId as string;
  const { data: group, loading: groupLoading } = useGroup(groupId);
  const { data: tourists, loading: touristsLoading } =
    useTouristsByGroup(groupId);
  const { data: payments, loading: paymentsLoading } =
    usePaymentsByGroup(groupId);

  const loading = groupLoading || touristsLoading || paymentsLoading;

  const financialStats = useMemo(() => {
    if (!group) return null;
    const outstanding = group.totalRevenue - group.collectedRevenue;
    const collectionRate =
      group.totalRevenue > 0
        ? (group.collectedRevenue / group.totalRevenue) * 100
        : 0;
    return {
      totalRevenue: group.totalRevenue,
      collected: group.collectedRevenue,
      outstanding,
      collectionRate,
    };
  }, [group]);

  const outstandingTourists = useMemo(() => {
    if (!tourists) return [];
    return tourists
      .filter((t) => t.amountDue > 0)
      .sort((a, b) => b.amountDue - a.amountDue);
  }, [tourists]);

  if (loading) {
    return (
      <div>
        <div className="mb-6">
          <LoadingSkeleton variant="text" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <LoadingSkeleton variant="stat" count={4} />
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-muted">Group not found.</p>
        <Link
          href="/operator/groups"
          className="text-sm text-foreground underline mt-2 inline-block"
        >
          Back to groups
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={group.name}>
        <StatusBadge status={group.status} />
      </PageHeader>

      <TabNav groupId={groupId} active="financials" />

      {financialStats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Revenue"
            value={formatCurrency(financialStats.totalRevenue)}
            icon={DollarSign}
          />
          <StatCard
            label="Collected"
            value={formatCurrency(financialStats.collected)}
            icon={TrendingUp}
            trend="up"
          />
          <StatCard
            label="Outstanding"
            value={formatCurrency(financialStats.outstanding)}
            icon={AlertCircle}
            trend={financialStats.outstanding > 0 ? "down" : "neutral"}
          />
          <StatCard
            label="Collection Rate"
            value={formatPercent(financialStats.collectionRate)}
            icon={Percent}
          />
        </div>
      )}

      {/* Recent Payments */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-foreground mb-3">
          Recent Payments
        </h3>
        {payments && payments.length > 0 ? (
          <DataTable headers={["Tourist", "Amount", "Date", "Type", "Method"]}>
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-surface transition-colors">
                <td className="px-4 py-3 text-sm text-foreground">
                  {payment.touristName}
                </td>
                <td className="px-4 py-3 text-sm mono font-medium text-foreground">
                  {formatCurrency(payment.amount)}
                </td>
                <td className="px-4 py-3 text-sm mono text-secondary">
                  {formatDate(payment.date)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={payment.type} />
                </td>
                <td className="px-4 py-3 text-sm text-secondary capitalize">
                  {payment.method.replace(/_/g, " ")}
                </td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <div className="border border-border rounded-lg p-8 text-center">
            <p className="text-sm text-muted">No payments recorded yet.</p>
          </div>
        )}
      </div>

      {/* Outstanding Balances */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-foreground mb-3">
          Outstanding Balances
        </h3>
        {outstandingTourists.length > 0 ? (
          <DataTable
            headers={["Tourist", "Paid", "Outstanding", "Payment Status"]}
          >
            {outstandingTourists.map((tourist) => (
              <tr
                key={tourist.id}
                className="hover:bg-surface transition-colors"
              >
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  {tourist.name}
                </td>
                <td className="px-4 py-3 text-sm mono text-foreground">
                  {formatCurrency(tourist.amountPaid)}
                </td>
                <td className="px-4 py-3 text-sm mono font-medium text-error">
                  {formatCurrency(tourist.amountDue)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={tourist.paymentStatus} />
                </td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <div className="border border-border rounded-lg p-8 text-center">
            <p className="text-sm text-muted">
              All balances have been collected.
            </p>
          </div>
        )}
      </div>

      {/* Costs Breakdown & P&L */}
      {(() => {
        const costs = getGroupCosts(groupId);
        if (!costs || !group) return null;

        const totalCosts = costs.hotel + costs.transport + costs.guide + costs.meals + costs.activities + costs.other;
        const grossMargin = group.totalRevenue - totalCosts - costs.commissions;
        const marginPercent = group.totalRevenue > 0 ? (grossMargin / group.totalRevenue) * 100 : 0;
        const perTouristRevenue = group.currentSize > 0 ? group.totalRevenue / group.currentSize : 0;
        const perTouristCost = group.currentSize > 0 ? (totalCosts + costs.commissions) / group.currentSize : 0;
        const perTouristMargin = perTouristRevenue - perTouristCost;

        const costItems = [
          { label: "Hotels", amount: costs.hotel, icon: Building },
          { label: "Transport", amount: costs.transport, icon: Bus },
          { label: "Guide", amount: costs.guide, icon: MapPin },
          { label: "Meals", amount: costs.meals, icon: UtensilsCrossed },
          { label: "Activities", amount: costs.activities, icon: Activity },
          { label: "Other", amount: costs.other, icon: ArrowRightLeft },
        ];

        return (
          <div className="space-y-6">
            {/* P&L Summary */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">
                Profit & Loss
              </h3>
              <div className="rounded-xl border border-border bg-background p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted uppercase tracking-wider">Revenue</p>
                    <p className="text-xl font-bold mono text-foreground">{formatCurrency(group.totalRevenue)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted uppercase tracking-wider">Total Costs</p>
                    <p className="text-xl font-bold mono text-foreground">{formatCurrency(totalCosts + costs.commissions)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted uppercase tracking-wider">Gross Margin</p>
                    <p className={cn(
                      "text-xl font-bold mono",
                      grossMargin >= 0 ? "text-green-600" : "text-error"
                    )}>
                      {formatCurrency(grossMargin)}
                    </p>
                    <p className={cn(
                      "text-xs font-medium",
                      marginPercent >= 25 ? "text-green-600" : marginPercent >= 15 ? "text-gold" : "text-error"
                    )}>
                      {formatPercent(marginPercent)} margin
                    </p>
                  </div>
                </div>

                {/* Visual P&L bar */}
                <div className="space-y-1">
                  <div className="h-4 rounded-full bg-elevated overflow-hidden flex">
                    <div
                      className="h-full bg-foreground"
                      style={{ width: `${((totalCosts + costs.commissions) / group.totalRevenue) * 100}%` }}
                    />
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${marginPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted">
                    <span>Costs ({formatPercent(100 - marginPercent)})</span>
                    <span>Margin ({formatPercent(marginPercent)})</span>
                  </div>
                </div>

                {/* Per-tourist economics */}
                <div className="border-t border-border pt-4 grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <p className="text-xs text-muted">Revenue/Tourist</p>
                    <p className="text-sm font-semibold mono text-foreground">{formatCurrency(perTouristRevenue)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted">Cost/Tourist</p>
                    <p className="text-sm font-semibold mono text-foreground">{formatCurrency(perTouristCost)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted">Margin/Tourist</p>
                    <p className={cn(
                      "text-sm font-semibold mono",
                      perTouristMargin >= 0 ? "text-green-600" : "text-error"
                    )}>
                      {formatCurrency(perTouristMargin)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">
                Costs Breakdown
              </h3>
              <div className="rounded-xl border border-border bg-background divide-y divide-border">
                {costItems.map((item) => {
                  const Icon = item.icon;
                  const percent = totalCosts > 0 ? (item.amount / totalCosts) * 100 : 0;
                  return (
                    <div key={item.label} className="flex items-center justify-between px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-secondary" />
                        <span className="text-sm text-foreground">{item.label}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium mono text-foreground">
                          {formatCurrency(item.amount)}
                        </span>
                        <span className="text-xs text-muted ml-2">
                          ({formatPercent(percent)})
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between px-5 py-3 bg-elevated">
                  <span className="text-sm font-medium text-foreground">Commissions</span>
                  <span className="text-sm font-medium mono text-foreground">
                    {formatCurrency(costs.commissions)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-5 py-3 bg-surface">
                  <span className="text-sm font-semibold text-foreground">Total Costs</span>
                  <span className="text-sm font-bold mono text-foreground">
                    {formatCurrency(totalCosts + costs.commissions)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
