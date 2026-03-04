"use client";

import React from "react";
import { SidebarProvider } from "@/context/sidebar-context";
import { TourModeProvider } from "@/context/tour-mode-context";
import { useAuth } from "@/context/auth-context";
import type { Role } from "@/types";

const roles: Role[] = ["operator", "leader", "tourist"];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role, switchRole } = useAuth();

  return (
    <SidebarProvider>
      <TourModeProvider>
        {children}

        {/* Dev role-switching toolbar */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-background px-2 py-1 shadow-lg">
            <span className="px-2 text-[10px] font-medium uppercase tracking-wider text-muted">
              DEV
            </span>
            {roles.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => switchRole(r)}
                className={
                  role === r
                    ? "rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background"
                    : "rounded-full px-3 py-1 text-xs font-medium text-secondary hover:bg-elevated hover:text-foreground"
                }
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </TourModeProvider>
    </SidebarProvider>
  );
}
