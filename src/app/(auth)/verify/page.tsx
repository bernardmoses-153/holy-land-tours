import Link from "next/link";
import { Mail } from "lucide-react";

export default function VerifyPage() {
  return (
    <div className="animate-fade-in space-y-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface">
        <Mail className="h-8 w-8 text-foreground" />
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
