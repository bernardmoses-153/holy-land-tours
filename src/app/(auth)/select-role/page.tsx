"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building, UserCheck, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import type { Role } from "@/types";

const roles: {
  id: Role;
  title: string;
  description: string;
  icon: typeof Building;
  href: string;
}[] = [
  {
    id: "operator",
    title: "Tour Operator",
    description:
      "Manage tours, groups, and revenue from a powerful dashboard.",
    icon: Building,
    href: "/operator",
  },
  {
    id: "leader",
    title: "Group Leader",
    description:
      "Recruit travelers, earn commissions, and lead unforgettable journeys.",
    icon: UserCheck,
    href: "/leader",
  },
  {
    id: "tourist",
    title: "Tourist",
    description:
      "Book your pilgrimage, track your trip, and enjoy AI-guided tours.",
    icon: Compass,
    href: "/tourist",
  },
];

export default function SelectRolePage() {
  const router = useRouter();
  const { login } = useAuth();
  const [selected, setSelected] = useState<Role | null>(null);

  function handleContinue() {
    if (!selected) return;
    const role = roles.find((r) => r.id === selected);
    if (!role) return;
    login(selected);
    router.push(role.href);
  }

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Almost there!
        </h1>
        <p className="text-sm text-muted">
          Choose how you&apos;ll use Holy Land Tours
        </p>
      </div>

      <div className="grid gap-3">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selected === role.id;

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => setSelected(role.id)}
              className={cn(
                "flex items-start gap-4 rounded-lg border bg-background p-4 text-left transition-all",
                isSelected
                  ? "border-foreground bg-surface shadow-sm"
                  : "border-border hover:border-border-hover hover:shadow-sm"
              )}
            >
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-elevated">
                <Icon className="h-5 w-5 text-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  {role.title}
                </p>
                <p className="text-sm text-muted">{role.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!selected}
        onClick={handleContinue}
        className={cn(
          "w-full rounded-lg px-4 py-3 text-sm font-medium transition-opacity",
          selected
            ? "bg-foreground text-background hover:opacity-90"
            : "cursor-not-allowed bg-elevated text-muted"
        )}
      >
        Continue
      </button>
    </div>
  );
}
