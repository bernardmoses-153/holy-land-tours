"use client";

import { useLeader, useCommissionsByLeader } from "@/hooks/use-mock-data";
import {
  PageHeader,
  StatCard,
  StatusBadge,
  DataTable,
  LoadingSkeleton,
} from "@/components/shared";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { DollarSign, Percent, Users, Wallet } from "lucide-react";

const LEADER_ID = "leader-1";

export default function EarningsPage() {
  const { data: leader, loading: leaderLoading } = useLeader(LEADER_ID);
  const { data: commissions, loading: comLoading } =
    useCommissionsByLeader(LEADER_ID);

  const loading = leaderLoading || comLoading;

  if (loading || !leader || !commissions) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48 mb-2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <LoadingSkeleton variant="stat" count={4} />
        </div>
        <LoadingSkeleton variant="table-row" count={3} />
      </div>
    );
  }

  const totalEarnings = commissions.reduce((sum, c) => sum + c.totalAmount, 0);
  const totalPaid = commissions.reduce((sum, c) => sum + c.paidAmount, 0);
  const pendingPayouts = totalEarnings - totalPaid;

  return (
    <div className="space-y-8">
      <PageHeader title="Earnings & Commissions" />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Earnings"
          value={formatCurrency(totalEarnings)}
          icon={DollarSign}
          trend="up"
          change={`${commissions.length} groups`}
        />
        <StatCard
          label="Commission Rate"
          value={`${leader.commissionRate}%`}
          icon={Percent}
        />
        <StatCard
          label="Tourists Recruited"
          value={leader.touristsRecruited}
          icon={Users}
          trend="up"
          change="total"
        />
        <StatCard
          label="Pending Payouts"
          value={formatCurrency(pendingPayouts)}
          icon={Wallet}
          trend={pendingPayouts > 0 ? "neutral" : "up"}
          change={pendingPayouts > 0 ? "awaiting" : "all paid"}
        />
      </div>

      {/* Commissions Table */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Commission Breakdown
        </h2>
        <DataTable
          headers={[
            "Group",
            "Tourists",
            "Rate",
            "Total Amount",
            "Paid",
            "Status",
          ]}
        >
          {commissions.map((c) => (
            <tr key={c.id} className="hover:bg-surface transition-colors">
              <td className="px-4 py-3">
                <span className="text-sm font-medium text-foreground">
                  {c.groupName}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm mono text-foreground">
                  {c.touristsRecruited}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm mono text-foreground">
                  {c.rate}%
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm font-medium mono text-foreground">
                  {formatCurrency(c.totalAmount)}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm mono text-secondary">
                  {formatCurrency(c.paidAmount)}
                </span>
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={c.status} />
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
}
