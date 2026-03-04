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
} from "@/components/shared";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const GROUP_ID = "group-1";

export default function TouristRosterPage() {
  const { data: tourists, loading: touristsLoading } = useTouristsByGroup(GROUP_ID);
  const { data: group, loading: groupLoading } = useGroup(GROUP_ID);
  const [search, setSearch] = useState("");

  const filteredTourists = useMemo(() => {
    if (!tourists) return [];
    if (!search.trim()) return tourists;
    const q = search.toLowerCase();
    return tourists.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q)
    );
  }, [tourists, search]);

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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tourist Roster"
        description={`${tourists.length} tourists in ${group.name}`}
      />

      <div className="max-w-md">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search tourists by name or email..."
        />
      </div>

      {filteredTourists.length === 0 ? (
        <p className="text-sm text-muted py-8 text-center">
          No tourists match your search.
        </p>
      ) : (
        <DataTable
          headers={[
            "Tourist",
            "Passport",
            "Medical",
            "Insurance",
            "Flight",
            "Payment",
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
      )}
    </div>
  );
}
