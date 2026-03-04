import { cn } from "@/lib/utils";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && (
        <div className="mb-4 rounded-full bg-elevated p-4">
          <Icon className="h-8 w-8 text-muted" />
        </div>
      )}
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted max-w-sm">{description}</p>
      {action && (
        <Link
          href={action.href}
          className={cn(
            "mt-6 inline-flex items-center justify-center rounded-lg",
            "bg-foreground text-background",
            "px-4 py-2 text-sm font-medium",
            "hover:opacity-90 transition-opacity",
            "focus-ring"
          )}
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
