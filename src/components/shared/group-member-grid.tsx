"use client";

import { cn, getInitials } from "@/lib/utils";

interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
}

interface GroupMemberGridProps {
  members: GroupMember[];
  maxDisplay?: number;
  size?: "sm" | "md";
  className?: string;
}

export function GroupMemberGrid({
  members,
  maxDisplay = 8,
  size = "md",
  className,
}: GroupMemberGridProps) {
  const displayed = members.slice(0, maxDisplay);
  const remaining = members.length - maxDisplay;
  const sizeClasses = size === "sm" ? "h-8 w-8 text-[10px]" : "h-10 w-10 text-xs";

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {displayed.map((member) => (
        <div
          key={member.id}
          className={cn(
            "flex items-center justify-center rounded-full bg-elevated text-secondary font-medium",
            sizeClasses
          )}
          title={member.name}
        >
          {getInitials(member.name)}
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-foreground text-background font-medium",
            sizeClasses
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
