"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialFormProps {
  onSubmit?: (rating: number, text: string) => void;
}

export function TestimonialForm({ onSubmit }: TestimonialFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (rating > 0 && text.trim()) {
      onSubmit?.(rating, text);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-background p-6 text-center space-y-3">
        <div className="flex items-center justify-center gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className={cn("h-5 w-5", i <= rating ? "fill-gold text-gold" : "text-border")} />
          ))}
        </div>
        <p className="text-sm font-medium text-foreground">Thank you for sharing!</p>
        <p className="text-xs text-secondary">
          Your review helps future travelers make their decision.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-background p-6 space-y-4">
      <h3 className="text-sm font-medium text-foreground">Share Your Experience</h3>
      <p className="text-xs text-secondary">
        Your review helps other travelers and helps us improve.
      </p>

      {/* Star rating */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setRating(i)}
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-0.5"
          >
            <Star
              className={cn(
                "h-7 w-7 transition-colors",
                i <= (hoverRating || rating)
                  ? "fill-gold text-gold"
                  : "text-border hover:text-gold/50"
              )}
            />
          </button>
        ))}
        {rating > 0 && (
          <span className="text-xs text-muted ml-2">
            {rating === 5 ? "Amazing!" : rating === 4 ? "Great!" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
          </span>
        )}
      </div>

      {/* Text review */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tell us about your experience — what surprised you? What was your favorite moment?"
        rows={4}
        className="w-full rounded-lg border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 resize-none"
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={rating === 0 || !text.trim()}
        className="flex items-center justify-center gap-2 w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Send className="h-4 w-4" />
        Submit Review
      </button>
    </div>
  );
}
