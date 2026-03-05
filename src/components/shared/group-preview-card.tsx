import { cn } from "@/lib/utils";
import { Users, Calendar, MapPin } from "lucide-react";

interface GroupPreviewCardProps {
  name: string;
  leaderName?: string;
  leaderTitle?: string;
  description?: string;
  itineraryName?: string;
  season?: string;
  estimatedSize?: string;
  className?: string;
}

export function GroupPreviewCard({
  name,
  leaderName,
  leaderTitle,
  description,
  itineraryName,
  season,
  estimatedSize,
  className,
}: GroupPreviewCardProps) {
  const displayName = name || "Your Group Name";

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background p-5 space-y-4 transition-all",
        className
      )}
    >
      {/* Group header */}
      <div className="space-y-1">
        <h3 className="text-lg font-bold tracking-tight text-foreground">
          {displayName}
        </h3>
        {leaderName && (
          <p className="text-xs text-muted">
            Led by {leaderTitle ? `${leaderTitle} ` : ""}
            {leaderName}
          </p>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-secondary line-clamp-3">{description}</p>
      )}

      {/* Meta info */}
      <div className="flex flex-wrap gap-3">
        {itineraryName && (
          <div className="flex items-center gap-1.5 text-xs text-secondary">
            <MapPin className="h-3.5 w-3.5 text-muted" />
            {itineraryName}
          </div>
        )}
        {season && (
          <div className="flex items-center gap-1.5 text-xs text-secondary">
            <Calendar className="h-3.5 w-3.5 text-muted" />
            {season.charAt(0).toUpperCase() + season.slice(1)}
          </div>
        )}
        {estimatedSize && (
          <div className="flex items-center gap-1.5 text-xs text-secondary">
            <Users className="h-3.5 w-3.5 text-muted" />
            {estimatedSize} travelers
          </div>
        )}
      </div>

      {/* Preview badge */}
      <div className="flex items-center gap-1.5 rounded-lg bg-gold-bg px-3 py-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
        <span className="text-[11px] font-medium text-gold">Live preview</span>
      </div>
    </div>
  );
}
