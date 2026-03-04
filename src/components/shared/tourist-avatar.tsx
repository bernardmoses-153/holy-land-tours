import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";

interface TouristAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
} as const;

export function TouristAvatar({ name, size = "md" }: TouristAvatarProps) {
  const initials = getInitials(name);

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-foreground text-background font-medium shrink-0",
        sizeStyles[size]
      )}
      title={name}
    >
      {initials}
    </div>
  );
}
