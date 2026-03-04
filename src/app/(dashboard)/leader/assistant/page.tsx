"use client";

import { PageHeader, AIChat } from "@/components/shared";
import { Bot, Sparkles } from "lucide-react";
import { leaderSuggestedPrompts, leaderMockResponses } from "@/data/ai-responses";
import type { ChatMessage } from "@/types";

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hello, Pastor David! I'm your AI assistant for managing the Grace Church Holy Land Tour. I can help with group readiness, draft communications, check tourist statuses, and plan tour logistics. What can I help you with?",
    timestamp: new Date().toISOString(),
  },
];

function getMockResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("reminder") && (lower.includes("document") || lower.includes("passport")))
    return leaderMockResponses.reminders;
  if (lower.includes("payment") && lower.includes("reminder"))
    return leaderMockResponses.payment;
  if (lower.includes("readiness") || lower.includes("status") || lower.includes("summary"))
    return leaderMockResponses.readiness;
  if (lower.includes("prepare") || lower.includes("tomorrow") || lower.includes("checklist"))
    return leaderMockResponses.prepare;
  if (lower.includes("welcome") || lower.includes("draft") || lower.includes("message"))
    return leaderMockResponses.welcome;
  return leaderMockResponses.readiness;
}

export default function LeaderAssistantPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Assistant"
        description="Your intelligent tour management companion"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-bg text-gold px-3 py-1 text-xs font-medium">
          <Sparkles className="h-3 w-3" />
          AI-Powered
        </span>
      </PageHeader>

      {/* Suggested Prompts */}
      <div className="space-y-2">
        <p className="text-xs text-muted">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {leaderSuggestedPrompts.map((prompt) => (
            <span
              key={prompt}
              className="text-xs rounded-full border border-border bg-surface px-3 py-1.5 text-secondary"
            >
              {prompt}
            </span>
          ))}
        </div>
      </div>

      {/* Full-page AI Chat */}
      <AIChat
        title="Tour Assistant"
        subtitle="AI-powered group management"
        initialMessages={initialMessages}
        suggestions={leaderSuggestedPrompts.slice(0, 3)}
        onSendMessage={getMockResponse}
        className="min-h-[500px]"
      />
    </div>
  );
}
