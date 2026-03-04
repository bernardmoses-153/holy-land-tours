"use client";

import { useChecklist } from "@/hooks/use-mock-data";
import {
  PageHeader,
  StatusBadge,
  FillRateBar,
  LoadingSkeleton,
} from "@/components/shared";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import type { ChecklistItem } from "@/types";

const CATEGORY_LABELS: Record<string, string> = {
  documents: "Documents",
  logistics: "Logistics",
  communication: "Communication",
  financial: "Financial",
};

const CATEGORY_ORDER: string[] = ["documents", "logistics", "communication", "financial"];

function StatusIcon({ status }: { status: ChecklistItem["status"] }) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    case "in_progress":
      return <Clock className="h-5 w-5 text-warning" />;
    default:
      return <Circle className="h-5 w-5 text-muted" />;
  }
}

export default function ChecklistPage() {
  const { data: items, loading } = useChecklist();

  if (loading || !items) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48 mb-2" />
        <div className="skeleton h-4 w-64" />
        <LoadingSkeleton variant="card" count={4} />
      </div>
    );
  }

  const completedCount = items.filter((i) => i.status === "completed").length;
  const totalCount = items.length;

  const grouped = CATEGORY_ORDER.reduce<Record<string, ChecklistItem[]>>(
    (acc, category) => {
      acc[category] = items.filter((i) => i.category === category);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Pre-Tour Checklist"
        description={`${completedCount} of ${totalCount} items completed`}
      />

      {/* Overall Progress */}
      <div className="border border-border rounded-lg p-6 bg-background">
        <FillRateBar
          current={completedCount}
          max={totalCount}
          label="Overall Progress"
        />
      </div>

      {/* Category Groups */}
      {CATEGORY_ORDER.map((category) => {
        const categoryItems = grouped[category];
        if (!categoryItems || categoryItems.length === 0) return null;
        const catComplete = categoryItems.filter(
          (i) => i.status === "completed"
        ).length;

        return (
          <section key={category}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-secondary uppercase tracking-wider">
                {CATEGORY_LABELS[category]}
              </h2>
              <span className="text-xs text-muted mono">
                {catComplete}/{categoryItems.length}
              </span>
            </div>
            <div className="space-y-2">
              {categoryItems.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-start gap-3 border border-border rounded-lg p-4 bg-background transition-opacity",
                    item.status === "completed" && "opacity-60"
                  )}
                >
                  <div className="shrink-0 mt-0.5">
                    <StatusIcon status={item.status} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm font-medium text-foreground",
                        item.status === "completed" && "line-through"
                      )}
                    >
                      {item.label}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {item.dueDate && (
                      <span className="text-xs text-secondary">
                        Due {formatDate(item.dueDate)}
                      </span>
                    )}
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
