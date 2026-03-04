"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useGroups } from "@/hooks/use-mock-data";
import {
  PageHeader,
  DataTable,
  StatusBadge,
  FillRateBar,
  SearchInput,
  LoadingSkeleton,
} from "@/components/shared";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function GroupsPage() {
  const { data: groups, loading } = useGroups();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!groups) return [];
    if (!search.trim()) return groups;
    return groups.filter((g) =>
      g.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [groups, search]);

  return (
    <div>
      <PageHeader title="All Groups" description="View and manage all tour groups.">
        <div className="w-64">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search groups..."
          />
        </div>
      </PageHeader>

      {loading ? (
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              <LoadingSkeleton variant="table-row" count={6} />
            </tbody>
          </table>
        </div>
      ) : (
        <DataTable
          headers={[
            "Group Name",
            "Leader",
            "Itinerary",
            "Status",
            "Dates",
            "Fill Rate",
            "Revenue",
          ]}
        >
          {filtered.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-12 text-center text-sm text-muted"
              >
                No groups found matching &ldquo;{search}&rdquo;
              </td>
            </tr>
          ) : (
            filtered.map((group) => (
              <tr
                key={group.id}
                className="hover:bg-surface transition-colors cursor-pointer"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/operator/groups/${group.id}`}
                    className="text-sm font-medium text-foreground hover:underline"
                  >
                    {group.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-body">
                  {group.leaderName}
                </td>
                <td className="px-4 py-3 text-sm text-secondary">
                  {group.itineraryName}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={group.status} />
                </td>
                <td className="px-4 py-3 text-sm mono text-secondary">
                  {formatDate(group.startDate)} - {formatDate(group.endDate)}
                </td>
                <td className="px-4 py-3 min-w-[140px]">
                  <FillRateBar
                    current={group.currentSize}
                    max={group.maxCapacity}
                  />
                </td>
                <td className="px-4 py-3 text-sm mono font-medium text-foreground">
                  {formatCurrency(group.totalRevenue)}
                </td>
              </tr>
            ))
          )}
        </DataTable>
      )}
    </div>
  );
}
