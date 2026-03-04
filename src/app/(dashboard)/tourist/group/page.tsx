"use client";

import { useGroup, useLeader, useTouristsByGroup } from "@/hooks/use-mock-data";
import { PageHeader, LoadingSkeleton, TouristAvatar } from "@/components/shared";
import { cn, getInitials } from "@/lib/utils";
import { Users, Crown, MessageCircle, Sparkles } from "lucide-react";

const GROUP_ID = "group-1";
const LEADER_ID = "leader-1";

const icebreakers = [
  "What are you most excited to see in Israel?",
  "Have you traveled to the Middle East before?",
  "What's on your Holy Land bucket list?",
  "Do you prefer sunrise hikes or sunset views?",
  "What's one thing you want to bring home from this trip?",
];

const mockChatMessages = [
  { id: "mc-1", name: "Sarah Williams", message: "So excited for this trip! Anyone been to the Dead Sea before?", time: "2h ago" },
  { id: "mc-2", name: "Michael Brown", message: "First time! Can't wait to float 😄", time: "1h ago" },
  { id: "mc-3", name: "Pastor David Chen", message: "Welcome everyone! We're going to have an amazing journey together.", time: "45m ago" },
  { id: "mc-4", name: "Emily Davis", message: "Does anyone have restaurant recommendations for Jerusalem?", time: "30m ago" },
];

export default function GroupPage() {
  const { data: group, loading: groupLoading } = useGroup(GROUP_ID);
  const { data: leader, loading: leaderLoading } = useLeader(LEADER_ID);
  const { data: tourists, loading: touristsLoading } = useTouristsByGroup(GROUP_ID);

  const loading = groupLoading || leaderLoading || touristsLoading;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48" />
        <LoadingSkeleton variant="card" count={3} />
      </div>
    );
  }

  if (!group || !leader || !tourists) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Your Travel Group"
        description={`${group.name} — ${tourists.length} travelers`}
      />

      {/* Leader Card */}
      <div className="rounded-xl border border-gold/20 bg-gold-bg p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-medium text-gold uppercase tracking-wider">
          <Crown className="h-3.5 w-3.5" />
          Your Group Leader
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gold/10 text-gold font-bold text-lg">
            {getInitials(leader.name)}
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">{leader.name}</h3>
            <p className="text-sm text-secondary">{leader.title}</p>
            <p className="text-xs text-muted">{leader.organization}</p>
          </div>
        </div>
      </div>

      {/* Group Members */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Users className="h-4 w-4 text-muted" />
            Fellow Travelers
          </h2>
          <span className="text-xs text-muted">{tourists.length} members</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {tourists.map((tourist) => (
            <div
              key={tourist.id}
              className="rounded-xl border border-border bg-background p-4 flex flex-col items-center text-center space-y-2"
            >
              <TouristAvatar name={tourist.name} size="md" />
              <div>
                <p className="text-sm font-medium text-foreground">{tourist.name}</p>
                <p className="text-[10px] text-muted capitalize">{tourist.roomPreference} room</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group Chat Preview */}
      <div className="rounded-xl border border-border bg-background overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-border bg-surface">
          <MessageCircle className="h-4 w-4 text-secondary" />
          <div>
            <h3 className="text-sm font-medium text-foreground">Group Chat</h3>
            <p className="text-xs text-muted">Stay connected with your group</p>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {mockChatMessages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3">
              <div className="flex items-center justify-center h-7 w-7 rounded-full bg-elevated text-secondary text-[10px] font-medium shrink-0">
                {getInitials(msg.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-medium text-foreground">{msg.name}</span>
                  <span className="text-[10px] text-muted">{msg.time}</span>
                </div>
                <p className="text-sm text-body mt-0.5">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border p-3">
          <input
            type="text"
            placeholder="Say hello to your group..."
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-border-hover transition-colors"
            readOnly
          />
        </div>
      </div>

      {/* Icebreakers */}
      <div className="rounded-xl border border-border bg-sky-bg p-4 space-y-3">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-sky" />
          Icebreaker Questions
        </h3>
        <p className="text-xs text-secondary">Get to know your fellow travelers before the trip!</p>
        <div className="space-y-2">
          {icebreakers.map((q) => (
            <div key={q} className="flex items-start gap-2 text-xs text-secondary">
              <span className="text-sky mt-0.5">•</span>
              {q}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
