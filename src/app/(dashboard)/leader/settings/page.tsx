"use client";

import { useLeader } from "@/hooks/use-mock-data";
import { PageHeader, LoadingSkeleton } from "@/components/shared";
import { cn } from "@/lib/utils";
import { User, Briefcase, Building2, Mail, Phone, Percent } from "lucide-react";

const LEADER_ID = "leader-1";

function ReadOnlyField({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-secondary uppercase tracking-wider">
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-lg border border-border bg-elevated px-4 py-2.5">
        <Icon className="h-4 w-4 text-muted shrink-0" />
        <span className="text-sm text-foreground">{value}</span>
      </div>
    </div>
  );
}

export default function LeaderSettingsPage() {
  const { data: leader, loading } = useLeader(LEADER_ID);

  if (loading || !leader) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-32 mb-2" />
        <LoadingSkeleton variant="card" count={2} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Settings" />

      {/* Profile Information */}
      <section className="border border-border rounded-lg p-6 bg-background space-y-6">
        <h2 className="text-sm font-medium text-secondary uppercase tracking-wider">
          Profile Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ReadOnlyField label="Name" value={leader.name} icon={User} />
          <ReadOnlyField label="Title" value={leader.title} icon={Briefcase} />
          <ReadOnlyField
            label="Organization"
            value={leader.organization}
            icon={Building2}
          />
          <ReadOnlyField label="Email" value={leader.email} icon={Mail} />
          <ReadOnlyField label="Phone" value={leader.phone} icon={Phone} />
          <ReadOnlyField
            label="Commission Rate"
            value={`${leader.commissionRate}%`}
            icon={Percent}
          />
        </div>
      </section>

      {/* Performance */}
      <section className="border border-border rounded-lg p-6 bg-background space-y-4">
        <h2 className="text-sm font-medium text-secondary uppercase tracking-wider">
          Performance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-border rounded-lg p-4">
            <p className="text-xs text-muted">Performance Score</p>
            <p className="text-2xl font-semibold mono text-foreground mt-1">
              {leader.performanceScore}/100
            </p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <p className="text-xs text-muted">Tourists Recruited</p>
            <p className="text-2xl font-semibold mono text-foreground mt-1">
              {leader.touristsRecruited}
            </p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <p className="text-xs text-muted">Total Earnings</p>
            <p className="text-2xl font-semibold mono text-foreground mt-1">
              ${leader.totalEarnings.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex justify-end">
        <button
          type="button"
          disabled
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium",
            "bg-elevated text-muted cursor-not-allowed"
          )}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
