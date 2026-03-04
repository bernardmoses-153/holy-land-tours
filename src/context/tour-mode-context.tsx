"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface TourModeContextType {
  isActive: boolean;
  currentDay: number;
  totalDays: number;
  activate: (totalDays: number) => void;
  deactivate: () => void;
  setDay: (day: number) => void;
  nextDay: () => void;
  prevDay: () => void;
}

const TourModeContext = createContext<TourModeContextType | undefined>(undefined);

export function TourModeProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [totalDays, setTotalDays] = useState(8);

  const activate = useCallback((days: number) => {
    setTotalDays(days);
    setCurrentDay(1);
    setIsActive(true);
  }, []);

  const deactivate = useCallback(() => {
    setIsActive(false);
  }, []);

  const setDay = useCallback((day: number) => {
    setCurrentDay(day);
  }, []);

  const nextDay = useCallback(() => {
    setCurrentDay((prev) => Math.min(prev + 1, totalDays));
  }, [totalDays]);

  const prevDay = useCallback(() => {
    setCurrentDay((prev) => Math.max(prev - 1, 1));
  }, []);

  return (
    <TourModeContext.Provider
      value={{ isActive, currentDay, totalDays, activate, deactivate, setDay, nextDay, prevDay }}
    >
      {children}
    </TourModeContext.Provider>
  );
}

export function useTourMode() {
  const context = useContext(TourModeContext);
  if (context === undefined) {
    throw new Error("useTourMode must be used within a TourModeProvider");
  }
  return context;
}
