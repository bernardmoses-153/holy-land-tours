"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, ArrowRight } from "lucide-react";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const group = searchParams.get("group");

  function handleContinue() {
    if (redirect) {
      const params = new URLSearchParams();
      if (group) params.set("group", group);
      router.push(`${redirect}${params.toString() ? `?${params.toString()}` : ""}`);
    } else {
      router.push("/select-role");
    }
  }

  return (
    <div className="animate-fade-in space-y-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-bg">
        <Mail className="h-8 w-8 text-success" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Check your email
        </h1>
        <p className="text-sm text-muted">
          We&apos;ve sent a verification link to your email
        </p>
      </div>

      <div className="space-y-4 pt-2">
        <button
          type="button"
          onClick={handleContinue}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>

        <p className="text-sm text-muted">
          Didn&apos;t receive the email?{" "}
          <button
            type="button"
            className="font-medium text-foreground underline underline-offset-4 hover:opacity-80"
          >
            Resend
          </button>
        </p>

        <Link
          href="/login"
          className="block text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-80"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyContent />
    </Suspense>
  );
}
