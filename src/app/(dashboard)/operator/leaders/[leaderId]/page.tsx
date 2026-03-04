"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Users,
  DollarSign,
  Percent,
  Mail,
  Phone,
  Building,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { useLeader, useGroupsByLeader } from "@/hooks/use-mock-data";
import {
  PageHeader,
  StatCard,
  StatusBadge,
  FillRateBar,
  TouristAvatar,
  LoadingSkeleton,
} from "@/components/shared";
import { formatCurrency, formatDate, formatPercent } from "@/lib/utils";

export default function LeaderDetailPage() {
  const params = useParams();
  const leaderId = params.leaderId as string;
  const { data: leader, loading: leaderLoading } = useLeader(leaderId);
  const { data: assignedGroups, loading: groupsLoading } =
    useGroupsByLeader(leaderId);

  const loading = leaderLoading || groupsLoading;

  if (loading) {
    return (
      <div>
        <div className="mb-6">
          <LoadingSkeleton variant="text" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <LoadingSkeleton variant="stat" count={4} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <LoadingSkeleton variant="card" count={2} />
        </div>
      </div>
    );
  }

  if (!leader) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-muted">Leader not found.</p>
        <Link
          href="/operator/leaders"
          className="text-sm text-foreground underline mt-2 inline-block"
        >
          Back to leaders
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <Link
          href="/operator/leaders"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Leaders
        </Link>
      </div>

      <PageHeader title={leader.name} description={leader.title} />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Performance Score"
          value={`${leader.performanceScore}/100`}
          icon={Star}
        />
        <StatCard
          label="Tourists Recruited"
          value={leader.touristsRecruited}
          icon={Users}
        />
        <StatCard
          label="Total Earnings"
          value={formatCurrency(leader.totalEarnings)}
          icon={DollarSign}
        />
        <StatCard
          label="Commission Rate"
          value={`${leader.commissionRate}%`}
          icon={Percent}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assigned Groups */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Assigned Groups
          </h3>
          {assignedGroups && assignedGroups.length > 0 ? (
            <div className="space-y-3">
              {assignedGroups.map((group) => (
                <Link
                  key={group.id}
                  href={`/operator/groups/${group.id}`}
                  className="flex items-center justify-between border border-border rounded-lg p-4 bg-background hover:border-border-hover hover:bg-surface transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {group.name}
                      </h4>
                      <StatusBadge status={group.status} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-secondary">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted" />
                        <span className="mono">
                          {formatDate(group.startDate)} -{" "}
                          {formatDate(group.endDate)}
                        </span>
                      </span>
                      <span className="mono">
                        {formatCurrency(group.totalRevenue)}
                      </span>
                    </div>
                    <div className="mt-2 max-w-xs">
                      <FillRateBar
                        current={group.currentSize}
                        max={group.maxCapacity}
                      />
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted shrink-0 ml-3" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-border rounded-lg p-8 text-center">
              <p className="text-sm text-muted">No groups assigned.</p>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">
            Contact Information
          </h3>
          <div className="border border-border rounded-lg p-5 bg-background">
            <div className="flex items-center gap-3 mb-4">
              <TouristAvatar name={leader.name} size="lg" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {leader.name}
                </p>
                <p className="text-xs text-secondary">{leader.title}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-secondary">
                <Building className="h-3.5 w-3.5 text-muted shrink-0" />
                <span>{leader.organization}</span>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <Mail className="h-3.5 w-3.5 text-muted shrink-0" />
                <a
                  href={`mailto:${leader.email}`}
                  className="hover:text-foreground transition-colors truncate"
                >
                  {leader.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <Phone className="h-3.5 w-3.5 text-muted shrink-0" />
                <a
                  href={`tel:${leader.phone}`}
                  className="hover:text-foreground transition-colors mono"
                >
                  {leader.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <Calendar className="h-3.5 w-3.5 text-muted shrink-0" />
                <span>
                  Joined {formatDate(leader.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
