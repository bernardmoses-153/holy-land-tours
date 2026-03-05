import { Globe, Star, Award, MessageCircle } from "lucide-react";
import { getInitials } from "@/lib/utils";
import type { Guide } from "@/types";

interface GuideProfileCardProps {
  guide: Guide;
  compact?: boolean;
}

export function GuideProfileCard({ guide, compact = false }: GuideProfileCardProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gold-bg text-gold text-sm font-semibold">
          {getInitials(guide.name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground truncate">{guide.name}</p>
          <div className="flex items-center gap-2 text-xs text-muted">
            <Globe className="h-3 w-3" />
            {guide.languages.join(", ")}
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-gold">
          <Star className="h-3 w-3 fill-gold" />
          {guide.rating}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-background p-6 space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <MessageCircle className="h-4 w-4" />
        Meet Your Guide
      </div>

      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gold-bg text-gold text-xl font-bold flex-shrink-0">
          {getInitials(guide.name)}
        </div>
        <div className="min-w-0 space-y-1">
          <h3 className="text-lg font-semibold text-foreground">{guide.name}</h3>
          <div className="flex flex-wrap items-center gap-3 text-xs text-secondary">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3 fill-gold text-gold" />
              {guide.rating} rating
            </span>
            <span className="inline-flex items-center gap-1">
              <Award className="h-3 w-3" />
              {guide.toursCompleted}+ tours
            </span>
            <span className="inline-flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {guide.languages.join(", ")}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-secondary leading-relaxed">{guide.bio}</p>

      <div className="flex flex-wrap gap-1.5">
        {guide.specialties.map((specialty) => (
          <span
            key={specialty}
            className="rounded-full bg-elevated px-2.5 py-1 text-xs font-medium text-secondary"
          >
            {specialty}
          </span>
        ))}
      </div>

      <p className="text-xs text-muted">
        Licensed Guide #{guide.licenseNumber}
      </p>
    </div>
  );
}
