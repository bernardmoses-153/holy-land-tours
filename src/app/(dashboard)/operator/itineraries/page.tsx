"use client";

import Link from "next/link";
import { Calendar, DollarSign, MapPin, Plus, Eye, Pencil } from "lucide-react";
import { useItineraries } from "@/hooks/use-mock-data";
import { PageHeader, LoadingSkeleton } from "@/components/shared";
import { formatCurrency } from "@/lib/utils";

export default function ItinerariesPage() {
  const { data: itineraries, loading } = useItineraries();

  return (
    <div>
      <PageHeader
        title="Itinerary Templates"
        description="Manage your tour itinerary templates."
      >
        <Link
          href="/operator/itineraries/new"
          className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create New
        </Link>
      </PageHeader>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <LoadingSkeleton variant="card" count={3} />
        </div>
      ) : itineraries && itineraries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {itineraries.map((itinerary) => (
            <div
              key={itinerary.id}
              className="border border-border rounded-lg p-5 bg-background hover:border-border-hover transition-colors"
            >
              <div className="mb-3">
                <h3 className="text-sm font-medium text-foreground">
                  {itinerary.name}
                </h3>
                <p className="text-xs text-secondary mt-1 line-clamp-2">
                  {itinerary.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-secondary mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-muted" />
                  {itinerary.duration} days
                </span>
                <span className="flex items-center gap-1 mono font-medium text-foreground">
                  <DollarSign className="h-3 w-3 text-muted" />
                  {formatCurrency(itinerary.pricePerPerson)}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-2">
                  Highlights
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {itinerary.highlights.slice(0, 4).map((highlight) => (
                    <span
                      key={highlight}
                      className="inline-flex items-center gap-1 text-xs bg-elevated text-secondary rounded-full px-2 py-0.5"
                    >
                      <MapPin className="h-2.5 w-2.5" />
                      {highlight}
                    </span>
                  ))}
                  {itinerary.highlights.length > 4 && (
                    <span className="text-xs text-muted">
                      +{itinerary.highlights.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-border">
                <Link
                  href={`/operator/itineraries/${itinerary.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-secondary hover:text-foreground hover:border-border-hover transition-colors"
                >
                  <Eye className="h-3 w-3" />
                  View
                </Link>
                <Link
                  href={`/operator/itineraries/${itinerary.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-secondary hover:text-foreground hover:border-border-hover transition-colors"
                >
                  <Pencil className="h-3 w-3" />
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-border rounded-lg p-12 text-center">
          <p className="text-sm text-muted mb-3">
            No itinerary templates yet.
          </p>
          <Link
            href="/operator/itineraries/new"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create your first itinerary
          </Link>
        </div>
      )}
    </div>
  );
}
