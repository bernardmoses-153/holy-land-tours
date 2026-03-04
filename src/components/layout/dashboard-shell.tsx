"use client";

import React from "react";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopbar } from "./dashboard-topbar";
import { MobileNav } from "./mobile-nav";
import type { NavItem } from "@/lib/navigation";

interface DashboardShellProps {
  children: React.ReactNode;
  items: NavItem[];
  role: string;
}

export function DashboardShell({ children, items, role }: DashboardShellProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <DashboardSidebar items={items} role={role} />

      {/* Mobile sidebar drawer */}
      <MobileNav items={items} role={role} />

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto bg-surface p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
