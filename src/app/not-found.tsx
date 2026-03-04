import Link from "next/link";
import { MapPinOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-elevated">
        <MapPinOff className="h-10 w-10 text-muted" />
      </div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Page Not Found</h1>
      <p className="mb-8 max-w-md text-body">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-[#262626]"
        >
          Go Home
        </Link>
        <Link
          href="/operator"
          className="rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-surface"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
