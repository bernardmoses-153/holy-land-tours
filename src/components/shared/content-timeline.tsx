"use client";

import { useState } from "react";
import { Lock, ChevronDown, ChevronUp, Sparkles, BookOpen, Users, FileCheck, Heart, Backpack, MapPin } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { ContentDripItem, ContentDripType } from "@/types";
import { holyLandImages } from "@/data/images";

const typeConfig: Record<ContentDripType, { icon: typeof Sparkles; color: string; label: string }> = {
  welcome: { icon: Sparkles, color: "text-gold bg-gold-bg", label: "Welcome" },
  inspiration: { icon: Heart, color: "text-sky bg-sky-bg", label: "Inspiration" },
  connection: { icon: Users, color: "text-olive bg-olive-bg", label: "Connection" },
  education: { icon: BookOpen, color: "text-sand bg-sand-bg", label: "Education" },
  action: { icon: FileCheck, color: "text-foreground bg-elevated", label: "Action" },
  community: { icon: Users, color: "text-olive bg-olive-bg", label: "Community" },
  practical: { icon: Backpack, color: "text-secondary bg-elevated", label: "Practical" },
  emotional: { icon: MapPin, color: "text-gold bg-gold-bg", label: "Emotional" },
};

interface ContentTimelineProps {
  items: ContentDripItem[];
  departureDate: string;
  registrationDate: string;
}

export function ContentTimeline({ items, departureDate, registrationDate }: ContentTimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const now = new Date();
  const departure = new Date(departureDate);
  const daysUntilDeparture = Math.ceil((departure.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  function isUnlocked(item: ContentDripItem): boolean {
    if (item.dayOffset === 0) {
      return now >= new Date(registrationDate);
    }
    return daysUntilDeparture <= Math.abs(item.dayOffset);
  }

  function getUnlockDate(item: ContentDripItem): Date {
    if (item.dayOffset === 0) return new Date(registrationDate);
    const d = new Date(departureDate);
    d.setDate(d.getDate() + item.dayOffset);
    return d;
  }

  const sortedItems = [...items].sort((a, b) => {
    const dateA = getUnlockDate(a).getTime();
    const dateB = getUnlockDate(b).getTime();
    return dateA - dateB;
  });

  return (
    <div className="rounded-xl border border-border bg-background p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Your Journey Timeline</h3>
        <span className="text-xs text-muted">
          {sortedItems.filter(isUnlocked).length}/{sortedItems.length} unlocked
        </span>
      </div>

      <div className="space-y-0">
        {sortedItems.map((item, index) => {
          const unlocked = isUnlocked(item);
          const expanded = expandedId === item.id;
          const config = typeConfig[item.type];
          const Icon = config.icon;
          const imageUrl = item.imageKey ? holyLandImages[item.imageKey]?.url : undefined;

          return (
            <div key={item.id} className="relative">
              {/* Connecting line */}
              {index < sortedItems.length - 1 && (
                <div className={cn(
                  "absolute left-[15px] top-8 w-0.5 h-[calc(100%-8px)]",
                  unlocked ? "bg-foreground" : "bg-border"
                )} />
              )}

              <button
                type="button"
                onClick={() => unlocked && setExpandedId(expanded ? null : item.id)}
                disabled={!unlocked}
                className={cn(
                  "flex items-start gap-3 w-full text-left py-3 relative z-10 transition-opacity",
                  !unlocked && "opacity-50 cursor-not-allowed"
                )}
              >
                {/* Icon */}
                <div className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0",
                  unlocked ? config.color : "bg-elevated text-muted"
                )}>
                  {unlocked ? <Icon className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={cn(
                      "text-sm font-medium truncate",
                      unlocked ? "text-foreground" : "text-muted"
                    )}>
                      {item.title}
                    </p>
                    {unlocked && (
                      expanded
                        ? <ChevronUp className="h-4 w-4 text-muted flex-shrink-0" />
                        : <ChevronDown className="h-4 w-4 text-muted flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    {unlocked
                      ? item.teaser
                      : `Unlocks ${formatDate(getUnlockDate(item))}`
                    }
                  </p>
                </div>
              </button>

              {/* Expanded content */}
              {unlocked && expanded && (
                <div className="ml-11 pb-4 animate-fade-in space-y-3">
                  {imageUrl && (
                    <div
                      className="h-32 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                  )}
                  <p className="text-sm text-secondary leading-relaxed whitespace-pre-line">
                    {item.content}
                  </p>
                  {item.cta && (
                    <a
                      href={item.cta.href}
                      className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:opacity-80 transition-opacity"
                    >
                      {item.cta.label} &rarr;
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
