import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, Minus, type LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
}

const trendConfig = {
  up: { icon: ArrowUp, color: "text-success" },
  down: { icon: ArrowDown, color: "text-error" },
  neutral: { icon: Minus, color: "text-muted" },
} as const;

export function StatCard({ label, value, change, trend, icon: Icon }: StatCardProps) {
  const trendInfo = trend ? trendConfig[trend] : null;
  const TrendIcon = trendInfo?.icon;

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-secondary">{label}</p>
        {Icon && (
          <Icon className="h-5 w-5 text-muted" />
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight mono">
          {value}
        </span>
        {change && trendInfo && TrendIcon && (
          <span className={cn("flex items-center gap-0.5 text-sm font-medium", trendInfo.color)}>
            <TrendIcon className="h-3.5 w-3.5" />
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
