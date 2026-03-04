"use client";

import { useItinerary } from "@/hooks/use-mock-data";
import { PageHeader, LoadingSkeleton, PhotoCard } from "@/components/shared";
import { Clock, Sparkles, Mountain, Footprints } from "lucide-react";
import { useRouter } from "next/navigation";
import { dayImages, dayStories } from "@/data/images";

const dayDifficulty: Record<number, { level: "easy" | "moderate" | "challenging"; walk: string }> = {
  1: { level: "easy", walk: "2 km" },
  2: { level: "moderate", walk: "8 km" },
  3: { level: "moderate", walk: "6 km" },
  4: { level: "easy", walk: "4 km" },
  5: { level: "easy", walk: "3 km" },
  6: { level: "challenging", walk: "10 km" },
  7: { level: "moderate", walk: "5 km" },
  8: { level: "easy", walk: "3 km" },
};

const difficultyColors = {
  easy: "bg-success-bg text-success",
  moderate: "bg-warning-bg text-warning",
  challenging: "bg-error-bg text-error",
};

export default function ItineraryPage() {
  const { data: itinerary, loading } = useItinerary("itin-1");
  const router = useRouter();

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
              className="inline-flex items-center rounded-full bg-gold-bg px-3 py-1 text-xs font-medium text-gold"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>

      {/* Day-by-Day as Photo Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-foreground">Day-by-Day Journey</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {itinerary.days.map((day) => {
            const diff = dayDifficulty[day.dayNumber];
            const story = dayStories[day.dayNumber];
            return (
              <div key={day.dayNumber} className="space-y-2">
                <PhotoCard
                  imageUrl={dayImages[day.dayNumber] || dayImages[1]}
                  alt={day.title}
                  title={`Day ${day.dayNumber}: ${day.title}`}
                  subtitle={day.locations.join(" · ")}
                  badge={day.locations[0]}
                  onClick={() => router.push(`/tourist/itinerary/${day.dayNumber}`)}
                />
                <div className="flex items-center gap-2 px-1">
                  {diff && (
                    <>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${difficultyColors[diff.level]}`}>
                        <Mountain className="h-3 w-3" />
                        {diff.level}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-muted">
                        <Footprints className="h-3 w-3" />
                        {diff.walk}
                      </span>
                    </>
                  )}
                </div>
                {story && (
                  <p className="text-xs text-secondary leading-relaxed px-1 line-clamp-2">{story}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
