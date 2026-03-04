"use client";

import { useMemo } from "react";
import { DollarSign, TrendingUp, PieChart, BarChart3 } from "lucide-react";
import { useGroups, useCommissions } from "@/hooks/use-mock-data";
import {
  PageHeader,
  StatCard,
  DataTable,
  StatusBadge,
  LoadingSkeleton,
} from "@/components/shared";
import { formatCurrency, formatPercent } from "@/lib/utils";

export default function RevenuePage() {
  const { data: groups, loading: groupsLoading } = useGroups();
  const { data: commissions, loading: commissionsLoading } = useCommissions();

  const loading = groupsLoading || commissionsLoading;

  const stats = useMemo(() => {
    if (!groups || !commissions) return null;

    const totalRevenue = groups.reduce((sum, g) => sum + g.totalRevenue, 0);
    const totalCommissions = commissions.reduce(
      (sum, c) => sum + c.totalAmount,
      0
    );
    const netRevenue = totalRevenue - totalCommissions;
    const activeGroups = groups.filter(
      (g) => g.status !== "draft" && g.status !== "cancelled"
    );
    const avgPerGroup =
      activeGroups.length > 0 ? totalRevenue / activeGroups.length : 0;

    return {
      totalRevenue,
      totalCommissions,
      netRevenue,
      avgPerGroup,
    };
  }, [groups, commissions]);

  return (
    <div>
      <PageHeader
        title="Revenue & Commissions"
        description="Track revenue across all groups and manage leader commissions."
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <LoadingSkeleton variant="stat" count={4} />
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={DollarSign}
            trend="up"
            change="+12%"
          />
          <StatCard
            label="Total Commissions"
            value={formatCurrency(stats.totalCommissions)}
            icon={TrendingUp}
          />
          <StatCard
            label="Net Revenue"
            value={formatCurrency(stats.netRevenue)}
            icon={PieChart}
            trend="up"
            change="After commissions"
          />
          <StatCard
            label="Avg Per Group"
            value={formatCurrency(stats.avgPerGroup)}
            icon={BarChart3}
          />
        </div>
      ) : null}

      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">
          Commission Breakdown
        </h3>

        {loading ? (
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <LoadingSkeleton variant="table-row" count={5} />
              </tbody>
            </table>
          </div>
        ) : commissions && commissions.length > 0 ? (
          <DataTable
            headers={[
              "Leader",
              "Group",
              "Tourists",
              "Rate",
              "Total",
              "Paid",
              "Status",
            ]}
          >
            {commissions.map((commission) => (
              <tr
                key={commission.id}
                className="hover:bg-surface transition-colors"
              >
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  {commission.leaderName}
                </td>
                <td className="px-4 py-3 text-sm text-body">
                  {commission.groupName}
                </td>
                <td className="px-4 py-3 text-sm mono text-secondary">
                  {commission.touristsRecruited}
                </td>
                <td className="px-4 py-3 text-sm mono text-secondary">
                  {commission.rate}%
                </td>
                <td className="px-4 py-3 text-sm mono font-medium text-foreground">
                  {formatCurrency(commission.totalAmount)}
                </td>
                <td className="px-4 py-3 text-sm mono text-secondary">
                  {formatCurrency(commission.paidAmount)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={commission.status} />
                </td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <div className="border border-border rounded-lg p-8 text-center">
            <p className="text-sm text-muted">No commissions recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
