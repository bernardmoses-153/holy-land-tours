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
  Hotel,
  Bot,
  Send,
  Sparkles,
} from "lucide-react";

function getFactForDay(dayNumber: number, locations: string[]): string {
  const facts: Record<number, string> = {
    1: "Ben Gurion Airport is named after David Ben-Gurion, Israel's first Prime Minister. It handles over 24 million passengers annually!",
    2: "The Western Wall stones at the base are over 2,000 years old, placed during King Herod's expansion of the Second Temple around 19 BCE.",
    3: "The Garden of Gethsemane contains olive trees that are over 900 years old. Some scientists believe their roots may date back to the time of Jesus.",
    4: "The Dead Sea is the lowest point on Earth at 430 meters below sea level. Its salt concentration is nearly 10 times that of the ocean!",
    5: "Masada was designated a UNESCO World Heritage Site in 2001. The story of the Jewish Zealots' last stand here in 73 CE is one of history's most dramatic tales.",
    6: "The Sea of Galilee, also known as Lake Kinneret, is the lowest freshwater lake on Earth and Israel's largest freshwater lake.",
    7: "Nazareth is the largest Arab city in Israel. The Basilica of the Annunciation is the largest church in the Middle East.",
    8: "Tradition says that St. Peter's fish (tilapia) is the type of fish mentioned in the miraculous catch of fish in the Gospels.",
  };
  return facts[dayNumber] || `${locations[0]} is one of the most historically significant sites in the Holy Land.`;
}

export default function TourModeDayPage() {
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
  const funFact = getFactForDay(dayNumber, day.locations);

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/tourist/tour-mode"
        className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Tour Mode
      </Link>

      {/* Day Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center h-8 rounded-full bg-foreground text-background text-xs font-semibold px-3">
            Day {day.dayNumber}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-info-bg text-info text-xs font-medium px-2.5 py-0.5">
            <Sparkles className="h-3 w-3" />
            Preview Mode
          </span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {day.title}
        </h1>
      </div>

      {/* Today's Details */}
      <div className="rounded-xl border border-border bg-background p-4 space-y-4">
        <p className="text-sm text-body leading-relaxed">{day.description}</p>

        {/* Meeting Info */}
        {(day.meetingTime || day.meetingPoint) && (
          <div className="flex flex-wrap gap-4 text-sm">
            {day.meetingTime && (
              <div className="flex items-center gap-2 text-secondary">
                <Clock className="h-4 w-4" />
                <span>{day.meetingTime}</span>
              </div>
            )}
            {day.meetingPoint && (
              <div className="flex items-center gap-2 text-secondary">
                <MapPin className="h-4 w-4" />
                <span>{day.meetingPoint}</span>
              </div>
            )}
          </div>
        )}

        {/* Locations */}
        <div className="flex flex-wrap gap-2">
          {day.locations.map((location) => (
            <span
              key={location}
              className="inline-flex items-center gap-1.5 rounded-full bg-elevated px-3 py-1 text-xs font-medium text-secondary"
            >
              <MapPin className="h-3 w-3" />
              {location}
            </span>
          ))}
        </div>

        {/* Meals */}
        {day.meals.length > 0 && (
          <div className="flex items-center gap-2">
            {day.meals.map((meal) => (
              <MealBadge key={meal} meal={meal} />
            ))}
          </div>
        )}

        {/* Overnight */}
        {day.overnight && (
          <div className="flex items-center gap-2 text-sm text-secondary pt-2 border-t border-border">
            <Hotel className="h-4 w-4" />
            <span>{day.overnight}</span>
          </div>
        )}
      </div>

      {/* AI Tour Guide Chat */}
      <div className="rounded-xl border border-border bg-background overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border bg-surface">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-foreground text-background">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-foreground">AI Tour Guide</h2>
            <p className="text-xs text-muted">Ask me anything about today&apos;s sites</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-4 space-y-4 min-h-[200px]">
          {/* Bot Welcome */}
          <div className="flex gap-3">
            <div className="flex items-center justify-center h-7 w-7 rounded-full bg-foreground text-background shrink-0">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <div className="rounded-xl rounded-tl-sm bg-surface border border-border px-4 py-3 max-w-[85%]">
              <p className="text-sm text-body leading-relaxed">
                Welcome to Day {day.dayNumber} of your Holy Land journey! Today we&apos;ll be
                visiting{" "}
                {day.locations.length > 1
                  ? `${day.locations.slice(0, -1).join(", ")} and ${day.locations[day.locations.length - 1]}`
                  : day.locations[0]}
                . What would you like to know?
              </p>
            </div>
          </div>

          {/* Bot Fun Fact */}
          <div className="flex gap-3">
            <div className="flex items-center justify-center h-7 w-7 rounded-full bg-foreground text-background shrink-0">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <div className="rounded-xl rounded-tl-sm bg-surface border border-border px-4 py-3 max-w-[85%]">
              <p className="text-xs text-muted uppercase tracking-wider mb-1">Fun Fact</p>
              <p className="text-sm text-body leading-relaxed">{funFact}</p>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about today's sites..."
              className="flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-border-hover transition-colors"
              readOnly
            />
            <button
              type="button"
              className="flex items-center justify-center h-10 w-10 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Previous/Next Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        {hasPrev ? (
          <Link
            href={`/tourist/tour-mode/${dayNumber - 1}`}
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
            href={`/tourist/tour-mode/${dayNumber + 1}`}
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
