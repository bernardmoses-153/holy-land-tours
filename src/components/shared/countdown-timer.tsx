"use client";

import { useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-semibold mono tracking-tight">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs text-muted uppercase tracking-wider mt-1">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    return (
      <div className="text-center">
        <p className="text-sm text-muted">This event has passed</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <TimeUnit value={days} label="Days" />
      <TimeUnit value={hours} label="Hours" />
      <TimeUnit value={minutes} label="Minutes" />
      <TimeUnit value={seconds} label="Seconds" />
    </div>
  );
}
