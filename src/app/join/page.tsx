"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Ticket, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getGroupInviteByCode } from "@/data/onboarding-data";

const inputStyles =
  "w-full rounded-lg border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2";

export default function JoinPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const invite = getGroupInviteByCode(code.trim());
    if (!invite) {
      setError("Invalid or expired invite code. Please check and try again.");
      return;
    }
    if (!invite.active) {
      setError("This group is no longer accepting new members.");
      return;
    }

    router.push(`/join/${invite.slug}`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md animate-fade-in space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-bg">
            <Ticket className="h-7 w-7 text-gold" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Join a Group
          </h1>
          <p className="text-sm text-muted">
            Enter the invite code from your group leader
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-foreground"
            >
              Invite Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError("");
              }}
              placeholder="e.g. GRACE2026"
              className={cn(
                inputStyles,
                "text-center text-lg font-bold tracking-widest uppercase",
                error && "border-error"
              )}
              autoFocus
            />
            {error && (
              <p className="text-xs text-error">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!code.trim()}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-opacity",
              code.trim()
                ? "bg-foreground text-background hover:opacity-90"
                : "cursor-not-allowed bg-elevated text-muted"
            )}
          >
            Find My Group
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="text-center space-y-3">
          <p className="text-xs text-muted">
            Don&apos;t have a code? Ask your group leader for an invite link or code.
          </p>
          <Link
            href="/select-role"
            className="block text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-80"
          >
            Back to role selection
          </Link>
        </div>
      </div>
    </div>
  );
}
