"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TripFAQProps {
  items: { question: string; answer: string }[];
}

export function TripFAQ({ items }: TripFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-border bg-background p-6 space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <HelpCircle className="h-4 w-4" />
        Frequently Asked Questions
      </div>

      <div className="divide-y divide-border">
        {items.map((item, index) => (
          <div key={index}>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="text-sm font-medium text-foreground pr-4">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted transition-transform flex-shrink-0",
                  openIndex === index && "rotate-180"
                )}
              />
            </button>
            {openIndex === index && (
              <div className="pb-4 animate-fade-in">
                <p className="text-sm text-secondary leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
