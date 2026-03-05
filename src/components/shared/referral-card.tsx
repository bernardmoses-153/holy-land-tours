"use client";

import { useState } from "react";
import { Gift, Copy, Check } from "lucide-react";

interface ReferralCardProps {
  referralCode?: string;
  discount?: number;
}

export function ReferralCard({ referralCode = "FRIEND200", discount = 200 }: ReferralCardProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-border bg-gradient-to-br from-gold-bg to-background p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Gift className="h-5 w-5 text-gold" />
        <h3 className="text-sm font-semibold text-foreground">Share the Experience</h3>
      </div>

      <p className="text-sm text-secondary">
        Know someone who should experience the Holy Land? Share your referral code and you
        <span className="font-semibold text-foreground"> both </span>
        get <span className="font-semibold text-gold">${discount} off</span> your next trip.
      </p>

      <div className="flex items-center gap-2">
        <div className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 mono text-sm font-medium text-foreground text-center">
          {referralCode}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm hover:bg-surface transition-colors"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4 text-secondary" />
          )}
        </button>
      </div>

      <p className="text-xs text-muted text-center">
        They get ${discount} off their first trip. You get ${discount} off your next trip.
      </p>
    </div>
  );
}
