"use client";

import { useGroup, useLeader, useTouristsByGroup, useNotifications } from "@/hooks/use-mock-data";
import {
  PageHeader,
  StatCard,
  CountdownTimer,
  StatusBadge,
  NotificationItem,
  LoadingSkeleton,
} from "@/components/shared";
import { formatCurrency, formatPercent, daysUntil } from "@/lib/utils";
import { Users, FileCheck, DollarSign, Calendar } from "lucide-react";

const LEADER_ID = "leader-1";
const GROUP_ID = "group-1";

export default function LeaderOverviewPage() {
  const { data: leader, loading: leaderLoading } = useLeader(LEADER_ID);
  const { data: group, loading: groupLoading } = useGroup(GROUP_ID);
  const { data: tourists, loading: touristsLoading } = useTouristsByGroup(GROUP_ID);
  const { data: notifications, loading: notifLoading } = useNotifications(LEADER_ID);

  const loading = leaderLoading || groupLoading || touristsLoading || notifLoading;

  if (loading || !leader || !group || !tourists) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-64 mb-2" />
        <div className="skeleton h-4 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <LoadingSkeleton variant="stat" count={4} />
        </div>
        <div className="space-y-2 mt-6">
          <LoadingSkeleton variant="card" count={3} />
        </div>
      </div>
    );
  }

  const docsComplete = tourists.filter(
    (t) =>
      t.passportStatus === "approved" &&
      t.medicalFormStatus === "approved" &&
      t.insuranceStatus === "approved" &&
      t.flightInfoStatus === "approved"
  ).length;
  const docsPercent = tourists.length > 0 ? (docsComplete / tourists.length) * 100 : 0;
  const daysLeft = daysUntil(group.startDate);

  return (
    <div className="space-y-8">
      <PageHeader title="Group Overview" description={group.name}>
        <StatusBadge status={group.status} />
      </PageHeader>

      {/* Countdown */}
      <div className="border border-border rounded-lg p-6 bg-background">
        <h2 className="text-sm font-medium text-secondary uppercase tracking-wider mb-4 text-center">
          Countdown to Departure
        </h2>
        <CountdownTimer targetDate={group.startDate} />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Tourists Enrolled"
          value={`${group.currentSize}/${group.maxCapacity}`}
          icon={Users}
          change={formatPercent((group.currentSize / group.maxCapacity) * 100)}
          trend="up"
        />
        <StatCard
          label="Documents Complete"
          value={formatPercent(docsPercent)}
          icon={FileCheck}
          change={`${docsComplete}/${tourists.length} ready`}
          trend={docsPercent >= 80 ? "up" : "neutral"}
        />
        <StatCard
          label="Payments Collected"
          value={formatCurrency(group.collectedRevenue)}
          icon={DollarSign}
          change={`of ${formatCurrency(group.totalRevenue)}`}
          trend={group.collectedRevenue >= group.totalRevenue * 0.8 ? "up" : "neutral"}
        />
        <StatCard
          label="Days Until Departure"
          value={daysLeft > 0 ? daysLeft : 0}
          icon={Calendar}
          change={daysLeft > 0 ? "upcoming" : "departed"}
          trend={daysLeft > 30 ? "neutral" : daysLeft > 0 ? "down" : "neutral"}
        />
      </div>

      {/* Activity Feed */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
        {notifications && notifications.length > 0 ? (
          <div className="border border-border rounded-lg overflow-hidden divide-y divide-border">
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">No recent activity.</p>
        )}
      </div>
    </div>
  );
}
