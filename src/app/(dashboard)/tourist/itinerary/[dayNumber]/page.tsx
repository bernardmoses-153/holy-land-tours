"use client";

import { useItinerary, useWeatherForDay } from "@/hooks/use-mock-data";
import { MealBadge, LoadingSkeleton, ImageHero, WeatherCard, TimelineStep } from "@/components/shared";
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
  Mountain,
  Footprints,
  Backpack,
} from "lucide-react";
import { dayImages, dayStories } from "@/data/images";

const dayDifficulty: Record<number, { level: string; walk: string }> = {
  1: { level: "easy", walk: "2 km" },
  2: { level: "moderate", walk: "8 km" },
  3: { level: "moderate", walk: "6 km" },
  4: { level: "easy", walk: "4 km" },
  5: { level: "easy", walk: "3 km" },
  6: { level: "challenging", walk: "10 km" },
  7: { level: "moderate", walk: "5 km" },
  8: { level: "easy", walk: "3 km" },
};

const packingTips: Record<number, string[]> = {
  1: ["Comfortable travel clothes", "Snack for the bus ride"],
  2: ["Modest clothing for holy sites", "Good walking shoes"],
  3: ["Light layers for outdoor walks", "Camera for Garden of Gethsemane"],
  4: ["Head covering for church visit", "Water bottle"],
  5: ["Swimsuit & towel for Dead Sea", "Sandals or water shoes", "No shaving 24h before!"],
  6: ["Hiking boots for Masada", "Flashlight for early sunrise", "Extra water"],
  7: ["Hat and sunscreen", "Light clothes for boat ride"],
  8: ["Travel-ready outfit", "Souvenirs packed safely"],
};

export default function DayDetailPage() {
  const params = useParams();
  const dayNumber = Number(params.dayNumber);
  const { data: itinerary, loading } = useItinerary("itin-1");
  const { data: weather } = useWeatherForDay(dayNumber);

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
  const story = dayStories[dayNumber];
  const diff = dayDifficulty[dayNumber];
  const tips = packingTips[dayNumber] || [];

  return (
    <div className="space-y-6 -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Hero Image */}
      <ImageHero
        imageUrl={dayImages[dayNumber] || dayImages[1]}
        alt={day.title}
        height="lg"
        className="rounded-none sm:rounded-2xl sm:mx-4 lg:mx-8"
      >
        <Link
          href="/tourist/itinerary"
          className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors mb-4 self-start"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Itinerary
        </Link>
        <span className="inline-flex self-start items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1">
          Day {day.dayNumber}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
          {day.title}
        </h1>
      </ImageHero>

      <div className="px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Story */}
        {story && (
          <p className="text-sm text-body leading-relaxed italic border-l-2 border-gold pl-4">
            {story}
          </p>
        )}

        {/* Difficulty + Weather row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {diff && (
            <div className="rounded-xl border border-border bg-background p-4 flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Mountain className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-xs text-muted">Difficulty</p>
                  <p className="text-sm font-medium text-foreground capitalize">{diff.level}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="flex items-center gap-3">
                <Footprints className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-xs text-muted">Walking</p>
                  <p className="text-sm font-medium text-foreground">{diff.walk}</p>
                </div>
              </div>
            </div>
          )}
          {weather && <WeatherCard weather={weather} />}
        </div>

        {/* Description */}
        <p className="text-sm text-body leading-relaxed">{day.description}</p>

        {/* Visual Timeline of locations */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-foreground">Today&apos;s Journey</h2>
          <div>
            {day.meetingTime && (
              <TimelineStep
                title={`Meet at ${day.meetingPoint || "hotel lobby"}`}
                time={day.meetingTime}
                icon={Clock}
                status="completed"
              />
            )}
            {day.locations.map((location, index) => (
              <TimelineStep
                key={location}
                title={location}
                icon={MapPin}
                status={index === 0 ? "current" : "upcoming"}
                isLast={index === day.locations.length - 1 && !day.overnight}
              />
            ))}
            {day.overnight && (
              <TimelineStep
                title={day.overnight}
                description="Overnight stay"
                icon={Hotel}
                status="upcoming"
                isLast
              />
            )}
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
              <Sparkles className="h-4 w-4 text-gold" />
              Highlights
            </h2>
            <div className="flex flex-wrap gap-2">
              {day.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold-bg px-3 py-1 text-xs font-medium text-gold"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Packing Tips */}
        {tips.length > 0 && (
          <div className="rounded-xl border border-border bg-sand-bg p-4 space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Backpack className="h-4 w-4 text-sand" />
              Packing Tips for Day {dayNumber}
            </h3>
            <ul className="space-y-1.5">
              {tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-xs text-secondary">
                  <span className="text-sand mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
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
    </div>
  );
}
