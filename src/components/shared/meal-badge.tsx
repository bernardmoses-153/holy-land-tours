import { cn } from "@/lib/utils";
import { Coffee, UtensilsCrossed, Wine } from "lucide-react";

interface MealBadgeProps {
  meal: "breakfast" | "lunch" | "dinner";
}

const mealConfig = {
  breakfast: { icon: Coffee, label: "Breakfast" },
  lunch: { icon: UtensilsCrossed, label: "Lunch" },
  dinner: { icon: Wine, label: "Dinner" },
} as const;

export function MealBadge({ meal }: MealBadgeProps) {
  const config = mealConfig[meal];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-elevated px-2 py-0.5 text-xs text-secondary"
      )}
      title={config.label}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
