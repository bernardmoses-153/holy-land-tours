"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CelebrationOverlayProps {
  show: boolean;
  className?: string;
}

const CONFETTI_COLORS = [
  "#C4972A", // gold
  "#2E7DAF", // sky
  "#5A7A3A", // olive
  "#C4A55A", // sand
  "#3D6B50", // success
  "#8B6D2C", // warning
];

export function CelebrationOverlay({ show, className }: CelebrationOverlayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-50 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {Array.from({ length: 40 }, (_, i) => {
        const color =
          CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        const left = Math.random() * 100;
        const delay = Math.random() * 1.5;
        const size = 6 + Math.random() * 8;
        const duration = 2 + Math.random() * 2;

        return (
          <div
            key={i}
            className="absolute top-0"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size * 0.6}px`,
              backgroundColor: color,
              borderRadius: "2px",
              animation: `confetti-fall ${duration}s ease-in-out ${delay}s forwards`,
              opacity: 0.9,
            }}
          />
        );
      })}
    </div>
  );
}
