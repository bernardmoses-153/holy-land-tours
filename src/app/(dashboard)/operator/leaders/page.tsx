"use client";

import Link from "next/link";
import { DollarSign, Users, Star, ArrowRight } from "lucide-react";
import { useLeaders } from "@/hooks/use-mock-data";
import { PageHeader, TouristAvatar, LoadingSkeleton } from "@/components/shared";
import { formatCurrency, formatPercent } from "@/lib/utils";

export default function LeadersPage() {
  const { data: leaders, loading } = useLeaders();

  return (
    <div>
      <PageHeader
        title="Group Leaders"
        description="View and manage your group leaders."
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <LoadingSkeleton variant="card" count={4} />
        </div>
      ) : leaders && leaders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaders.map((leader) => (
            <Link
              key={leader.id}
              href={`/operator/leaders/${leader.id}`}
              className="block border border-border rounded-lg p-5 bg-background hover:border-border-hover hover:bg-surface transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <TouristAvatar name={leader.name} size="lg" />
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-foreground truncate">
                    {leader.name}
                  </h3>
                  <p className="text-xs text-secondary">{leader.title}</p>
                  <p className="text-xs text-muted">{leader.organization}</p>
                </div>
              </div>

              {/* Performance Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-secondary flex items-center gap-1">
                    <Star className="h-3 w-3 text-muted" />
                    Performance
                  </span>
                  <span className="text-xs mono font-medium text-foreground">
                    {leader.performanceScore}/100
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-elevated overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-foreground transition-all duration-500"
                    style={{ width: `${leader.performanceScore}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
                <div>
                  <p className="text-xs text-muted mb-0.5">Earnings</p>
                  <p className="text-sm mono font-medium text-foreground">
                    {formatCurrency(leader.totalEarnings)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted mb-0.5">Recruited</p>
                  <p className="text-sm mono font-medium text-foreground">
                    {leader.touristsRecruited}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted mb-0.5">Commission</p>
                  <p className="text-sm mono font-medium text-foreground">
                    {leader.commissionRate}%
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-border rounded-lg p-12 text-center">
          <p className="text-sm text-muted">No leaders registered yet.</p>
        </div>
      )}
    </div>
  );
}
