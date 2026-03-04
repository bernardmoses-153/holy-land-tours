"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { leaderNav } from "@/lib/navigation";

export default function LeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell items={leaderNav} role="leader">
      {children}
    </DashboardShell>
  );
}
