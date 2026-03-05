"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { Clock, MapPin, ChevronDown, ChevronUp, Check } from "lucide-react";
import type { Itinerary } from "@/types";

interface ItineraryPreviewCardProps {
  itinerary: Itinerary;
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function ItineraryPreviewCard({
  itinerary,
  selected = false,
  onSelect,
  className,
}: ItineraryPreviewCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl border transition-all cursor-pointer",
        selected
          ? "border-foreground bg-surface shadow-sm ring-1 ring-foreground"
          : "border-border hover:border-border-hover hover:shadow-sm",
        className
      )}
    >
      {/* Header — clickable to select */}
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full items-start gap-3 p-4 text-left"
      >
        {/* Selection indicator */}
        <div
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            selected
              ? "border-foreground bg-foreground"
              : "border-border"
          )}
        >
          {selected && <Check className="h-3 w-3 text-background" />}
        </div>

        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              {itinerary.name}
            </h3>
            <span className="text-sm font-semibold text-foreground">
              {formatCurrency(itinerary.pricePerPerson)}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {itinerary.duration} days
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {itinerary.highlights.length} sites
            </span>
          </div>

          <p className="text-xs text-secondary line-clamp-2">
            {itinerary.description}
          </p>

          {/* Highlight pills */}
          <div className="flex flex-wrap gap-1 pt-1">
            {itinerary.highlights.slice(0, 4).map((h) => (
              <span
                key={h}
                className="rounded-full bg-elevated px-2 py-0.5 text-[10px] font-medium text-secondary"
              >
                {h}
              </span>
            ))}
            {itinerary.highlights.length > 4 && (
              <span className="rounded-full bg-elevated px-2 py-0.5 text-[10px] font-medium text-muted">
                +{itinerary.highlights.length - 4} more
              </span>
            )}
          </div>
        </div>
      </button>

      {/* Expand toggle */}
      {selected && (
        <>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex w-full items-center justify-center gap-1 border-t border-border px-4 py-2 text-xs font-medium text-secondary hover:text-foreground transition-colors"
          >
            {expanded ? "Hide" : "View"} day-by-day itinerary
            {expanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>

          {expanded && (
            <div className="border-t border-border px-4 py-3 space-y-2">
              {itinerary.days.map((day) => (
                <div key={day.dayNumber} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-elevated text-[10px] font-bold text-secondary">
                    {day.dayNumber}
                  </span>
                  <div>
                    <p className="text-xs font-medium text-foreground">
                      {day.title}
                    </p>
                    <p className="text-[11px] text-muted">
                      {day.highlights.join(" · ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
