"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useGroup, useTouristsByGroup } from "@/hooks/use-mock-data";
import {
  PageHeader,
  DataTable,
  StatusBadge,
  TouristAvatar,
  LoadingSkeleton,
} from "@/components/shared";
import { cn } from "@/lib/utils";

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

export default function GroupTouristsPage() {
  const params = useParams();
  const groupId = params.groupId as string;
  const { data: group, loading: groupLoading } = useGroup(groupId);
  const { data: tourists, loading: touristsLoading } =
    useTouristsByGroup(groupId);

  const loading = groupLoading || touristsLoading;

  if (loading) {
    return (
      <div>
        <div className="mb-6">
          <LoadingSkeleton variant="text" />
        </div>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              <LoadingSkeleton variant="table-row" count={6} />
            </tbody>
          </table>
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

      <TabNav groupId={groupId} active="tourists" />

      <div className="mb-4">
        <p className="text-sm text-secondary">
          {tourists?.length ?? 0} tourist{(tourists?.length ?? 0) !== 1 ? "s" : ""} registered
        </p>
      </div>

      <DataTable
        headers={[
          "Name",
          "Passport",
          "Medical",
          "Insurance",
          "Flight",
          "Payment",
        ]}
      >
        {tourists && tourists.length > 0 ? (
          tourists.map((tourist) => (
            <tr
              key={tourist.id}
              className="hover:bg-surface transition-colors"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <TouristAvatar name={tourist.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {tourist.name}
                    </p>
                    <p className="text-xs text-muted">{tourist.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={tourist.passportStatus} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={tourist.medicalFormStatus} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={tourist.insuranceStatus} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={tourist.flightInfoStatus} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={tourist.paymentStatus} />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={6}
              className="px-4 py-12 text-center text-sm text-muted"
            >
              No tourists registered yet.
            </td>
          </tr>
        )}
      </DataTable>
    </div>
  );
}
