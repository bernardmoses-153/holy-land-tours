import { cn } from "@/lib/utils";

interface FillRateBarProps {
  current: number;
  max: number;
  label?: string;
}

export function FillRateBar({ current, max, label }: FillRateBarProps) {
  const percentage = max > 0 ? Math.min((current / max) * 100, 100) : 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        {label && (
          <span className="text-sm text-secondary">{label}</span>
        )}
        <span className="text-sm mono text-foreground ml-auto">
          {current}/{max}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-elevated overflow-hidden">
        <div
          className={cn("h-2 rounded-full bg-foreground transition-all duration-500")}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
