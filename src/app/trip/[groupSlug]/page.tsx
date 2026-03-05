"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, CheckCircle2, Shield, Star, ArrowRight, Calendar, Users } from "lucide-react";
import {
  getGroupById,
  getItineraryById,
  getLeaderById,
  getTripPageConfig,
  getTouristsByGroup,
  guides,
  guideAssignments,
  testimonials,
} from "@/data/mock-data";
import { getGroupInviteBySlug } from "@/data/onboarding-data";
import { holyLandImages } from "@/data/images";
import { safetyStats, safetyTestimonials } from "@/data/onboarding-data";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import {
  TripHero,
  InstallmentCalculator,
  GuideProfileCard,
  TripFAQ,
  FillRateBar,
} from "@/components/shared";

export default function PublicTripPage() {
  const params = useParams();
  const slug = params.groupSlug as string;

  // Look up data
  const invite = getGroupInviteBySlug(slug);
  const config = getTripPageConfig(slug);

  if (!invite || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-xl font-bold text-foreground">Trip Not Found</h1>
          <p className="text-sm text-secondary">This trip page doesn&apos;t exist or is no longer available.</p>
          <Link href="/" className="text-sm text-foreground underline">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const group = getGroupById(config.groupId);
  if (!group) return null;

  const itinerary = getItineraryById(group.itineraryId);
  const leader = getLeaderById(group.leaderId);
  if (!itinerary || !leader) return null;

  const groupTourists = getTouristsByGroup(group.id);
  const spotsLeft = group.maxCapacity - group.currentSize;

  // Find assigned guide
  const assignment = guideAssignments.find((ga) => ga.groupId === group.id);
  const guide = assignment ? guides.find((g) => g.id === assignment.guideId) : guides[0];

  // Get testimonials
  const tripTestimonials = testimonials.length > 0 ? testimonials : [];

  const heroImage = holyLandImages[config.heroImageKey] || holyLandImages.jerusalem;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <TripHero
        tripName={group.name}
        imageUrl={heroImage.url}
        leaderName={leader.name}
        leaderTitle={leader.title}
        dates={{ start: group.startDate, end: group.endDate }}
        duration={itinerary.duration}
        pricePerPerson={group.pricePerPerson}
        installmentMonths={config.installmentOptions[config.installmentOptions.length - 1]}
        spotsLeft={spotsLeft}
        maxCapacity={group.maxCapacity}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Reserve Your Spot CTA — top */}
        <Link
          href={`/join/${slug}`}
          className="block w-full rounded-xl bg-foreground px-6 py-4 text-center text-background font-semibold hover:opacity-90 transition-opacity"
        >
          Reserve Your Spot &rarr;
        </Link>

        {/* Spots remaining */}
        <div className="rounded-xl border border-border bg-background p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Group Availability
            </span>
            <span className="text-xs text-muted">
              {spotsLeft > 0 ? `${spotsLeft} of ${group.maxCapacity} spots left` : "Group is full"}
            </span>
          </div>
          <FillRateBar current={group.currentSize} max={group.maxCapacity} label="Spots Filled" />
        </div>

        {/* Pastor's welcome message */}
        <div className="rounded-xl border border-border bg-background p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gold-bg text-gold text-lg font-bold">
              {getInitials(leader.name)}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{leader.name}</p>
              <p className="text-xs text-secondary">{leader.title}, {leader.organization}</p>
            </div>
          </div>
          <p className="text-sm text-secondary leading-relaxed whitespace-pre-line">
            {config.welcomeMessage}
          </p>
        </div>

        {/* Itinerary highlights */}
        <div className="rounded-xl border border-border bg-background p-6 space-y-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {itinerary.duration}-Day Itinerary: {itinerary.name}
          </h2>
          <p className="text-sm text-secondary">{itinerary.description}</p>

          <div className="space-y-2">
            {itinerary.days.map((day) => (
              <div
                key={day.dayNumber}
                className="rounded-lg border border-border p-4 hover:bg-surface transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider">Day {day.dayNumber}</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">{day.title}</p>
                  </div>
                  <div className="flex gap-1">
                    {day.meals.map((meal) => (
                      <span key={meal} className="rounded-full bg-elevated px-2 py-0.5 text-[10px] text-muted capitalize">
                        {meal[0].toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-secondary mt-1">{day.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {day.highlights.map((h) => (
                    <span key={h} className="inline-flex items-center gap-1 text-[10px] text-olive">
                      <MapPin className="h-2.5 w-2.5" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Installment Calculator */}
        {config.showInstallments && (
          <InstallmentCalculator
            totalPrice={group.pricePerPerson}
            depositAmount={config.depositAmount}
            installmentOptions={config.installmentOptions}
          />
        )}

        {/* What's Included */}
        <div className="rounded-xl border border-border bg-background p-6 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">What&apos;s Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Round-trip airport transfers",
              "4-5 star hotel accommodations",
              "Licensed tour guide",
              "Air-conditioned private coach",
              "Most meals (per itinerary)",
              "All site entrance fees",
              "Comprehensive travel insurance",
              "24/7 local emergency support",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-secondary">
                <CheckCircle2 className="h-4 w-4 text-olive flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Meet Your Guide */}
        {guide && <GuideProfileCard guide={guide} />}

        {/* Safety Section */}
        <div className="rounded-xl border border-border bg-background p-6 space-y-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Safety & Trust
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {safetyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          {(tripTestimonials.length > 0 ? tripTestimonials : safetyTestimonials).slice(0, 3).map((t, i) => (
            <div key={i} className="rounded-lg bg-elevated p-4 space-y-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-secondary italic">
                &ldquo;{"text" in t ? t.text : t.quote}&rdquo;
              </p>
              <p className="text-xs text-muted">
                &mdash; {"touristName" in t ? t.touristName : t.name}
                {"title" in t ? `, ${t.title}` : ""}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <TripFAQ items={config.faqItems} />

        {/* Final CTA */}
        <div className="rounded-xl bg-foreground p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-background">
            Ready to Walk Where History Was Made?
          </h2>
          <p className="text-background/70 text-sm">
            {spotsLeft > 0
              ? `Only ${spotsLeft} spots remaining. Secure yours today with a ${formatCurrency(config.depositAmount)} deposit.`
              : "Join the waitlist to be notified of openings."}
          </p>
          <Link
            href={`/join/${slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-background px-8 py-3 text-sm font-semibold text-foreground hover:opacity-90 transition-opacity"
          >
            Reserve Your Spot
            <ArrowRight className="h-4 w-4" />
          </Link>
          {config.showInstallments && (
            <p className="text-background/50 text-xs">
              Pay as little as {formatCurrency(Math.ceil((group.pricePerPerson - config.depositAmount) / config.installmentOptions[config.installmentOptions.length - 1]))}/month
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-xs text-muted">
            Operated by Holy Land Tours Ltd. &middot; Jerusalem, Israel
          </p>
        </div>
      </div>
    </div>
  );
}
