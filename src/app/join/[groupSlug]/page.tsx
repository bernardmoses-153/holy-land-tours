"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Users,
  Shield,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { cn, formatCurrency, daysUntil } from "@/lib/utils";
import { getGroupInviteBySlug } from "@/data/onboarding-data";
import { getGroupById, getLeaderById, getItineraryById, getTouristsByGroup } from "@/data/mock-data";
import { holyLandImages } from "@/data/images";
import {
  ImageHero,
  CountdownTimer,
  TimelineStep,
  GroupMemberGrid,
  FillRateBar,
  SafetyCard,
  TouristAvatar,
} from "@/components/shared";
import { depositConfig } from "@/data/onboarding-data";

export default function GroupLandingPage({
  params,
}: {
  params: Promise<{ groupSlug: string }>;
}) {
  const { groupSlug } = use(params);

  const invite = getGroupInviteBySlug(groupSlug);
  if (!invite) return notFound();

  const group = getGroupById(invite.groupId);
  if (!group) return notFound();

  const leader = getLeaderById(group.leaderId);
  const itinerary = getItineraryById(group.itineraryId);
  const tourists = getTouristsByGroup(group.id);
  const spotsRemaining = group.maxCapacity - group.currentSize;
  const depositAmount = Math.round(group.pricePerPerson * depositConfig.percentage);

  const members = tourists.map((t) => ({
    id: t.id,
    name: t.name,
    avatar: t.avatar,
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <ImageHero
        imageUrl={holyLandImages.jerusalem.url}
        alt={group.name}
        height="lg"
        className="animate-slow-zoom"
      >
        <div className="text-center text-white space-y-4">
          <p className="text-sm font-semibold tracking-widest uppercase opacity-80">
            You&apos;re Invited
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {group.name}
          </h1>
          <div className="flex items-center justify-center gap-2">
            <CountdownTimer targetDate={group.startDate} />
          </div>
          {spotsRemaining <= 5 && (
            <div className="inline-block rounded-full bg-warning/90 px-3 py-1 text-xs font-semibold text-white">
              Only {spotsRemaining} spot{spotsRemaining !== 1 ? "s" : ""} remaining!
            </div>
          )}
        </div>
      </ImageHero>

      {/* Content sections */}
      <div className="mx-auto max-w-2xl space-y-8 px-4 py-8">
        {/* Your Leader */}
        {leader && (
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Your Leader</h2>
            <div className="flex items-center gap-4 rounded-xl border border-border p-4">
              <TouristAvatar name={leader.name} size="lg" />
              <div>
                <p className="font-semibold text-foreground">{leader.name}</p>
                <p className="text-sm text-muted">
                  {leader.title}, {leader.organization}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* The Journey */}
        {itinerary && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">The Journey</h2>
              <div className="flex items-center gap-1 text-xs text-muted">
                <Calendar className="h-3.5 w-3.5" />
                {itinerary.duration} days
              </div>
            </div>
            <div className="rounded-xl border border-border p-4 space-y-1">
              <p className="text-sm font-semibold text-foreground">
                {itinerary.name}
              </p>
              <p className="text-xs text-secondary line-clamp-2">
                {itinerary.description}
              </p>
              <div className="pt-3 space-y-0">
                {itinerary.days.slice(0, 4).map((day, idx) => (
                  <TimelineStep
                    key={day.dayNumber}
                    title={`Day ${day.dayNumber}: ${day.title}`}
                    description={day.highlights.join(" · ")}
                    icon={MapPin}
                    status={idx === 0 ? "current" : "upcoming"}
                    isLast={idx === 3}
                  />
                ))}
              </div>
              {itinerary.days.length > 4 && (
                <p className="pt-2 text-center text-xs text-muted">
                  + {itinerary.days.length - 4} more days of adventure
                </p>
              )}
            </div>
          </section>
        )}

        {/* Who's Going */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">Who&apos;s Going</h2>
          <div className="rounded-xl border border-border p-4 space-y-3">
            <GroupMemberGrid members={members} maxDisplay={8} />
            <div className="flex items-center justify-between text-xs">
              <span className="text-secondary">
                {group.currentSize} travelers joined
              </span>
              <span className="font-semibold text-warning">
                {spotsRemaining} spot{spotsRemaining !== 1 ? "s" : ""} left
              </span>
            </div>
            <FillRateBar
              current={group.currentSize}
              max={group.maxCapacity}
            />
          </div>
        </section>

        {/* Safety */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">
            Safety & Peace of Mind
          </h2>
          <div className="rounded-xl border border-border p-4">
            <SafetyCard />
          </div>
        </section>

        {/* Investment */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">Your Investment</h2>
          <div className="rounded-xl border border-border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary">Per person</span>
              <span className="text-2xl font-bold text-foreground">
                {formatCurrency(group.pricePerPerson)}
              </span>
            </div>
            <FillRateBar
              current={group.currentSize}
              max={group.maxCapacity}
              label="Group filling"
            />
            <div className="rounded-lg bg-olive-bg px-3 py-2 text-center text-xs text-olive">
              <span className="font-semibold">Secure with just {formatCurrency(depositAmount)} deposit</span>
              {" · "}
              {depositConfig.refundDays}-day full refund guarantee
            </div>
          </div>
        </section>

        {/* Spacer for fixed bottom bar */}
        <div className="h-20" />
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-border p-4">
        <div className="mx-auto max-w-2xl">
          <Link
            href={`/register?redirect=/onboarding/tourist&group=${groupSlug}`}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            )}
          >
            Join This Group — {formatCurrency(depositAmount)} deposit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
