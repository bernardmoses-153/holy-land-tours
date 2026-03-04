"use client";

import { useState } from "react";
import { useTouristsByGroup } from "@/hooks/use-mock-data";
import { PageHeader, LoadingSkeleton, AnnouncementComposer } from "@/components/shared";
import { formatDate } from "@/lib/utils";
import { Megaphone, Clock, Users } from "lucide-react";
import type { Announcement } from "@/types";

const GROUP_ID = "group-1";

const mockHistory: Announcement[] = [
  {
    id: "ann-1",
    subject: "Welcome to Our Holy Land Journey!",
    body: "We're thrilled to welcome you to our upcoming tour of Israel! Please review your itinerary and reach out with any questions.",
    sentAt: "2026-02-15T10:00:00Z",
    sentBy: "Pastor David Chen",
    recipientCount: 30,
  },
  {
    id: "ann-2",
    subject: "Document Upload Reminder",
    body: "Please ensure all required documents are uploaded by March 15. This includes passport copy, medical form, insurance, and flight information.",
    sentAt: "2026-02-28T14:30:00Z",
    sentBy: "Pastor David Chen",
    recipientCount: 30,
  },
  {
    id: "ann-3",
    subject: "Pre-Trip Meeting Details",
    body: "Join us for a pre-trip briefing on March 20 at 7 PM. We'll cover packing tips, cultural etiquette, and answer your questions.",
    sentAt: "2026-03-01T09:00:00Z",
    sentBy: "Pastor David Chen",
    recipientCount: 30,
  },
];

export default function AnnouncementsPage() {
  const { data: tourists, loading } = useTouristsByGroup(GROUP_ID);
  const [history, setHistory] = useState<Announcement[]>(mockHistory);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48" />
        <LoadingSkeleton variant="card" count={3} />
      </div>
    );
  }

  const recipientCount = tourists?.length || 0;

  const handleSend = (subject: string, body: string) => {
    const newAnnouncement: Announcement = {
      id: `ann-${Date.now()}`,
      subject,
      body,
      sentAt: new Date().toISOString(),
      sentBy: "Pastor David Chen",
      recipientCount,
    };
    setHistory((prev) => [newAnnouncement, ...prev]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Announcements"
        description="Communicate with your travel group"
      >
        <span className="inline-flex items-center gap-1.5 text-xs text-muted">
          <Users className="h-3.5 w-3.5" />
          {recipientCount} recipients
        </span>
      </PageHeader>

      {/* Composer */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
          <Megaphone className="h-4 w-4 text-gold" />
          New Announcement
        </h2>
        <AnnouncementComposer
          recipientCount={recipientCount}
          onSend={handleSend}
        />
      </div>

      {/* History */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-foreground">Sent Announcements</h2>
        <div className="space-y-3">
          {history.map((ann) => (
            <div
              key={ann.id}
              className="rounded-xl border border-border bg-background p-4 space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-medium text-foreground">{ann.subject}</h3>
                <div className="flex items-center gap-1.5 text-[10px] text-muted shrink-0">
                  <Clock className="h-3 w-3" />
                  {formatDate(ann.sentAt)}
                </div>
              </div>
              <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                {ann.body}
              </p>
              <div className="flex items-center gap-3 text-[10px] text-muted pt-2 border-t border-border">
                <span>Sent by {ann.sentBy}</span>
                <span>•</span>
                <span>{ann.recipientCount} recipients</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
