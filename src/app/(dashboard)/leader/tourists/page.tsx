"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTouristsByGroup, useGroup } from "@/hooks/use-mock-data";
import {
  PageHeader,
  SearchInput,
  StatusBadge,
  TouristAvatar,
  LoadingSkeleton,
  DataTable,
  ReadinessGauge,
} from "@/components/shared";
import { formatCurrency, cn, formatPercent } from "@/lib/utils";
import { LayoutGrid, List, Filter } from "lucide-react";

const GROUP_ID = "group-1";

type ViewMode = "table" | "cards";
type FilterPreset = "all" | "needs_attention" | "ready" | "overdue";

export default function TouristRosterPage() {
  const { data: tourists, loading: touristsLoading } = useTouristsByGroup(GROUP_ID);
  const { data: group, loading: groupLoading } = useGroup(GROUP_ID);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [filter, setFilter] = useState<FilterPreset>("all");

  const filteredTourists = useMemo(() => {
    if (!tourists) return [];
    let result = tourists;

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.email.toLowerCase().includes(q)
      );
    }

    // Preset filter
    if (filter === "needs_attention") {
      result = result.filter(
        (t) =>
          t.paymentStatus === "overdue" ||
          t.passportStatus === "not_started" ||
          t.passportStatus === "rejected" ||
          t.medicalFormStatus === "not_started" ||
          t.insuranceStatus === "not_started"
      );
    } else if (filter === "ready") {
      result = result.filter(
        (t) =>
          t.passportStatus === "approved" &&
          t.medicalFormStatus === "approved" &&
          t.insuranceStatus === "approved" &&
          t.flightInfoStatus === "approved" &&
          t.paymentStatus === "paid_full"
      );
    } else if (filter === "overdue") {
      result = result.filter((t) => t.paymentStatus === "overdue");
    }

    return result;
  }, [tourists, search, filter]);

  const loading = touristsLoading || groupLoading;

  if (loading || !tourists || !group) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48 mb-2" />
        <div className="skeleton h-4 w-32" />
        <div className="mt-6">
          <LoadingSkeleton variant="table-row" count={6} />
        </div>
      </div>
    );
  }

  const hasIssue = (t: (typeof tourists)[0]) =>
    t.paymentStatus === "overdue" ||
    t.passportStatus === "not_started" ||
    t.passportStatus === "rejected" ||
    t.medicalFormStatus === "not_started" ||
    t.insuranceStatus === "not_started";

  const readyCount = tourists.filter(
    (t) =>
      t.passportStatus === "approved" &&
      t.medicalFormStatus === "approved" &&
      t.insuranceStatus === "approved" &&
      t.flightInfoStatus === "approved" &&
      t.paymentStatus === "paid_full"
  ).length;

  const getTouristReadiness = (t: (typeof tourists)[0]) => {
    let score = 0;
    if (t.passportStatus === "approved") score++;
    if (t.medicalFormStatus === "approved") score++;
    if (t.insuranceStatus === "approved") score++;
    if (t.flightInfoStatus === "approved") score++;
    if (t.paymentStatus === "paid_full") score++;
    return (score / 5) * 100;
  };

  const filterPresets: { key: FilterPreset; label: string; count: number }[] = [
    { key: "all", label: "All", count: tourists.length },
    { key: "needs_attention", label: "Needs Attention", count: tourists.filter(hasIssue).length },
    { key: "ready", label: "Ready", count: readyCount },
    { key: "overdue", label: "Overdue", count: tourists.filter((t) => t.paymentStatus === "overdue").length },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tourist Roster"
        description={`${tourists.length} tourists in ${group.name} — ${formatPercent((readyCount / tourists.length) * 100)} ready`}
      />

      {/* Controls Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 max-w-md">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search tourists by name or email..."
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Filter Presets */}
          <div className="flex gap-1">
            {filterPresets.map((preset) => (
              <button
                key={preset.key}
                type="button"
                onClick={() => setFilter(preset.key)}
                className={cn(
                  "text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors",
                  filter === preset.key
                    ? "bg-foreground text-background"
                    : "bg-elevated text-secondary hover:bg-surface"
                )}
              >
                {preset.label}
                {preset.count > 0 && (
                  <span className="ml-1 text-[10px] opacity-60">{preset.count}</span>
                )}
              </button>
            ))}
          </div>
          {/* View Toggle */}
          <div className="flex border border-border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={cn(
                "p-2 transition-colors",
                viewMode === "table" ? "bg-foreground text-background" : "text-secondary hover:bg-surface"
              )}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={cn(
                "p-2 transition-colors",
                viewMode === "cards" ? "bg-foreground text-background" : "text-secondary hover:bg-surface"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {filteredTourists.length === 0 ? (
        <p className="text-sm text-muted py-8 text-center">
          No tourists match your filters.
        </p>
      ) : viewMode === "table" ? (
        <DataTable
          headers={[
            "Tourist",
            "Passport",
            "Medical",
            "Insurance",
            "Flight",
            "Payment",
            "Readiness",
            "Paid / Due",
          ]}
        >
          {filteredTourists.map((t) => (
            <tr
              key={t.id}
              className={cn(
                "hover:bg-surface transition-colors",
                hasIssue(t) && "bg-error-bg/30"
              )}
            >
              <td className="px-4 py-3">
                <Link
                  href={`/leader/tourists/${t.id}`}
                  className="flex items-center gap-3 group"
                >
                  <TouristAvatar name={t.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:underline">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted">{t.email}</p>
                  </div>
                </Link>
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={t.passportStatus} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={t.medicalFormStatus} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={t.insuranceStatus} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={t.flightInfoStatus} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={t.paymentStatus} />
              </td>
              <td className="px-4 py-3">
                <span className={cn(
                  "text-xs font-medium mono",
                  getTouristReadiness(t) >= 100 ? "text-success" :
                  getTouristReadiness(t) >= 60 ? "text-gold" : "text-error"
                )}>
                  {formatPercent(getTouristReadiness(t))}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="text-right">
                  <span className="text-sm font-medium mono text-foreground">
                    {formatCurrency(t.amountPaid)}
                  </span>
                  <span className="text-xs text-muted mx-1">/</span>
                  <span className="text-sm mono text-secondary">
                    {formatCurrency(t.amountPaid + t.amountDue)}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </DataTable>
      ) : (
        /* Card View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTourists.map((t) => {
            const readiness = getTouristReadiness(t);
            return (
              <Link
                key={t.id}
                href={`/leader/tourists/${t.id}`}
                className={cn(
                  "rounded-xl border bg-background p-4 space-y-3 hover:bg-surface transition-colors",
                  hasIssue(t) ? "border-warning/30" : "border-border"
                )}
              >
                <div className="flex items-center gap-3">
                  <TouristAvatar name={t.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{t.name}</p>
                    <p className="text-xs text-muted truncate">{t.email}</p>
                  </div>
                  <ReadinessGauge percentage={readiness} size={48} strokeWidth={4} label="" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <StatusBadge status={t.passportStatus} />
                  <StatusBadge status={t.paymentStatus} />
                </div>
                <div className="flex justify-between text-xs text-muted pt-2 border-t border-border">
                  <span>Paid: {formatCurrency(t.amountPaid)}</span>
                  <span>Due: {formatCurrency(t.amountDue)}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
