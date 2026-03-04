"use client";

import React from "react";
import { Bell, Menu, User } from "lucide-react";
import { useSidebar } from "@/context/sidebar-context";
import { useAuth } from "@/context/auth-context";
import { getInitials } from "@/lib/utils";

export function DashboardTopbar() {
  const { toggle } = useSidebar();
  const { user } = useAuth();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-4 lg:px-6">
      {/* Left: hamburger (mobile) + breadcrumbs area */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="inline-flex items-center justify-center rounded-lg p-2 text-secondary transition-colors hover:bg-elevated hover:text-foreground lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        {/* Breadcrumbs slot - rendered by page via portal or direct placement */}
        <div id="breadcrumbs-slot" />
      </div>

      {/* Right: notifications + avatar */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="relative inline-flex items-center justify-center rounded-lg p-2 text-secondary transition-colors hover:bg-elevated hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-foreground" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-elevated"
          aria-label="User menu"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
            {user ? (
              <span className="text-xs font-medium">
                {getInitials(user.name)}
              </span>
            ) : (
              <User className="h-4 w-4" />
            )}
          </div>
        </button>
      </div>
    </header>
  );
}
