"use client";

import { useItinerary, useWeatherForDay } from "@/hooks/use-mock-data";
import { MealBadge, LoadingSkeleton, ImageHero, AIChat, WeatherCard, JournalEntry, PhotoCard } from "@/components/shared";
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
  Sparkles,
} from "lucide-react";
import { dayImages, dayStories, getImageForLocation } from "@/data/images";
import { tourGuideGreetings, tourGuideSuggestions, tourGuideMockResponses } from "@/data/ai-responses";
import type { ChatMessage } from "@/types";

function getMockResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("history")) return tourGuideMockResponses.history;
  if (lower.includes("photo")) return tourGuideMockResponses.photography;
  if (lower.includes("cultur") || lower.includes("tip")) return tourGuideMockResponses.cultural;
  if (lower.includes("food") || lower.includes("eat") || lower.includes("restaurant")) return tourGuideMockResponses.food;
  if (lower.includes("bible") || lower.includes("biblical") || lower.includes("scripture")) return tourGuideMockResponses.biblical;
  if (lower.includes("fact") || lower.includes("fun")) return tourGuideMockResponses.funfact;
  return tourGuideMockResponses.history;
}

export default function TourModeDayPage() {
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
  const greeting = tourGuideGreetings[dayNumber] || tourGuideGreetings[1];
  const story = dayStories[dayNumber];

  const initialMessages: ChatMessage[] = [
    {
      id: `welcome-${dayNumber}`,
      role: "assistant",
      content: greeting,
      timestamp: new Date().toISOString(),
    },
  ];

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
          href="/tourist/tour-mode"
          className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors mb-4 self-start"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tour Mode
        </Link>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-0.5">
            <Sparkles className="h-3 w-3" />
            Day {day.dayNumber}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
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

        {/* Weather + Day Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {weather && <WeatherCard weather={weather} />}
          <div className="rounded-xl border border-border bg-background p-4 space-y-3">
            {day.meetingTime && (
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Clock className="h-4 w-4" />
                <span>{day.meetingTime}</span>
              </div>
            )}
            {day.meetingPoint && (
              <div className="flex items-center gap-2 text-sm text-secondary">
                <MapPin className="h-4 w-4" />
                <span>{day.meetingPoint}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {day.locations.map((loc) => (
                <span key={loc} className="inline-flex items-center gap-1 rounded-full bg-elevated px-2.5 py-0.5 text-xs text-secondary">
                  <MapPin className="h-3 w-3 text-muted" />
                  {loc}
                </span>
              ))}
            </div>
            {day.meals.length > 0 && (
              <div className="flex gap-2 pt-2 border-t border-border">
                {day.meals.map((meal) => (
                  <MealBadge key={meal} meal={meal} />
                ))}
              </div>
            )}
            {day.overnight && (
              <div className="flex items-center gap-2 text-sm text-secondary pt-2 border-t border-border">
                <Hotel className="h-4 w-4" />
                <span>{day.overnight}</span>
              </div>
            )}
          </div>
        </div>

        {/* Photo Gallery */}
        {day.locations.length > 1 && (
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-foreground">Photo Gallery</h2>
            <div className="grid grid-cols-2 gap-3">
              {day.locations.slice(0, 4).map((loc) => (
                <PhotoCard
                  key={loc}
                  imageUrl={getImageForLocation(loc)}
                  alt={loc}
                  title={loc}
                  className="h-36 sm:h-44"
                />
              ))}
            </div>
          </div>
        )}

        {/* AI Tour Guide Chat */}
        <AIChat
          title="AI Tour Guide"
          subtitle={`Day ${dayNumber} — ${day.title}`}
          initialMessages={initialMessages}
          suggestions={tourGuideSuggestions}
          onSendMessage={getMockResponse}
          className="min-h-[300px]"
        />

        {/* Journal Entry */}
        <JournalEntry dayNumber={dayNumber} />

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
    </div>
  );
}
