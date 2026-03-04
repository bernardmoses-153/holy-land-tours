"use client";

import { useNotifications } from "@/hooks/use-mock-data";
import { PageHeader, NotificationItem, LoadingSkeleton, EmptyState } from "@/components/shared";
import { Bell, CheckCheck } from "lucide-react";
import { useState } from "react";
import type { Notification } from "@/types";

const TOURIST_ID = "t-1";

export default function NotificationsPage() {
  const { data: notifications, loading } = useNotifications(TOURIST_ID);
  const [markedAllRead, setMarkedAllRead] = useState(false);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48" />
        <LoadingSkeleton variant="card" count={4} />
      </div>
    );
  }

  if (!notifications) return null;

  const displayNotifications: Notification[] = markedAllRead
    ? notifications.map((n) => ({ ...n, read: true }))
    : notifications;

  const unreadCount = displayNotifications.filter((n) => !n.read).length;

  if (notifications.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader title="Notifications" />
        <EmptyState
          icon={Bell}
          title="No notifications yet"
          description="You'll receive updates about your trip here."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description={
          unreadCount > 0
            ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
            : "All caught up!"
        }
      >
        {unreadCount > 0 && (
          <span className="flex items-center justify-center h-6 min-w-6 rounded-full bg-foreground text-background text-xs font-semibold px-2">
            {unreadCount}
          </span>
        )}
      </PageHeader>

      {/* Mark All as Read */}
      {unreadCount > 0 && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setMarkedAllRead(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-border-hover"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Mark all as read
          </button>
        </div>
      )}

      {/* Notification List */}
      <div className="rounded-xl border border-border bg-background overflow-hidden divide-y divide-border">
        {displayNotifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
