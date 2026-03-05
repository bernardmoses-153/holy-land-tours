import { cn } from "@/lib/utils";
import { Shield, Quote } from "lucide-react";
import { safetyStats, safetyTestimonials } from "@/data/onboarding-data";

interface SafetyCardProps {
  compact?: boolean;
  className?: string;
}

export function SafetyCard({ compact = false, className }: SafetyCardProps) {
  const testimonials = compact
    ? safetyTestimonials.slice(0, 2)
    : safetyTestimonials;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-olive-bg">
          <Shield className="h-4 w-4 text-olive" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Safety & Peace of Mind
          </h3>
          <p className="text-xs text-muted">
            Your safety is our top priority
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {safetyStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-background p-3 text-center"
          >
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] font-medium text-secondary">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      {!compact && (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-lg border border-border bg-surface p-4 space-y-2"
            >
              <Quote className="h-4 w-4 text-muted" />
              <p className="text-sm text-secondary italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  {t.name}
                </p>
                <p className="text-[11px] text-muted">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
