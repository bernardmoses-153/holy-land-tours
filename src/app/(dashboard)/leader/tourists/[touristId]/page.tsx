"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTourist } from "@/hooks/use-mock-data";
import {
  PageHeader,
  StatusBadge,
  TouristAvatar,
  LoadingSkeleton,
} from "@/components/shared";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Mail,
  Phone,
  ShieldAlert,
  FileText,
  Heart,
  Plane,
  Shield,
  Send,
  Bed,
  Users,
  UtensilsCrossed,
} from "lucide-react";

export default function TouristDetailPage() {
  const params = useParams();
  const touristId = params.touristId as string;
  const { data: tourist, loading } = useTourist(touristId);
  const [reminderSent, setReminderSent] = useState(false);

  if (loading || !tourist) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-4 w-24 mb-4" />
        <div className="skeleton h-8 w-48" />
        <LoadingSkeleton variant="card" count={3} />
      </div>
    );
  }

  const documentStatuses = [
    { label: "Passport", status: tourist.passportStatus, icon: FileText },
    { label: "Medical Form", status: tourist.medicalFormStatus, icon: Heart },
    { label: "Insurance", status: tourist.insuranceStatus, icon: Shield },
    { label: "Flight Info", status: tourist.flightInfoStatus, icon: Plane },
  ];

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link
        href="/leader/tourists"
        className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Roster
      </Link>

      {/* Header */}
      <PageHeader title={tourist.name}>
        <TouristAvatar name={tourist.name} size="lg" />
      </PageHeader>

      {/* Contact Info */}
      <section className="border border-border rounded-lg p-6 bg-background space-y-4">
        <h2 className="text-sm font-medium text-secondary uppercase tracking-wider">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted" />
            <div>
              <p className="text-xs text-muted">Email</p>
              <p className="text-sm text-foreground">{tourist.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted" />
            <div>
              <p className="text-xs text-muted">Phone</p>
              <p className="text-sm text-foreground">{tourist.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-4 w-4 text-muted" />
            <div>
              <p className="text-xs text-muted">Emergency Contact</p>
              <p className="text-sm text-foreground">{tourist.emergencyContact}</p>
              <p className="text-xs text-secondary">{tourist.emergencyPhone}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Document Status */}
      <section className="border border-border rounded-lg p-6 bg-background space-y-4">
        <h2 className="text-sm font-medium text-secondary uppercase tracking-wider">
          Document Status
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {documentStatuses.map(({ label, status, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center justify-between border border-border rounded-lg p-4"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-muted" />
                <span className="text-sm text-foreground">{label}</span>
              </div>
              <StatusBadge status={status} />
            </div>
          ))}
        </div>
      </section>

      {/* Payment Section */}
      <section className="border border-border rounded-lg p-6 bg-background space-y-4">
        <h2 className="text-sm font-medium text-secondary uppercase tracking-wider">
          Payment
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-border rounded-lg p-4">
            <p className="text-xs text-muted">Amount Paid</p>
            <p className="text-xl font-semibold mono text-foreground mt-1">
              {formatCurrency(tourist.amountPaid)}
            </p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <p className="text-xs text-muted">Amount Due</p>
            <p className="text-xl font-semibold mono text-foreground mt-1">
              {formatCurrency(tourist.amountDue)}
            </p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <p className="text-xs text-muted">Payment Status</p>
            <div className="mt-2">
              <StatusBadge status={tourist.paymentStatus} />
            </div>
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="border border-border rounded-lg p-6 bg-background space-y-4">
        <h2 className="text-sm font-medium text-secondary uppercase tracking-wider">
          Preferences
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <Bed className="h-4 w-4 text-muted" />
            <div>
              <p className="text-xs text-muted">Room Type</p>
              <p className="text-sm text-foreground capitalize">
                {tourist.roomPreference}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-4 w-4 text-muted" />
            <div>
              <p className="text-xs text-muted">Roommate</p>
              <p className="text-sm text-foreground">
                {tourist.roommate || "None specified"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="h-4 w-4 text-muted" />
            <div>
              <p className="text-xs text-muted">Dietary Restrictions</p>
              <p className="text-sm text-foreground">
                {tourist.dietaryRestrictions || "None"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Send Reminder */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setReminderSent(true)}
          disabled={reminderSent}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all",
            reminderSent
              ? "bg-elevated text-muted cursor-not-allowed"
              : "bg-foreground text-background hover:opacity-90"
          )}
        >
          <Send className="h-4 w-4" />
          {reminderSent ? "Reminder Sent" : "Send Reminder"}
        </button>
      </div>
    </div>
  );
}
