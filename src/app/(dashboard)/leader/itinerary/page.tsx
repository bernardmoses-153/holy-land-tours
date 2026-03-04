"use client";

import { useGroup, useItinerary } from "@/hooks/use-mock-data";
import {
  PageHeader,
  ItineraryDayCard,
  LoadingSkeleton,
} from "@/components/shared";
import { Clock, Sparkles } from "lucide-react";

const GROUP_ID = "group-1";

export default function LeaderItineraryPage() {
  const { data: group, loading: groupLoading } = useGroup(GROUP_ID);
  const itineraryId = group?.itineraryId ?? "";
  const { data: itinerary, loading: itinLoading } = useItinerary(itineraryId);

  const loading = groupLoading || itinLoading;

  if (loading || !group || !itinerary) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48 mb-2" />
        <div className="skeleton h-4 w-64" />
        <LoadingSkeleton variant="card" count={4} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title={itinerary.name}>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-elevated px-3 py-1 text-sm text-secondary">
          <Clock className="h-3.5 w-3.5" />
          {itinerary.duration} Days
        </span>
      </PageHeader>

      {/* Description */}
      <p className="text-sm text-body leading-relaxed max-w-3xl">
        {itinerary.description}
      </p>

      {/* Highlights */}
      <div>
        <h2 className="text-sm font-medium text-secondary uppercase tracking-wider mb-3">
          Key Highlights
        </h2>
        <div className="flex flex-wrap gap-2">
          {itinerary.highlights.map((highlight) => (
            <span
              key={highlight}
              className="inline-flex items-center gap-1.5 rounded-full bg-elevated px-3 py-1 text-xs font-medium text-foreground"
            >
              <Sparkles className="h-3 w-3 text-muted" />
              {highlight}
            </span>
          ))}
        </div>
      </div>

      {/* Day Cards */}
      <div>
        <h2 className="text-sm font-medium text-secondary uppercase tracking-wider mb-4">
          Day-by-Day Itinerary
        </h2>
        <div className="space-y-3">
          {itinerary.days.map((day) => (
            <ItineraryDayCard key={day.dayNumber} day={day} />
          ))}
        </div>
      </div>
    </div>
  );
}
