"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, MapPin } from "lucide-react";
import { useGroup, useItinerary } from "@/hooks/use-mock-data";
import {
  PageHeader,
  StatusBadge,
  ItineraryDayCard,
  LoadingSkeleton,
} from "@/components/shared";
import { cn, formatCurrency } from "@/lib/utils";

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

export default function GroupItineraryPage() {
  const params = useParams();
  const groupId = params.groupId as string;
  const { data: group, loading: groupLoading } = useGroup(groupId);
  const { data: itinerary, loading: itineraryLoading } = useItinerary(
    group?.itineraryId ?? ""
  );

  const loading = groupLoading || itineraryLoading;

  if (loading) {
    return (
      <div>
        <div className="mb-6">
          <LoadingSkeleton variant="text" />
        </div>
        <div className="space-y-3">
          <LoadingSkeleton variant="card" count={4} />
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

      <TabNav groupId={groupId} active="itinerary" />

      {itinerary ? (
        <>
          <div className="border border-border rounded-lg p-5 bg-background mb-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {itinerary.name}
                </h2>
                <p className="text-sm text-secondary mt-1">
                  {itinerary.description}
                </p>
              </div>
              <Link
                href={`/operator/itineraries/${itinerary.id}`}
                className="text-xs text-secondary hover:text-foreground transition-colors underline shrink-0"
              >
                View template
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm text-secondary">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-muted" />
                {itinerary.duration} days
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-muted" />
                {itinerary.highlights.length} key sites
              </span>
              <span className="mono font-medium text-foreground">
                {formatCurrency(itinerary.pricePerPerson)} / person
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {itinerary.days.map((day) => (
              <ItineraryDayCard key={day.dayNumber} day={day} />
            ))}
          </div>
        </>
      ) : (
        <div className="border border-border rounded-lg p-8 text-center">
          <p className="text-sm text-muted">
            No itinerary assigned to this group.
          </p>
        </div>
      )}
    </div>
  );
}
