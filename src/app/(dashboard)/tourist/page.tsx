"use client";

import { useTourist, useGroup, useItinerary, useNotifications, useTouristsByGroup, useWeatherForDay } from "@/hooks/use-mock-data";
import { CountdownTimer, StatusBadge, LoadingSkeleton, FillRateBar, ImageHero, AIAssistantCard, ReadinessGauge, GroupMemberGrid, WeatherCard, PaymentSchedule, ContentTimeline, PostTripSummary, TestimonialForm, ReferralCard } from "@/components/shared";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import Link from "next/link";
import {
  FileText,
  Heart,
  Shield,
  CreditCard,
  Calendar,
  Map,
  ChevronRight,
  CheckCircle2,
  Circle,
  Plane,
  Users,
  Backpack,
  MessageCircle,
} from "lucide-react";
import { holyLandImages } from "@/data/images";
import { docAssistantMessages } from "@/data/ai-responses";
import { getPaymentPlanByTourist } from "@/data/mock-data";
import { contentDripItems } from "@/data/content-drip";

const TOURIST_ID = "t-1";

const journeyStages = [
  { key: "registered", label: "Registered" },
  { key: "documents", label: "Documents" },
  { key: "payment", label: "Payment" },
  { key: "ready", label: "Ready" },
  { key: "traveling", label: "Traveling" },
  { key: "complete", label: "Complete" },
] as const;

function getJourneyStage(tourist: {
  passportStatus: string;
  medicalFormStatus: string;
  insuranceStatus: string;
  flightInfoStatus: string;
  paymentStatus: string;
}): number {
  const allDocsApproved =
    tourist.passportStatus === "approved" &&
    tourist.medicalFormStatus === "approved" &&
    tourist.insuranceStatus === "approved" &&
    tourist.flightInfoStatus === "approved";
  const paidFull = tourist.paymentStatus === "paid_full";
  if (allDocsApproved && paidFull) return 3;
  if (paidFull) return 2;
  if (allDocsApproved) return 1;
  return 0;
}

function getReadinessPercent(tourist: {
  passportStatus: string;
  medicalFormStatus: string;
  insuranceStatus: string;
  flightInfoStatus: string;
  paymentStatus: string;
  amountPaid: number;
  amountDue: number;
}): number {
  let score = 0;
  const total = 5;
  if (tourist.passportStatus === "approved") score++;
  if (tourist.medicalFormStatus === "approved") score++;
  if (tourist.insuranceStatus === "approved") score++;
  if (tourist.flightInfoStatus === "approved") score++;
  if (tourist.paymentStatus === "paid_full") score++;
  return (score / total) * 100;
}

