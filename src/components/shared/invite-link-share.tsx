"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Copy, Mail, MessageCircle, Check, Share2 } from "lucide-react";

interface InviteLinkShareProps {
  slug: string;
  code: string;
  className?: string;
}

export function InviteLinkShare({
  slug,
  code,
  className,
}: InviteLinkShareProps) {
  const [copied, setCopied] = useState(false);
  const inviteUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/join/${slug}`;

  function handleCopy() {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <Share2 className="h-4 w-4 text-foreground" />
        <h3 className="text-sm font-semibold text-foreground">
          Share Your Invite Link
        </h3>
      </div>

      {/* Link display + copy */}
      <div className="flex items-center gap-2">
        <div className="flex-1 rounded-lg border border-border bg-surface px-3 py-2.5">
          <p className="truncate text-xs mono text-secondary">{inviteUrl}</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border transition-all",
            copied
              ? "bg-success-bg border-success text-success"
              : "bg-background hover:bg-surface"
          )}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Invite code */}
      <div className="rounded-lg bg-gold-bg px-3 py-2 text-center">
        <p className="text-[10px] font-medium text-gold uppercase tracking-wider">
          Invite Code
        </p>
        <p className="text-lg font-bold tracking-widest text-gold">{code}</p>
      </div>

      {/* Share buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-surface"
        >
          <Mail className="h-3.5 w-3.5" />
          Share via Email
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-surface"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Share via WhatsApp
        </button>
      </div>
    </div>
  );
}
