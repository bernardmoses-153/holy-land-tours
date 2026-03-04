"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
}: ConfirmDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/40" />

      {/* Dialog */}
      <div className="relative bg-background border border-border rounded-lg shadow-lg w-full max-w-md mx-4 p-6 animate-fade-in">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-secondary">{description}</p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground",
              "hover:bg-surface transition-colors",
              "focus-ring"
            )}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={cn(
              "rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium",
              "hover:opacity-90 transition-opacity",
              "focus-ring"
            )}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
