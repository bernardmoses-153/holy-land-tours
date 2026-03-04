"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Users,
  Percent,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useGroup, useTouristsByGroup } from "@/hooks/use-mock-data";
import {
  PageHeader,
  StatCard,
  StatusBadge,
  LoadingSkeleton,
  TouristAvatar,
} from "@/components/shared";
import {
  formatCurrency,
  formatDate,
  formatPercent,
  daysUntil,
  cn,
} from "@/lib/utils";

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

export default function GroupDetailPage() {
  const params = useParams();
  const groupId = params.groupId as string;
  const { data: group, loading: groupLoading } = useGroup(groupId);
  const { data: tourists, loading: touristsLoading } =
    useTouristsByGroup(groupId);

  const loading = groupLoading || touristsLoading;

  const stats = useMemo(() => {
    if (!group || !tourists) return null;
    const fillRate = (group.currentSize / group.maxCapacity) * 100;
    const days = daysUntil(group.startDate);

    const overdueCount = tourists.filter(
      (t) => t.paymentStatus === "overdue"
    ).length;
    const docsIncomplete = tourists.filter(
      (t) =>
        t.passportStatus !== "approved" ||
        t.medicalFormStatus !== "approved" ||
        t.insuranceStatus !== "approved" ||
        t.flightInfoStatus !== "approved"
    ).length;

    return { fillRate, days, overdueCount, docsIncomplete };
  }, [group, tourists]);

  if (loading) {
    return (
      <div>
        <div className="mb-6">
          <LoadingSkeleton variant="text" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <TabNav groupId={groupId} active="overview" />

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Tourists"
            value={`${group.currentSize} / ${group.maxCapacity}`}
            icon={Users}
          />
          <StatCard
            label="Fill Rate"
            value={formatPercent(stats.fillRate)}
            icon={Percent}
          />
          <StatCard
            label="Revenue Collected"
            value={formatCurrency(group.collectedRevenue)}
            icon={DollarSign}
            change={`of ${formatCurrency(group.totalRevenue)}`}
            trend="neutral"
          />
          <StatCard
            label="Days Until Departure"
            value={stats.days > 0 ? stats.days : "In progress"}
            icon={Calendar}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leader Info */}
        <div className="border border-border rounded-lg p-5 bg-background">
          <h3 className="text-sm font-medium text-foreground mb-4">
            Group Leader
          </h3>
          <div className="flex items-center gap-3 mb-4">
            <TouristAvatar name={group.leaderName} size="lg" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {group.leaderName}
              </p>
              <p className="text-xs text-secondary">{group.itineraryName}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-secondary">
              <Calendar className="h-3.5 w-3.5 text-muted" />
              <span className="mono">
                {formatDate(group.startDate)} - {formatDate(group.endDate)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <DollarSign className="h-3.5 w-3.5 text-muted" />
              <span className="mono">
                {formatCurrency(group.pricePerPerson)} per person
              </span>
            </div>
          </div>
        </div>

        {/* Quick Activity / Alerts */}
        <div className="lg:col-span-2 border border-border rounded-lg p-5 bg-background">
          <h3 className="text-sm font-medium text-foreground mb-4">
            Alerts & Activity
          </h3>
          <div className="space-y-3">
            {stats && stats.overdueCount > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-error-bg">
                <AlertTriangle className="h-4 w-4 text-error mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-error">
                    Overdue Payments
                  </p>
                  <p className="text-xs text-error/80">
                    {stats.overdueCount} tourist{stats.overdueCount !== 1 ? "s" : ""}{" "}
                    with overdue payments
                  </p>
                </div>
              </div>
            )}
            {stats && stats.docsIncomplete > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-warning-bg">
                <Clock className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-warning">
                    Incomplete Documents
                  </p>
                  <p className="text-xs text-warning/80">
                    {stats.docsIncomplete} tourist{stats.docsIncomplete !== 1 ? "s" : ""}{" "}
                    with pending documents
                  </p>
                </div>
              </div>
            )}
            {group.currentSize >= group.maxCapacity && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-success-bg">
                <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-success">
                    Group Full
                  </p>
                  <p className="text-xs text-success/80">
                    This group has reached maximum capacity
                  </p>
                </div>
              </div>
            )}
            {stats &&
              stats.overdueCount === 0 &&
              stats.docsIncomplete === 0 &&
              group.currentSize < group.maxCapacity && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-success-bg">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-success">
                      All Clear
                    </p>
                    <p className="text-xs text-success/80">
                      No outstanding alerts for this group
                    </p>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
