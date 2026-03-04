"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { touristNav } from "@/lib/navigation";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";

export default function TouristLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-surface">
      {/* Desktop top navigation bar */}
      <header className="hidden border-b border-border bg-background md:block">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link
            href="/tourist"
            className="text-sm font-semibold tracking-tight text-foreground"
          >
            Holy Land Tours
          </Link>
          <nav className="flex items-center gap-1">
            {touristNav.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/tourist" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-foreground text-background"
                      : "text-secondary hover:bg-elevated hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Content area */}
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-6">
        {children}
      </main>

      {/* Mobile bottom tab bar */}
      <MobileBottomNav />
    </div>
  );
}
