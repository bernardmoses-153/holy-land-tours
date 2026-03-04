"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  MapPin,
  Pencil,
  Plus,
} from "lucide-react";
import { useItinerary } from "@/hooks/use-mock-data";
import {
  PageHeader,
  ItineraryDayCard,
  LoadingSkeleton,
} from "@/components/shared";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ItineraryDetailPage() {
  const params = useParams();
  const itineraryId = params.itineraryId as string;
  const { data: itinerary, loading } = useItinerary(itineraryId);

  if (loading) {
    return (
      <div>
        <div className="mb-6">
          <LoadingSkeleton variant="text" />
        </div>
        <div className="space-y-3">
          <LoadingSkeleton variant="card" count={4} />
        </div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-muted">Itinerary not found.</p>
        <Link
          href="/operator/itineraries"
          className="text-sm text-foreground underline mt-2 inline-block"
        >
          Back to itineraries
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <Link
          href="/operator/itineraries"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Itineraries
        </Link>
      </div>

      <PageHeader title={itinerary.name}>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-secondary hover:text-foreground hover:border-border-hover transition-colors"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </button>
      </PageHeader>

      {/* Itinerary Details */}
      <div className="border border-border rounded-lg p-5 bg-background mb-6">
        <p className="text-sm text-body leading-relaxed mb-4">
          {itinerary.description}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-secondary mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-muted" />
            {itinerary.duration} days
          </span>
          <span className="flex items-center gap-1.5 mono font-medium text-foreground">
            <DollarSign className="h-3.5 w-3.5 text-muted" />
            {formatCurrency(itinerary.pricePerPerson)} per person
          </span>
          <span className="text-xs text-muted">
            Last updated: {formatDate(itinerary.updatedAt)}
          </span>
        </div>

        {itinerary.highlights.length > 0 && (
          <div>
            <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-2">
              Key Highlights
            </p>
            <div className="flex flex-wrap gap-1.5">
              {itinerary.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="inline-flex items-center gap-1 text-xs bg-elevated text-secondary rounded-full px-2.5 py-0.5"
                >
                  <MapPin className="h-2.5 w-2.5" />
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Day-by-Day */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-foreground">
          Day-by-Day Itinerary
        </h3>
      </div>

      <div className="space-y-3">
        {itinerary.days.map((day) => (
          <ItineraryDayCard key={day.dayNumber} day={day} />
        ))}
      </div>

      <button
        type="button"
        className="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-dashed border-border py-3 text-sm text-secondary hover:text-foreground hover:border-border-hover transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add Day
      </button>
    </div>
  );
}
