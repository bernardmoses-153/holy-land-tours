"use client";

import { useItinerary } from "@/hooks/use-mock-data";
import { PageHeader, ItineraryDayCard, LoadingSkeleton } from "@/components/shared";
import { cn } from "@/lib/utils";
import { Clock, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ItineraryPage() {
  const { data: itinerary, loading } = useItinerary("itin-1");

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48" />
        <LoadingSkeleton variant="card" count={4} />
      </div>
    );
  }

  if (!itinerary) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title={itinerary.name}
        description={itinerary.description}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-elevated px-3 py-1 text-xs font-medium text-secondary">
          <Clock className="h-3 w-3" />
          {itinerary.duration} Days
        </span>
      </PageHeader>

      {/* Highlights */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-muted" />
          Trip Highlights
        </h2>
        <div className="flex flex-wrap gap-2">
          {itinerary.highlights.map((highlight) => (
            <span
              key={highlight}
              className="inline-flex items-center rounded-full bg-elevated px-3 py-1 text-xs font-medium text-secondary"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>

      {/* Day-by-Day Itinerary */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-foreground">Day-by-Day Itinerary</h2>
        <div className="space-y-2">
          {itinerary.days.map((day) => (
            <Link
              key={day.dayNumber}
              href={`/tourist/itinerary/${day.dayNumber}`}
              className="block"
            >
              <ItineraryDayCard day={day} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
