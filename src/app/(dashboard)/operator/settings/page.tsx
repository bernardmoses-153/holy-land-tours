"use client";

import { useOperator } from "@/hooks/use-mock-data";
import { PageHeader, LoadingSkeleton } from "@/components/shared";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { data: operator, loading } = useOperator();

  if (loading) {
    return (
      <div>
        <div className="mb-6">
          <LoadingSkeleton variant="text" />
        </div>
        <LoadingSkeleton variant="card" count={1} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your company information and preferences."
      />

      <div className="max-w-2xl">
        <div className="border border-border rounded-lg p-5 bg-background space-y-5">
          <h3 className="text-sm font-medium text-foreground">
            Company Information
          </h3>

          <div>
            <label className="block text-xs font-medium text-secondary mb-1.5">
              Company Name
            </label>
            <input
              type="text"
              value={operator?.companyName ?? ""}
              readOnly
              className={cn(
                "w-full rounded-lg border border-border bg-elevated",
                "py-2 px-3 text-sm text-foreground",
                "cursor-not-allowed opacity-70"
              )}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={operator?.location ?? ""}
              readOnly
              className={cn(
                "w-full rounded-lg border border-border bg-elevated",
                "py-2 px-3 text-sm text-foreground",
                "cursor-not-allowed opacity-70"
              )}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary mb-1.5">
              Contact Email
            </label>
            <input
              type="email"
              value={operator?.email ?? ""}
              readOnly
              className={cn(
                "w-full rounded-lg border border-border bg-elevated",
                "py-2 px-3 text-sm text-foreground",
                "cursor-not-allowed opacity-70"
              )}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary mb-1.5">
              Phone
            </label>
            <input
              type="tel"
              value={operator?.phone ?? ""}
              readOnly
              className={cn(
                "w-full rounded-lg border border-border bg-elevated",
                "py-2 px-3 text-sm text-foreground mono",
                "cursor-not-allowed opacity-70"
              )}
            />
          </div>

          <div className="pt-2">
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-6 py-2.5 text-sm font-medium opacity-50 cursor-not-allowed"
            >
              Save Changes
            </button>
            <p className="text-xs text-muted mt-2">
              Settings are read-only in this demo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
