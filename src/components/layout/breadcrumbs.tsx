import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={`${item.label}-${index}`}>
            {index > 0 && (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted" />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={cn(
                  "text-secondary transition-colors hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  isLast ? "font-medium text-foreground" : "text-secondary"
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
