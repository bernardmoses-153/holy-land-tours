"use client";

import { useGroup, useItinerary, useWeatherForDay } from "@/hooks/use-mock-data";
import { CountdownTimer, LoadingSkeleton, ImageHero, AIAssistantCard, WeatherCard } from "@/components/shared";
import { formatDate } from "@/lib/utils";
import { Calendar, Map, Radio, ChevronRight } from "lucide-react";
import Link from "next/link";
import { holyLandImages } from "@/data/images";
import { dayImages } from "@/data/images";

export default function TourModePage() {
  const { data: group, loading: groupLoading } = useGroup("group-1");
  const { data: itinerary, loading: itinLoading } = useItinerary("itin-1");
  const { data: weather } = useWeatherForDay(1);

  const loading = groupLoading || itinLoading;

  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="card" count={2} />
      </div>
    );
  }

  if (!group || !itinerary) return null;

  return (
    <div className="space-y-8 -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Hero Image */}
      <ImageHero
        imageUrl={holyLandImages.jerusalem.url}
        alt="Tour Mode"
        height="lg"
        className="rounded-none sm:rounded-2xl sm:mx-4 lg:mx-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <Radio className="h-4 w-4 text-white/70" />
          <span className="text-white/70 text-xs font-medium uppercase tracking-wider">Tour Mode</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Your Journey Awaits
        </h1>
        <p className="text-white/60 text-sm mt-1">
          Tour Mode activates on your departure date
        </p>
      </ImageHero>

      <div className="px-4 sm:px-6 lg:px-8 space-y-8">
        {/* AI Insight */}
        <AIAssistantCard
          message="Tour Mode will unlock an immersive day-by-day experience with AI-guided commentary, photo journals, and real-time weather updates. Get ready for an unforgettable journey!"
          category="Coming Soon"
          variant="gold"
        />

        {/* Countdown */}
        <div className="rounded-xl border border-border bg-background p-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-secondary">
            <Calendar className="h-4 w-4" />
            <span>Countdown to Tour Mode</span>
          </div>
          <CountdownTimer targetDate={group.startDate} />
          <p className="text-xs text-muted">
            Available starting{" "}
            <span className="font-medium text-foreground">{formatDate(group.startDate)}</span>
          </p>
        </div>

        {/* Weather Preview */}
        {weather && (
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-foreground">Day 1 Weather Preview</h2>
            <WeatherCard weather={weather} />
          </div>
        )}

        {/* Preview Itinerary Days */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-foreground">Preview Your Journey</h2>
          <div className="space-y-2">
            {itinerary.days.map((day) => (
              <Link
                key={day.dayNumber}
                href={`/tourist/tour-mode/${day.dayNumber}`}
                className="flex items-center justify-between rounded-xl border border-border bg-background p-4 hover:bg-surface transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-elevated text-foreground text-xs font-bold mono">
                    {day.dayNumber}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{day.title}</p>
                    <p className="text-xs text-muted">{day.locations.slice(0, 2).join(" · ")}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted" />
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/tourist/itinerary"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Map className="h-4 w-4" />
            View Full Itinerary
          </Link>
        </div>
      </div>
    </div>
  );
}
