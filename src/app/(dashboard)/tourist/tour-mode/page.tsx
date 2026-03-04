"use client";

import { useGroup } from "@/hooks/use-mock-data";
import { CountdownTimer, LoadingSkeleton } from "@/components/shared";
import { formatDate } from "@/lib/utils";
import { Calendar, Map } from "lucide-react";
import Link from "next/link";

export default function TourModePage() {
  const { data: group, loading } = useGroup("group-1");

  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="card" count={2} />
      </div>
    );
  }

  if (!group) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 px-4">
      {/* Icon */}
      <div className="rounded-full bg-elevated p-6">
        <Calendar className="h-12 w-12 text-muted" />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Tour Mode Unavailable
        </h1>
        <p className="text-sm text-secondary max-w-md">
          Tour Mode activates on your departure date. Follow along day-by-day with live
          itinerary details, AI tour guide, and real-time updates.
        </p>
      </div>

      {/* Countdown */}
      <div className="rounded-xl border border-border bg-background p-6 w-full max-w-sm space-y-4">
        <p className="text-xs text-muted uppercase tracking-wider">Countdown to Tour Mode</p>
        <CountdownTimer targetDate={group.startDate} />
      </div>

      {/* Availability Notice */}
      <p className="text-sm text-muted">
        Your tour mode will be available starting{" "}
        <span className="font-medium text-foreground">{formatDate(group.startDate)}</span>
      </p>

      {/* Preview Link */}
      <Link
        href="/tourist/itinerary"
        className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <Map className="h-4 w-4" />
        Preview your itinerary
      </Link>
    </div>
  );
}
