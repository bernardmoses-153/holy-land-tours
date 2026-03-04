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
      <div>
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
    </div>
  );
}
