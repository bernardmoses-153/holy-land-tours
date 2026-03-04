"use client";

import { useTourist, useGroup, useItinerary } from "@/hooks/use-mock-data";
import { PageHeader, TouristAvatar, LoadingSkeleton } from "@/components/shared";
import { formatDate, cn } from "@/lib/utils";
import {
  Mail,
  Phone,
  AlertCircle,
  BedDouble,
  Users,
  UtensilsCrossed,
  CalendarDays,
  MapPin,
  UserCircle,
  Pencil,
} from "lucide-react";

const TOURIST_ID = "t-1";

export default function ProfilePage() {
  const { data: tourist, loading: touristLoading } = useTourist(TOURIST_ID);
  const { data: group, loading: groupLoading } = useGroup("group-1");
  const { data: itinerary, loading: itinLoading } = useItinerary("itin-1");

  const loading = touristLoading || groupLoading || itinLoading;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48" />
        <LoadingSkeleton variant="card" count={3} />
      </div>
    );
  }

  if (!tourist || !group || !itinerary) return null;

  return (
    <div className="space-y-6">
      <PageHeader title="My Profile" />

      {/* Profile Header */}
      <div className="rounded-xl border border-border bg-background p-6">
        <div className="flex flex-col items-center text-center space-y-3 sm:flex-row sm:text-left sm:gap-5 sm:space-y-0">
          <TouristAvatar name={tourist.name} size="lg" />
          <div className="space-y-1.5">
            <h2 className="text-xl font-semibold text-foreground">{tourist.name}</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-secondary">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                {tourist.email}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" />
                {tourist.phone}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="rounded-xl border border-border bg-background p-6 space-y-4">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-muted" />
          Emergency Contact
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary">Contact Name</span>
            <span className="text-sm font-medium text-foreground">{tourist.emergencyContact}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary">Phone</span>
            <span className="text-sm font-medium text-foreground">{tourist.emergencyPhone}</span>
          </div>
        </div>
      </div>

      {/* Trip Preferences */}
      <div className="rounded-xl border border-border bg-background p-6 space-y-4">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <UserCircle className="h-4 w-4 text-muted" />
          Trip Preferences
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary flex items-center gap-1.5">
              <BedDouble className="h-3.5 w-3.5" />
              Room Preference
            </span>
            <span className="text-sm font-medium text-foreground capitalize">
              {tourist.roomPreference}
            </span>
          </div>
          {tourist.roommate && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                Roommate
              </span>
              <span className="text-sm font-medium text-foreground">{tourist.roommate}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary flex items-center gap-1.5">
              <UtensilsCrossed className="h-3.5 w-3.5" />
              Dietary Restrictions
            </span>
            <span className="text-sm font-medium text-foreground">
              {tourist.dietaryRestrictions || "None"}
            </span>
          </div>
        </div>
      </div>

      {/* Group Info */}
      <div className="rounded-xl border border-border bg-background p-6 space-y-4">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted" />
          Group Information
        </h3>
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
            <span className="text-sm text-secondary flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              Dates
            </span>
            <span className="text-sm font-medium text-foreground">
              {formatDate(group.startDate)} &mdash; {formatDate(group.endDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <button
        type="button"
        disabled
        className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-muted cursor-not-allowed"
      >
        <Pencil className="h-4 w-4" />
        Edit Profile
      </button>
      <p className="text-center text-xs text-muted">
        Contact your group leader to update your profile information.
      </p>
    </div>
  );
}
