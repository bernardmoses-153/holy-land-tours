"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { operatorNav } from "@/lib/navigation";

export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell items={operatorNav} role="operator">
      {children}
    </DashboardShell>
  );
}
