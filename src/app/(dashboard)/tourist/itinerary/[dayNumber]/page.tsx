"use client";

import { useItinerary } from "@/hooks/use-mock-data";
import { MealBadge, LoadingSkeleton } from "@/components/shared";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Sparkles,
  Hotel,
} from "lucide-react";

export default function DayDetailPage() {
  const params = useParams();
  const dayNumber = Number(params.dayNumber);
  const { data: itinerary, loading } = useItinerary("itin-1");

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48" />
        <LoadingSkeleton variant="text" count={3} />
      </div>
    );
  }

  if (!itinerary) return null;

  const day = itinerary.days.find((d) => d.dayNumber === dayNumber);
  if (!day) return null;

  const hasPrev = dayNumber > 1;
  const hasNext = dayNumber < itinerary.duration;

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/tourist/itinerary"
        className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Itinerary
      </Link>

      {/* Day Header */}
      <div className="space-y-2">
        <span className="inline-flex items-center justify-center h-8 rounded-full bg-foreground text-background text-xs font-semibold px-3">
          Day {day.dayNumber}
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {day.title}
        </h1>
      </div>

      {/* Description */}
      <p className="text-sm text-body leading-relaxed">{day.description}</p>

      {/* Meeting Info */}
      {(day.meetingTime || day.meetingPoint) && (
        <div className="rounded-xl border border-border bg-background p-4 space-y-3">
          {day.meetingTime && (
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-elevated">
                <Clock className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider">Meeting Time</p>
                <p className="text-sm font-medium text-foreground">{day.meetingTime}</p>
              </div>
            </div>
          )}
          {day.meetingPoint && (
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-elevated">
                <MapPin className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider">Meeting Point</p>
                <p className="text-sm font-medium text-foreground">{day.meetingPoint}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Locations */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-foreground">Locations</h2>
        <div className="space-y-2">
          {day.locations.map((location, index) => (
            <div
              key={location}
              className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-elevated">
                <MapPin className="h-4 w-4 text-secondary" />
              </div>
              <span className="text-sm text-foreground">{location}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meals */}
      {day.meals.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-foreground">Meals Included</h2>
          <div className="flex flex-wrap gap-2">
            {day.meals.map((meal) => (
              <MealBadge key={meal} meal={meal} />
            ))}
          </div>
        </div>
      )}

      {/* Highlights */}
      {day.highlights.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-muted" />
            Highlights
          </h2>
          <div className="flex flex-wrap gap-2">
            {day.highlights.map((highlight) => (
              <span
                key={highlight}
                className="inline-flex items-center gap-1.5 rounded-full bg-elevated px-3 py-1 text-xs font-medium text-secondary"
              >
                <Sparkles className="h-3 w-3 text-muted" />
                {highlight}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Overnight */}
      {day.overnight && (
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-elevated">
              <Hotel className="h-4 w-4 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wider">Overnight</p>
              <p className="text-sm font-medium text-foreground">{day.overnight}</p>
            </div>
          </div>
        </div>
      )}

      {/* Previous/Next Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        {hasPrev ? (
          <Link
            href={`/tourist/itinerary/${dayNumber - 1}`}
            className="flex items-center gap-2 text-sm text-secondary hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Day {dayNumber - 1}</span>
          </Link>
        ) : (
          <div />
        )}
        {hasNext ? (
          <Link
            href={`/tourist/itinerary/${dayNumber + 1}`}
            className="flex items-center gap-2 text-sm text-secondary hover:text-foreground transition-colors"
          >
            <span>Day {dayNumber + 1}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
