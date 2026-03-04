"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { cn } from "@/lib/utils";

interface DayEntry {
  dayNumber: number;
  title: string;
  description: string;
  locations: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

function emptyDay(dayNumber: number): DayEntry {
  return {
    dayNumber,
    title: "",
    description: "",
    locations: "",
    breakfast: false,
    lunch: false,
    dinner: false,
  };
}

export default function CreateItineraryPage() {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState<DayEntry[]>([emptyDay(1)]);

  function addDay() {
    setDays((prev) => [...prev, emptyDay(prev.length + 1)]);
  }

  function removeDay(index: number) {
    setDays((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((d, i) => ({ ...d, dayNumber: i + 1 }))
    );
  }

  function updateDay(index: number, field: keyof DayEntry, value: string | boolean) {
    setDays((prev) =>
      prev.map((d, i) => (i === index ? { ...d, [field]: value } : d))
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

      <PageHeader
        title="Create New Itinerary"
        description="Build a new tour itinerary template."
      />

      <div className="max-w-3xl space-y-6">
        {/* Basic Info */}
        <div className="border border-border rounded-lg p-5 bg-background space-y-4">
          <h3 className="text-sm font-medium text-foreground">
            Basic Information
          </h3>

          <div>
            <label className="block text-xs font-medium text-secondary mb-1.5">
              Itinerary Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Classic Holy Land"
              className={cn(
                "w-full rounded-lg border border-border bg-background",
                "py-2 px-3 text-sm text-foreground",
                "placeholder:text-muted",
                "hover:border-border-hover",
                "focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background",
                "transition-colors"
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-secondary mb-1.5">
                Duration (days)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="8"
                min={1}
                className={cn(
                  "w-full rounded-lg border border-border bg-background",
                  "py-2 px-3 text-sm text-foreground mono",
                  "placeholder:text-muted",
                  "hover:border-border-hover",
                  "focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background",
                  "transition-colors"
                )}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-secondary mb-1.5">
                Price Per Person ($)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="2850"
                min={0}
                className={cn(
                  "w-full rounded-lg border border-border bg-background",
                  "py-2 px-3 text-sm text-foreground mono",
                  "placeholder:text-muted",
                  "hover:border-border-hover",
                  "focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background",
                  "transition-colors"
                )}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the itinerary..."
              rows={3}
              className={cn(
                "w-full rounded-lg border border-border bg-background",
                "py-2 px-3 text-sm text-foreground",
                "placeholder:text-muted",
                "hover:border-border-hover",
                "focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background",
                "transition-colors resize-none"
              )}
            />
          </div>
        </div>

        {/* Day Entries */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">
              Day-by-Day Plan
            </h3>
            <span className="text-xs text-muted">
              {days.length} day{days.length !== 1 ? "s" : ""} added
            </span>
          </div>

          {days.map((day, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-5 bg-background space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-foreground text-background text-xs font-semibold mono">
                    {day.dayNumber}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Day {day.dayNumber}
                  </span>
                </div>
                {days.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDay(index)}
                    className="p-1.5 text-muted hover:text-error transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={day.title}
                  onChange={(e) => updateDay(index, "title", e.target.value)}
                  placeholder="e.g., Arrival — Welcome to the Holy Land"
                  className={cn(
                    "w-full rounded-lg border border-border bg-background",
                    "py-2 px-3 text-sm text-foreground",
                    "placeholder:text-muted",
                    "hover:border-border-hover",
                    "focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background",
                    "transition-colors"
                  )}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">
                  Description
                </label>
                <textarea
                  value={day.description}
                  onChange={(e) =>
                    updateDay(index, "description", e.target.value)
                  }
                  placeholder="Describe the day's activities..."
                  rows={2}
                  className={cn(
                    "w-full rounded-lg border border-border bg-background",
                    "py-2 px-3 text-sm text-foreground",
                    "placeholder:text-muted",
                    "hover:border-border-hover",
                    "focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background",
                    "transition-colors resize-none"
                  )}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">
                  Locations (comma-separated)
                </label>
                <input
                  type="text"
                  value={day.locations}
                  onChange={(e) =>
                    updateDay(index, "locations", e.target.value)
                  }
                  placeholder="e.g., Jerusalem, Western Wall, Old City"
                  className={cn(
                    "w-full rounded-lg border border-border bg-background",
                    "py-2 px-3 text-sm text-foreground",
                    "placeholder:text-muted",
                    "hover:border-border-hover",
                    "focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background",
                    "transition-colors"
                  )}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">
                  Meals Included
                </label>
                <div className="flex items-center gap-4">
                  {(["breakfast", "lunch", "dinner"] as const).map((meal) => (
                    <label
                      key={meal}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={day[meal]}
                        onChange={(e) =>
                          updateDay(index, meal, e.target.checked)
                        }
                        className="h-4 w-4 rounded border-border text-foreground focus:ring-foreground"
                      />
                      <span className="text-sm text-body capitalize">
                        {meal}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addDay}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-dashed border-border py-3 text-sm text-secondary hover:text-foreground hover:border-border-hover transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Day
          </button>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-6 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
            onClick={() => {
              // Mock save — no actual functionality
              alert("Itinerary saved! (mock)");
            }}
          >
            Save Itinerary
          </button>
          <Link
            href="/operator/itineraries"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-secondary hover:text-foreground hover:border-border-hover transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
