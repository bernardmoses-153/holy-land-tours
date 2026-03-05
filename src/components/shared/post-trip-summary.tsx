"use client";

import { MapPin, Calendar, Users, Camera, Star, Gift, Award } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Group, Itinerary, Testimonial } from "@/types";

interface PostTripSummaryProps {
  group: Group;
  itinerary: Itinerary;
  touristName: string;
}

export function PostTripSummary({ group, itinerary, touristName }: PostTripSummaryProps) {
  const totalSites = itinerary.days.reduce((sum, d) => sum + d.locations.length, 0);

  return (
    <div className="space-y-6">
      {/* Trip Summary Card */}
      <div className="rounded-xl border border-border bg-background overflow-hidden">
        <div className="bg-gradient-to-r from-gold-bg to-sand-bg p-6 text-center space-y-2">
          <Award className="h-8 w-8 text-gold mx-auto" />
          <h2 className="text-lg font-bold text-foreground">
            Your Holy Land Journey
          </h2>
          <p className="text-sm text-secondary">
            {group.name}
          </p>
        </div>

        <div className="grid grid-cols-3 divide-x divide-border p-4">
          <div className="text-center space-y-1">
            <Calendar className="h-4 w-4 text-secondary mx-auto" />
            <p className="text-lg font-bold mono text-foreground">{itinerary.duration}</p>
            <p className="text-xs text-muted">Days</p>
          </div>
          <div className="text-center space-y-1">
            <MapPin className="h-4 w-4 text-secondary mx-auto" />
            <p className="text-lg font-bold mono text-foreground">{totalSites}</p>
            <p className="text-xs text-muted">Sites</p>
          </div>
          <div className="text-center space-y-1">
            <Users className="h-4 w-4 text-secondary mx-auto" />
            <p className="text-lg font-bold mono text-foreground">{group.currentSize}</p>
            <p className="text-xs text-muted">Travelers</p>
          </div>
        </div>
      </div>

      {/* Alumni Badge */}
      <div className="rounded-xl border border-gold bg-gold-bg p-4 flex items-center gap-4">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gold/10 flex-shrink-0">
          <Award className="h-6 w-6 text-gold" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Holy Land Pilgrim 2026</p>
          <p className="text-xs text-secondary">
            {touristName} — {group.name}
          </p>
        </div>
      </div>

      {/* Photo Gallery Placeholder */}
      <div className="rounded-xl border border-border bg-background p-6 space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Camera className="h-4 w-4" />
          Trip Photos
        </div>
        <div className="grid grid-cols-3 gap-2">
          {itinerary.days.slice(0, 6).map((day) => (
            <div
              key={day.dayNumber}
              className="aspect-square rounded-lg bg-elevated flex items-center justify-center"
            >
              <div className="text-center">
                <Camera className="h-5 w-5 text-muted mx-auto" />
                <p className="text-[10px] text-muted mt-1">Day {day.dayNumber}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted text-center">
          Photo gallery coming soon — upload your favorites!
        </p>
      </div>

      {/* Plan Next Trip */}
      <div className="rounded-xl border border-border bg-background p-6 space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Star className="h-4 w-4" />
          Plan Your Next Trip
        </div>
        <p className="text-sm text-secondary">
          As a returning pilgrim, you receive a <span className="font-semibold text-gold">10% alumni discount</span> on your next Holy Land journey.
        </p>
        <button className="w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity">
          Explore Upcoming Trips
        </button>
      </div>
    </div>
  );
}
