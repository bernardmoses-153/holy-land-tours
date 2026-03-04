"use client";

import { useTourist, useGroup, useItinerary, useNotifications } from "@/hooks/use-mock-data";
import { CountdownTimer, StatusBadge, LoadingSkeleton, FillRateBar } from "@/components/shared";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { DOCUMENT_STATUS_LABELS, PAYMENT_STATUS_LABELS } from "@/lib/constants";
import Link from "next/link";
import {
  FileText,
  Heart,
  Shield,
  CreditCard,
  Calendar,
  Bell,
  Map,
  Users,
  ChevronRight,
  CheckCircle2,
  Circle,
  Plane,
} from "lucide-react";

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

  if (allDocsApproved && paidFull) return 3; // Ready
  if (paidFull) return 2; // Payment done
  if (allDocsApproved) return 1; // Documents done
  return 0; // Registered
}

export default function TouristDashboardPage() {
  const { data: tourist, loading: touristLoading } = useTourist(TOURIST_ID);
  const { data: group, loading: groupLoading } = useGroup("group-1");
  const { data: itinerary, loading: itinLoading } = useItinerary("itin-1");
  const { data: notifications, loading: notifsLoading } = useNotifications(TOURIST_ID);

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
  const unreadCount = notifications?.filter((n) => !n.read).length ?? 0;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-2 pt-2">
        <p className="text-sm text-secondary">Welcome back, {tourist.name.split(" ")[0]}</p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Your Holy Land Journey
        </h1>
        <p className="text-sm text-muted">{group.name}</p>
      </div>

      {/* Countdown Timer */}
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

      {/* Journey Status Stepper */}
      <div className="rounded-xl border border-border bg-background p-6 space-y-4">
        <h2 className="text-sm font-medium text-foreground">Journey Status</h2>
        <div className="flex items-center justify-between">
          {journeyStages.map((stage, index) => {
            const isCompleted = index < currentStage;
            const isCurrent = index === currentStage;

            return (
              <div key={stage.key} className="flex flex-col items-center flex-1 relative">
                {/* Connector line */}
                {index > 0 && (
                  <div
                    className={cn(
                      "absolute top-3 right-1/2 w-full h-0.5 -z-10",
                      index <= currentStage ? "bg-foreground" : "bg-border"
                    )}
                  />
                )}
                {/* Circle */}
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
                {/* Label */}
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

      {/* Readiness Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-foreground">Trip Readiness</h2>
        <div className="grid grid-cols-2 gap-3">
          {/* Passport */}
          <div className="rounded-xl border border-border bg-background p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-elevated">
                <FileText className="h-4 w-4 text-secondary" />
              </div>
              <span className="text-sm font-medium text-foreground">Passport</span>
            </div>
            <StatusBadge status={tourist.passportStatus} />
            <Link
              href="/tourist/documents"
              className="text-xs text-secondary hover:text-foreground transition-colors"
            >
              {tourist.passportStatus === "approved" ? "View" : "Upload"} &rarr;
            </Link>
          </div>

          {/* Medical Form */}
          <div className="rounded-xl border border-border bg-background p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-elevated">
                <Heart className="h-4 w-4 text-secondary" />
              </div>
              <span className="text-sm font-medium text-foreground">Medical Form</span>
            </div>
            <StatusBadge status={tourist.medicalFormStatus} />
            <Link
              href="/tourist/documents"
              className="text-xs text-secondary hover:text-foreground transition-colors"
            >
              {tourist.medicalFormStatus === "approved" ? "View" : "Upload"} &rarr;
            </Link>
          </div>

          {/* Insurance */}
          <div className="rounded-xl border border-border bg-background p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-elevated">
                <Shield className="h-4 w-4 text-secondary" />
              </div>
              <span className="text-sm font-medium text-foreground">Insurance</span>
            </div>
            <StatusBadge status={tourist.insuranceStatus} />
            <Link
              href="/tourist/documents"
              className="text-xs text-secondary hover:text-foreground transition-colors"
            >
              {tourist.insuranceStatus === "approved" ? "View" : "Upload"} &rarr;
            </Link>
          </div>

          {/* Payment */}
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
              <FillRateBar
                current={tourist.amountPaid}
                max={tourist.amountPaid + tourist.amountDue}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Group Info Card */}
      <div className="rounded-xl border border-border bg-background p-6 space-y-4">
        <h2 className="text-sm font-medium text-foreground">Your Group</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary">Group</span>
            <span className="text-sm font-medium text-foreground">{group.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary">Leader</span>
            <span className="text-sm font-medium text-foreground">{group.leaderName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary">Itinerary</span>
            <span className="text-sm font-medium text-foreground">{itinerary.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary">Dates</span>
            <span className="text-sm font-medium text-foreground">
              {formatDate(group.startDate)} &mdash; {formatDate(group.endDate)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary">Group Size</span>
            <span className="text-sm font-medium text-foreground">
              {group.currentSize} travelers
            </span>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-foreground">Quick Links</h2>
        <div className="space-y-2">
          <Link
            href="/tourist/itinerary"
            className="flex items-center justify-between rounded-xl border border-border bg-background p-4 hover:bg-surface transition-colors"
          >
            <div className="flex items-center gap-3">
              <Map className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-sm font-medium text-foreground">View Itinerary</p>
                <p className="text-xs text-muted">
                  {itinerary.duration}-day {itinerary.name}
                </p>
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
            href="/tourist/notifications"
            className="flex items-center justify-between rounded-xl border border-border bg-background p-4 hover:bg-surface transition-colors"
          >
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-sm font-medium text-foreground">Notifications</p>
                <p className="text-xs text-muted">
                  {unreadCount > 0 ? `${unreadCount} unread updates` : "All caught up"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <span className="flex items-center justify-center h-5 w-5 rounded-full bg-foreground text-background text-xs font-medium">
                  {unreadCount}
                </span>
              )}
              <ChevronRight className="h-4 w-4 text-muted" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
