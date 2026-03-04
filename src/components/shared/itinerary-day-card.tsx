"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ItineraryDay } from "@/types";
import { ChevronDown, MapPin, Clock, Flag } from "lucide-react";
import { MealBadge } from "./meal-badge";

interface ItineraryDayCardProps {
  day: ItineraryDay;
}

export function ItineraryDayCard({ day }: ItineraryDayCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-4 text-left hover:bg-surface transition-colors"
      >
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-foreground text-background text-sm font-semibold mono shrink-0">
          {day.dayNumber}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground truncate">
            {day.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {day.locations.slice(0, 3).map((location) => (
              <span
                key={location}
                className="inline-flex items-center gap-1 text-xs text-secondary bg-elevated rounded-full px-2 py-0.5"
              >
                <MapPin className="h-3 w-3" />
                {location}
              </span>
            ))}
            {day.locations.length > 3 && (
              <span className="text-xs text-muted">
                +{day.locations.length - 3} more
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1">
            {day.meals.map((meal) => (
              <MealBadge key={meal} meal={meal} />
            ))}
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted transition-transform duration-200",
              expanded && "rotate-180"
            )}
          />
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-border animate-slide-down">
          <div className="pt-4 space-y-3">
            <p className="text-sm text-body leading-relaxed">
              {day.description}
            </p>

            {(day.meetingTime || day.meetingPoint) && (
              <div className="flex items-center gap-4 text-xs text-secondary">
                {day.meetingTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {day.meetingTime}
                  </span>
                )}
                {day.meetingPoint && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {day.meetingPoint}
                  </span>
                )}
              </div>
            )}

            {day.highlights.length > 0 && (
              <div>
                <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-1.5">
                  Highlights
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {day.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="inline-flex items-center gap-1 text-xs bg-elevated text-foreground rounded-full px-2.5 py-0.5"
                    >
                      <Flag className="h-3 w-3 text-muted" />
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {day.overnight && (
              <p className="text-xs text-secondary">
                <span className="font-medium">Overnight:</span> {day.overnight}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
