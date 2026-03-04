"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Globe,
  DollarSign,
  Percent,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { useGroups, useOperator } from "@/hooks/use-mock-data";
import {
  PageHeader,
  StatCard,
  StatusBadge,
  FillRateBar,
  LoadingSkeleton,
} from "@/components/shared";
import { formatCurrency, formatDate, formatPercent } from "@/lib/utils";
import { GROUP_STATUS_LABELS } from "@/lib/constants";

export default function OperatorDashboard() {
  const { data: groups, loading: groupsLoading } = useGroups();
  const { data: operator, loading: operatorLoading } = useOperator();

  const loading = groupsLoading || operatorLoading;

  const stats = useMemo(() => {
    if (!groups || !operator) return null;
    const activeTourists = groups.reduce((sum, g) => sum + g.currentSize, 0);
    const totalRevenue = operator.totalRevenue;
    const totalCollected = groups.reduce(
      (sum, g) => sum + g.collectedRevenue,
      0
    );
    const totalExpected = groups.reduce((sum, g) => sum + g.totalRevenue, 0);
    const collectionRate =
      totalExpected > 0 ? (totalCollected / totalExpected) * 100 : 0;

    return {
      totalGroups: operator.totalGroups,
      activeTourists,
      totalRevenue,
      collectionRate,
    };
  }, [groups, operator]);

  return (
    <div>
      <PageHeader
        title="Portfolio Overview"
        description="Manage your tour groups, leaders, and revenue at a glance."
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <LoadingSkeleton variant="stat" count={4} />
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Groups"
            value={stats.totalGroups}
            icon={Users}
            change="+2 this quarter"
            trend="up"
          />
          <StatCard
            label="Active Tourists"
            value={`${stats.activeTourists}+`}
            icon={Globe}
            change="Across all groups"
            trend="neutral"
          />
          <StatCard
            label="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={DollarSign}
            change="+12%"
            trend="up"
          />
          <StatCard
            label="Collection Rate"
            value={formatPercent(stats.collectionRate)}
            icon={Percent}
            change="On track"
            trend="up"
          />
        </div>
      ) : null}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Groups by Status
          </h2>
          <Link
            href="/operator/groups"
            className="text-sm text-secondary hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            View all groups
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <LoadingSkeleton variant="card" count={6} />
          </div>
        ) : groups ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => (
              <Link
                key={group.id}
                href={`/operator/groups/${group.id}`}
                className="block border border-border rounded-lg p-5 bg-background hover:border-border-hover hover:bg-surface transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {group.name}
                    </h3>
                    <p className="text-xs text-secondary mt-0.5">
                      {group.leaderName}
                    </p>
                  </div>
                  <StatusBadge status={group.status} />
                </div>

                <div className="flex items-center gap-2 text-xs text-muted mb-3">
                  <Calendar className="h-3 w-3" />
                  <span className="mono">
                    {formatDate(group.startDate)} - {formatDate(group.endDate)}
                  </span>
                </div>

                <FillRateBar
                  current={group.currentSize}
                  max={group.maxCapacity}
                  label="Fill Rate"
                />

                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-sm font-medium mono text-foreground">
                    {formatCurrency(group.pricePerPerson)}
                  </span>
                  <span className="text-xs text-muted">per person</span>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
