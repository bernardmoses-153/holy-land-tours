"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Send, Sparkles, ChevronDown } from "lucide-react";
import { announcementTemplates } from "@/data/ai-responses";

interface AnnouncementComposerProps {
  recipientCount: number;
  onSend?: (subject: string, body: string) => void;
  className?: string;
}

export function AnnouncementComposer({
  recipientCount,
  onSend,
  className,
}: AnnouncementComposerProps) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const [sent, setSent] = useState(false);

  const handleTemplate = (templateId: string) => {
    const template = announcementTemplates.find((t) => t.id === templateId);
    if (template) {
      setSubject(template.subject);
      setBody(template.body);
    }
    setShowTemplates(false);
  };

  const handleAIAssist = () => {
    // Mock AI enhancement
    if (body.trim()) {
      setBody(
        body +
          "\n\nP.S. Don't forget to check your portal for the latest updates and complete any outstanding tasks. We're excited for this journey together!"
      );
    }
  };

  const handleSend = () => {
    if (subject.trim() && body.trim()) {
      onSend?.(subject, body);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setSubject("");
        setBody("");
      }, 2000);
    }
  };

  return (
    <div className={cn("rounded-xl border border-border bg-background overflow-hidden", className)}>
      <div className="p-4 border-b border-border space-y-3">
        {/* Template selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTemplates(!showTemplates)}
            className="flex items-center gap-2 text-xs font-medium text-secondary hover:text-foreground transition-colors"
          >
            Use a template
            <ChevronDown className={cn("h-3 w-3 transition-transform", showTemplates && "rotate-180")} />
          </button>
          {showTemplates && (
            <div className="absolute top-8 left-0 z-10 w-72 rounded-lg border border-border bg-background shadow-lg py-1">
              {announcementTemplates.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => handleTemplate(tpl.id)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-surface transition-colors"
                >
                  <p className="font-medium text-foreground">{tpl.name}</p>
                  <p className="text-xs text-muted truncate">{tpl.subject}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Subject */}
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject line..."
          className="w-full text-sm font-medium text-foreground placeholder:text-muted bg-transparent focus:outline-none"
        />
      </div>

      {/* Body */}
      <div className="p-4">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your announcement..."
          rows={6}
          className={cn(
            "w-full text-sm text-body placeholder:text-muted bg-transparent resize-none",
            "focus:outline-none leading-relaxed"
          )}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-4 border-t border-border bg-surface">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAIAssist}
            className="flex items-center gap-1.5 text-xs font-medium text-gold hover:text-gold/80 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Enhance
          </button>
          <span className="text-xs text-muted">
            To: {recipientCount} travelers
          </span>
        </div>
        <button
          type="button"
          onClick={handleSend}
          disabled={!subject.trim() || !body.trim()}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all",
            sent
              ? "bg-success-bg text-success"
              : "bg-foreground text-background hover:opacity-90 disabled:opacity-40"
          )}
        >
          <Send className="h-3.5 w-3.5" />
          {sent ? "Sent!" : "Send Announcement"}
        </button>
      </div>
    </div>
  );
}
