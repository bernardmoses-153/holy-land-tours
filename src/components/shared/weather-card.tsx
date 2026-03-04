"use client";

import { Sun, Cloud, CloudRain, CloudSun, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WeatherDay } from "@/data/weather";
import { celsiusToFahrenheit } from "@/data/weather";

interface WeatherCardProps {
  weather: WeatherDay;
  compact?: boolean;
  className?: string;
}

const conditionIcons = {
  sunny: Sun,
  partly_cloudy: CloudSun,
  cloudy: Cloud,
  rain: CloudRain,
  hot: Thermometer,
};

const conditionColors = {
  sunny: "text-gold",
  partly_cloudy: "text-sky",
  cloudy: "text-secondary",
  rain: "text-sky",
  hot: "text-error",
};

export function WeatherCard({ weather, compact = false, className }: WeatherCardProps) {
  const Icon = conditionIcons[weather.condition];

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Icon className={cn("h-4 w-4", conditionColors[weather.condition])} />
        <span className="text-sm text-foreground font-medium">
          {weather.high}°C
        </span>
        <span className="text-xs text-muted">/ {weather.low}°C</span>
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border border-border bg-background p-4", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs text-muted uppercase tracking-wider">Weather</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">{weather.high}°</span>
            <span className="text-sm text-muted">/ {weather.low}°C</span>
          </div>
          <p className="text-xs text-muted">
            {celsiusToFahrenheit(weather.high)}°F / {celsiusToFahrenheit(weather.low)}°F
          </p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Icon className={cn("h-8 w-8", conditionColors[weather.condition])} />
          <span className="text-[10px] text-muted capitalize">
            {weather.condition.replace("_", " ")}
          </span>
        </div>
      </div>
      <p className="text-xs text-secondary mt-2">{weather.description}</p>
    </div>
  );
}