export default function TouristDashboardPage() {
  const { data: tourist, loading: touristLoading } = useTourist(TOURIST_ID);
  const { data: group, loading: groupLoading } = useGroup("group-1");
  const { data: itinerary, loading: itinLoading } = useItinerary("itin-1");
  const { data: notifications, loading: notifsLoading } = useNotifications(TOURIST_ID);
  const { data: groupMembers } = useTouristsByGroup("group-1");
  const { data: weather } = useWeatherForDay(1);

  const loading = touristLoading || groupLoading || itinLoading || notifsLoading;

  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="card" count={3} />
      </div>
    );
  }

  if (!tourist || !group || !itinerary) return null;

  const currentStage = getJourneyStage(tourist);
  const readiness = getReadinessPercent(tourist);
  const unreadCount = notifications?.filter((n) => !n.read).length ?? 0;

  // Pick a relevant AI insight
  const aiInsight = docAssistantMessages.find(
    (msg) =>
      (msg.category === "passport" && tourist.passportStatus !== "approved") ||
      (msg.category === "flight" && tourist.flightInfoStatus === "not_started")
  ) || docAssistantMessages[0];

  return (
    <div className="space-y-8 -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Hero Image */}
      <ImageHero
        imageUrl={holyLandImages.heroDashboard.url}
        alt="Your Holy Land Journey"
        height="lg"
        className="rounded-none sm:rounded-2xl sm:mx-4 lg:mx-8"
      >
        <p className="text-white/70 text-xs font-medium uppercase tracking-wider">
          Welcome back, {tourist.name.split(" ")[0]}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
          Your Holy Land Journey
        </h1>
        <p className="text-white/60 text-sm mt-1">{group.name}</p>
      </ImageHero>

      <div className="px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Countdown + Weather row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-background p-6 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-secondary">
              <Plane className="h-4 w-4" />
              <span>Departure Countdown</span>
            </div>
            <CountdownTimer targetDate={group.startDate} />
            <p className="text-xs text-muted">
              {formatDate(group.startDate)} &mdash; {formatDate(group.endDate)}
            </p>
          </div>
          {weather && <WeatherCard weather={weather} />}
        </div>

        {/* AI Assistant Insight */}
        <AIAssistantCard
          message={aiInsight.content}
          category="AI Assistant"
          actionLabel="View Documents"
          onAction={() => {
            window.location.href = "/tourist/documents";
          }}
          variant="gold"
        />

        {/* Readiness + Journey Status row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Readiness Gauge */}
          <div className="rounded-xl border border-border bg-background p-6 flex flex-col items-center">
            <ReadinessGauge percentage={readiness} label="Trip Ready" />
          </div>

          {/* Journey Status Stepper */}
          <div className="rounded-xl border border-border bg-background p-6 space-y-4">
            <h2 className="text-sm font-medium text-foreground">Journey Status</h2>
            <div className="flex items-center justify-between">
              {journeyStages.map((stage, index) => {
                const isCompleted = index < currentStage;
                const isCurrent = index === currentStage;
                return (
                  <div key={stage.key} className="flex flex-col items-center flex-1 relative">
                    {index > 0 && (
                      <div
                        className={cn(
                          "absolute top-3 right-1/2 w-full h-0.5 -z-10",
                          index <= currentStage ? "bg-foreground" : "bg-border"
                        )}
                      />
                    )}
                    <div
                      className={cn(
                        "flex items-center justify-center h-6 w-6 rounded-full border-2 transition-colors",
                        isCompleted
                          ? "bg-foreground border-foreground"
                          : isCurrent
                            ? "bg-background border-foreground"
                            : "bg-background border-border"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 text-background" />
                      ) : isCurrent ? (
                        <Circle className="h-2 w-2 fill-foreground text-foreground" />
                      ) : null}
                    </div>
                    <span
                      className={cn(
                        "text-[10px] mt-1.5 text-center leading-tight",
                        isCompleted || isCurrent ? "text-foreground font-medium" : "text-muted"
                      )}
                    >
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Readiness Cards */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-foreground">Trip Readiness</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-background p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-elevated">
                  <FileText className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-sm font-medium text-foreground">Passport</span>
              </div>
              <StatusBadge status={tourist.passportStatus} />
              <Link href="/tourist/documents" className="text-xs text-secondary hover:text-foreground transition-colors">
                {tourist.passportStatus === "approved" ? "View" : "Upload"} &rarr;
              </Link>
            </div>
            <div className="rounded-xl border border-border bg-background p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-elevated">
                  <Heart className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-sm font-medium text-foreground">Medical Form</span>
              </div>
              <StatusBadge status={tourist.medicalFormStatus} />
              <Link href="/tourist/documents" className="text-xs text-secondary hover:text-foreground transition-colors">
                {tourist.medicalFormStatus === "approved" ? "View" : "Upload"} &rarr;
              </Link>
            </div>
            <div className="rounded-xl border border-border bg-background p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-elevated">
                  <Shield className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-sm font-medium text-foreground">Insurance</span>
              </div>
              <StatusBadge status={tourist.insuranceStatus} />
              <Link href="/tourist/documents" className="text-xs text-secondary hover:text-foreground transition-colors">
                {tourist.insuranceStatus === "approved" ? "View" : "Upload"} &rarr;
              </Link>
            </div>
            <div className="rounded-xl border border-border bg-background p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-elevated">
                  <CreditCard className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-sm font-medium text-foreground">Payment</span>
              </div>
              <StatusBadge status={tourist.paymentStatus} />
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted">
                  <span>{formatCurrency(tourist.amountPaid)}</span>
                  <span>{formatCurrency(tourist.amountPaid + tourist.amountDue)}</span>
                </div>
                <FillRateBar current={tourist.amountPaid} max={tourist.amountPaid + tourist.amountDue} />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Schedule (if tourist has a payment plan) */}
        {(() => {
          const paymentPlan = getPaymentPlanByTourist(TOURIST_ID);
          if (!paymentPlan) return null;
          return <PaymentSchedule plan={paymentPlan} />;
        })()}

        {/* Content Timeline (pre-trip drip) */}
        {group.status !== "completed" && group.status !== "in_tour" && (
          <ContentTimeline
            items={contentDripItems}
            departureDate={group.startDate}
            registrationDate={tourist.createdAt}
          />
        )}

        {/* Post-Trip Experience */}
        {group.status === "completed" && (
          <div className="space-y-6">
            <PostTripSummary
              group={group}
              itinerary={itinerary}
              touristName={tourist.name}
            />
            <TestimonialForm />
            <ReferralCard />
          </div>
        )}

        {/* Group Preview */}
        {groupMembers && groupMembers.length > 0 && (
          <div className="rounded-xl border border-border bg-background p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-foreground">Your Fellow Travelers</h2>
              <Link
                href="/tourist/group"
                className="text-xs text-secondary hover:text-foreground transition-colors flex items-center gap-1"
              >
                Meet everyone <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <GroupMemberGrid
              members={groupMembers.map((t) => ({ id: t.id, name: t.name }))}
              maxDisplay={10}
            />
            <p className="text-xs text-muted">{groupMembers.length} travelers in your group</p>
          </div>
        )}

        {/* Quick Links */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-foreground">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link
              href="/tourist/itinerary"
              className="flex items-center justify-between rounded-xl border border-border bg-background p-4 hover:bg-surface transition-colors"
            >
              <div className="flex items-center gap-3">
                <Map className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-foreground">View Itinerary</p>
                  <p className="text-xs text-muted">{itinerary.duration}-day {itinerary.name}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted" />
            </Link>
            <Link
              href="/tourist/prepare"
              className="flex items-center justify-between rounded-xl border border-border bg-background p-4 hover:bg-surface transition-colors"
            >
              <div className="flex items-center gap-3">
                <Backpack className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Prepare for Trip</p>
                  <p className="text-xs text-muted">Packing, phrases, tips</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted" />
            </Link>
            <Link
              href="/tourist/documents"
              className="flex items-center justify-between rounded-xl border border-border bg-background p-4 hover:bg-surface transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-foreground">My Documents</p>
                  <p className="text-xs text-muted">Upload and manage travel documents</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted" />
            </Link>
            <Link
              href="/tourist/group"
              className="flex items-center justify-between rounded-xl border border-border bg-background p-4 hover:bg-surface transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-foreground">My Group</p>
                  <p className="text-xs text-muted">Meet your fellow travelers</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
