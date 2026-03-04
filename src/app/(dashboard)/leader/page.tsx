"use client";

import { useGroup, useLeader, useTouristsByGroup, useNotifications, useLeaderInsights, useWeatherForDay } from "@/hooks/use-mock-data";
import {
  PageHeader,
  StatCard,
  CountdownTimer,
  StatusBadge,
  LoadingSkeleton,
  AIAssistantCard,
  ReadinessGauge,
  ActionCard,
  TouristAvatar,
  WeatherCard,
} from "@/components/shared";
import { formatCurrency, formatPercent, daysUntil, cn } from "@/lib/utils";
import { Users, FileCheck, DollarSign, Calendar, Send, AlertTriangle, CheckCircle2, Bot } from "lucide-react";
import Link from "next/link";

const LEADER_ID = "leader-1";
const GROUP_ID = "group-1";

export default function LeaderOverviewPage() {
  const { data: leader, loading: leaderLoading } = useLeader(LEADER_ID);
  const { data: group, loading: groupLoading } = useGroup(GROUP_ID);
  const { data: tourists, loading: touristsLoading } = useTouristsByGroup(GROUP_ID);
  const { data: notifications, loading: notifLoading } = useNotifications(LEADER_ID);
  const { data: aiInsights } = useLeaderInsights();
  const { data: weather } = useWeatherForDay(1);

  const loading = leaderLoading || groupLoading || touristsLoading || notifLoading;

  if (loading || !leader || !group || !tourists) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-64 mb-2" />
        <div className="skeleton h-4 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <LoadingSkeleton variant="stat" count={4} />
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

  // Calculate overall readiness
  const paymentComplete = tourists.filter((t) => t.paymentStatus === "paid_full").length;
  const readinessScore = tourists.length > 0
    ? ((docsComplete + paymentComplete) / (tourists.length * 2)) * 100
    : 0;

  // Tourists needing attention
  const needsAttention = tourists.filter(
    (t) =>
      t.paymentStatus === "overdue" ||
      t.passportStatus === "not_started" ||
      t.passportStatus === "rejected" ||
      t.medicalFormStatus === "not_started"
  );

  return (
    <div className="space-y-8">
      <PageHeader title="Group Overview" description={group.name}>
        <StatusBadge status={group.status} />
      </PageHeader>

      {/* AI Insights Panel */}
      {aiInsights && aiInsights.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Bot className="h-4 w-4 text-gold" />
            AI Insights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {aiInsights.slice(0, 2).map((insight) => (
              <AIAssistantCard
                key={insight.id}
                message={insight.content}
                category={insight.category}
                actionLabel="Take Action"
                onAction={() => {
                  if (insight.category === "documents") window.location.href = "/leader/tourists";
                  else if (insight.category === "payments") window.location.href = "/leader/tourists";
                  else window.location.href = "/leader/assistant";
                }}
                variant="gold"
              />
            ))}
          </div>
        </div>
      )}

      {/* Stats + Readiness row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Stat Cards */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Readiness Gauge */}
        <div className="rounded-xl border border-border bg-background p-4 flex items-center justify-center">
          <ReadinessGauge percentage={readinessScore} size={100} label="Group Ready" />
        </div>
      </div>

      {/* Weather Preview */}
      {weather && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <WeatherCard weather={weather} />
          <div className="border border-border rounded-lg p-6 bg-background">
            <h2 className="text-sm font-medium text-secondary uppercase tracking-wider mb-4 text-center">
              Countdown to Departure
            </h2>
            <CountdownTimer targetDate={group.startDate} />
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <ActionCard
            icon={Send}
            title="Send Announcement"
            description="Notify your group about updates"
            actionLabel="Compose"
            variant="accent"
            onClick={() => { window.location.href = "/leader/announcements"; }}
          />
          <ActionCard
            icon={Bot}
            title="Ask AI Assistant"
            description="Get help with tour planning"
            actionLabel="Open"
            variant="warm"
            onClick={() => { window.location.href = "/leader/assistant"; }}
          />
          <ActionCard
            icon={Users}
            title="View Roster"
            description="Manage tourist details"
            actionLabel="View"
            onClick={() => { window.location.href = "/leader/tourists"; }}
          />
        </div>
      </div>

      {/* Tourist Readiness Grid */}
      {needsAttention.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            Needs Attention ({needsAttention.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {needsAttention.map((t) => (
              <Link
                key={t.id}
                href={`/leader/tourists/${t.id}`}
                className="flex items-center gap-3 rounded-xl border border-warning/20 bg-warning-bg p-4 hover:border-warning/40 transition-colors"
              >
                <TouristAvatar name={t.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{t.name}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {t.paymentStatus === "overdue" && (
                      <span className="text-[10px] bg-error-bg text-error px-1.5 py-0.5 rounded-full">Payment overdue</span>
                    )}
                    {t.passportStatus === "not_started" && (
                      <span className="text-[10px] bg-warning-bg text-warning px-1.5 py-0.5 rounded-full">No passport</span>
                    )}
                    {t.medicalFormStatus === "not_started" && (
                      <span className="text-[10px] bg-warning-bg text-warning px-1.5 py-0.5 rounded-full">No medical</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Tourists Readiness Grid */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-foreground">All Tourists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {tourists.map((t) => {
            const isReady =
              t.passportStatus === "approved" &&
              t.medicalFormStatus === "approved" &&
              t.insuranceStatus === "approved" &&
              t.flightInfoStatus === "approved" &&
              t.paymentStatus === "paid_full";
            return (
              <Link
                key={t.id}
                href={`/leader/tourists/${t.id}`}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-colors hover:bg-surface",
                  isReady ? "border-success/20 bg-success-bg/30" : "border-border bg-background"
                )}
              >
                <TouristAvatar name={t.name} size="sm" />
                <p className="text-xs font-medium text-foreground truncate w-full">{t.name.split(" ")[0]}</p>
                {isReady ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <span className="text-[10px] text-muted">In progress</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
