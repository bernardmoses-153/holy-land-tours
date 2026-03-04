"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  useGroup,
  useItinerary,
  useTouristsByGroup,
  useDayLogs,
} from "@/hooks/use-mock-data";
import {
  PageHeader,
  TouristAvatar,
  MealBadge,
  LoadingSkeleton,
} from "@/components/shared";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Clock,
  Moon,
  CheckCircle2,
  XCircle,
  Save,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

const TOUR_GROUP_ID = "group-6";
const TODAY = new Date("2026-03-04");

export default function TourModeDayPage() {
  const params = useParams();
  const dayNumber = parseInt(params.dayNumber as string, 10);

  const { data: group, loading: groupLoading } = useGroup(TOUR_GROUP_ID);
  const { data: itinerary, loading: itinLoading } = useItinerary("itin-1");
  const { data: tourists, loading: touristsLoading } =
    useTouristsByGroup(TOUR_GROUP_ID);
  const { data: dayLogs, loading: logsLoading } = useDayLogs();

  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const loading = groupLoading || itinLoading || touristsLoading || logsLoading;

  // Calculate current day of tour
  const tourStartDate = group ? new Date(group.startDate) : new Date();
  const currentDayNumber = Math.max(
    1,
    Math.floor(
      (TODAY.getTime() - tourStartDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1
  );

  // Initialize attendance from dayLogs when data loads
  useMemo(() => {
    if (!tourists || !dayLogs) return;
    const existingLog = dayLogs.find((l) => l.dayNumber === dayNumber);
    if (existingLog) {
      const map: Record<string, boolean> = {};
      existingLog.attendance.forEach((a) => {
        map[a.touristId] = a.present;
      });
      setAttendance(map);
      setNotes(existingLog.notes);
    } else {
      const map: Record<string, boolean> = {};
      tourists.forEach((t) => {
        map[t.id] = true;
      });
      setAttendance(map);
      setNotes("");
    }
    setSaved(false);
  }, [dayNumber, tourists, dayLogs]);

  if (loading || !group || !itinerary || !tourists) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-4 w-24 mb-4" />
        <div className="skeleton h-8 w-48" />
        <LoadingSkeleton variant="card" count={2} />
      </div>
    );
  }

  const totalDays = itinerary.days.length;
  const currentDay = itinerary.days.find((d) => d.dayNumber === dayNumber);
  const hasPrev = dayNumber > 1;
  const hasNext = dayNumber < totalDays;

  const toggleAttendance = (touristId: string) => {
    setAttendance((prev) => ({
      ...prev,
      [touristId]: !prev[touristId],
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link
        href="/leader/tour-mode"
        className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Tour Mode
      </Link>

      <PageHeader
        title={`Day ${dayNumber}${currentDay ? `: ${currentDay.title}` : ""}`}
        description={group.name}
      >
        {dayNumber === currentDayNumber && (
          <span className="inline-flex items-center rounded-full bg-info-bg text-info px-2.5 py-0.5 text-xs font-medium">
            Today
          </span>
        )}
      </PageHeader>

      {/* Navigation Between Days */}
      <div className="flex items-center justify-between">
        {hasPrev ? (
          <Link
            href={`/leader/tour-mode/${dayNumber - 1}`}
            className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Day {dayNumber - 1}
          </Link>
        ) : (
          <div />
        )}
        {hasNext ? (
          <Link
            href={`/leader/tour-mode/${dayNumber + 1}`}
            className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors"
          >
            Day {dayNumber + 1}
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Day Details */}
      {currentDay ? (
        <div className="border border-border rounded-lg p-6 bg-background space-y-4">
          <p className="text-sm text-body leading-relaxed">
            {currentDay.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {currentDay.meetingTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted" />
                <div>
                  <p className="text-xs text-muted">Meeting Time</p>
                  <p className="text-sm text-foreground">
                    {currentDay.meetingTime}
                  </p>
                </div>
              </div>
            )}
            {currentDay.meetingPoint && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted" />
                <div>
                  <p className="text-xs text-muted">Meeting Point</p>
                  <p className="text-sm text-foreground">
                    {currentDay.meetingPoint}
                  </p>
                </div>
              </div>
            )}
            {currentDay.overnight && (
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-muted" />
                <div>
                  <p className="text-xs text-muted">Overnight</p>
                  <p className="text-sm text-foreground">
                    {currentDay.overnight}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Locations */}
          <div>
            <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-2">
              Locations
            </p>
            <div className="flex flex-wrap gap-2">
              {currentDay.locations.map((loc) => (
                <span
                  key={loc}
                  className="inline-flex items-center gap-1 text-xs bg-elevated text-foreground rounded-full px-2.5 py-0.5"
                >
                  <MapPin className="h-3 w-3 text-muted" />
                  {loc}
                </span>
              ))}
            </div>
          </div>

          {/* Meals */}
          <div>
            <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-2">
              Meals
            </p>
            <div className="flex gap-2">
              {currentDay.meals.map((meal) => (
                <MealBadge key={meal} meal={meal} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-border rounded-lg p-6 bg-background text-center">
          <p className="text-sm text-muted">
            No itinerary details for day {dayNumber}.
          </p>
        </div>
      )}

      {/* Attendance */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Attendance</h2>
          <span className="text-sm text-secondary mono">
            {presentCount}/{tourists.length} present
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tourists.map((t) => {
            const present = attendance[t.id] ?? true;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => toggleAttendance(t.id)}
                className={cn(
                  "flex items-center gap-3 border rounded-lg p-3 transition-colors text-left",
                  present
                    ? "border-success/30 bg-success-bg/30"
                    : "border-error/30 bg-error-bg/30"
                )}
              >
                <TouristAvatar name={t.name} size="sm" />
                <span className="text-sm font-medium text-foreground flex-1 truncate">
                  {t.name}
                </span>
                {present ? (
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-error shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="day-notes"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Day Notes
        </label>
        <textarea
          id="day-notes"
          rows={4}
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            setSaved(false);
          }}
          placeholder="Add notes for this day..."
          className={cn(
            "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground",
            "placeholder:text-muted",
            "hover:border-border-hover",
            "focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background",
            "transition-colors resize-none"
          )}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saved}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all",
            saved
              ? "bg-success-bg text-success cursor-default"
              : "bg-foreground text-background hover:opacity-90"
          )}
        >
          <Save className="h-4 w-4" />
          {saved ? "Saved" : "Save Day Log"}
        </button>
      </div>
    </div>
  );
}
