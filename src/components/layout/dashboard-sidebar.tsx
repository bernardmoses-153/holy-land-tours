"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/sidebar-context";
import type { NavItem } from "@/lib/navigation";

interface DashboardSidebarProps {
  items: NavItem[];
  role: string;
}

export function DashboardSidebar({ items, role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { isCollapsed, toggleCollapse } = useSidebar();

  return (
    <aside
      className={cn(
        "hidden h-screen flex-col border-r border-border bg-background transition-all duration-200 lg:flex",
        isCollapsed ? "w-[68px]" : "w-[280px]"
      )}
    >
      {/* Header with logo and role badge */}
      <div className="flex h-16 items-center border-b border-border px-4">
        {!isCollapsed && (
          <div className="flex flex-1 items-center gap-3">
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Holy Land Tours
            </span>
            <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-background">
              {role}
            </span>
          </div>
        )}
        {isCollapsed && (
          <span className="mx-auto text-sm font-bold text-foreground">HLT</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== `/${role}` && pathname.startsWith(item.href + "/"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-foreground text-background"
                  : "text-secondary hover:bg-elevated hover:text-foreground",
                isCollapsed && "justify-center px-2"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={toggleCollapse}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-secondary transition-colors hover:bg-elevated hover:text-foreground"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronsLeft className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
