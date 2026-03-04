"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

const moods = [
  { value: "amazing", emoji: "🤩", label: "Amazing" },
  { value: "good", emoji: "😊", label: "Good" },
  { value: "okay", emoji: "😐", label: "Okay" },
  { value: "tired", emoji: "😴", label: "Tired" },
  { value: "challenging", emoji: "💪", label: "Challenging" },
] as const;

interface JournalEntryProps {
  dayNumber: number;
  onSave?: (content: string, mood: string) => void;
  className?: string;
}

export function JournalEntry({ dayNumber, onSave, className }: JournalEntryProps) {
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (content.trim()) {
      onSave?.(content, selectedMood);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className={cn("rounded-xl border border-border bg-background overflow-hidden", className)}>
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gold-bg">
          <BookOpen className="h-4 w-4 text-gold" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">Day {dayNumber} Journal</h3>
          <p className="text-xs text-muted">Capture your thoughts and memories</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Mood Selector */}
        <div className="space-y-2">
          <p className="text-xs text-secondary font-medium">How are you feeling?</p>
          <div className="flex gap-2">
            {moods.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => setSelectedMood(mood.value)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs transition-colors",
                  selectedMood === mood.value
                    ? "bg-foreground text-background"
                    : "bg-elevated text-secondary hover:bg-surface"
                )}
              >
                <span className="text-lg">{mood.emoji}</span>
                <span>{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Text Area */}
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setSaved(false);
          }}
          placeholder="What stood out to you today? What moved you? What will you remember?"
          rows={4}
          className={cn(
            "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground",
            "placeholder:text-muted resize-none",
            "focus:outline-none focus:border-border-hover transition-colors"
          )}
        />

        {/* Save */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={!content.trim()}
            className={cn(
              "text-xs font-medium px-4 py-2 rounded-lg transition-all",
              saved
                ? "bg-success-bg text-success"
                : "bg-foreground text-background hover:opacity-90 disabled:opacity-40"
            )}
          >
            {saved ? "Saved!" : "Save Entry"}
          </button>
        </div>
      </div>
    </div>
  );
}
