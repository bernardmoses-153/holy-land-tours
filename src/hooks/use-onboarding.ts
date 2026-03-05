"use client";

import { useState, useEffect, useCallback } from "react";
import type { LeaderOnboardingData, TouristOnboardingData } from "@/types";

const LEADER_STORAGE_KEY = "leader-onboarding";
const TOURIST_STORAGE_KEY = "tourist-onboarding";

const defaultLeaderData: LeaderOnboardingData = {
  step: 1,
  personalInfo: { name: "", title: "", phone: "" },
  organizationInfo: { name: "", type: "", estimatedSize: "", website: "" },
  tourPreferences: { itineraryId: "", season: "", style: [], notes: "" },
  groupSetup: { name: "", description: "", inviteMessage: "" },
  completed: false,
};

const defaultTouristData: TouristOnboardingData = {
  step: 1,
  groupSlug: "",
  personalInfo: { dob: "", passportNumber: "", passportExpiry: "" },
  emergencyContact: { name: "", phone: "", relationship: "" },
  preferences: { dietary: [], mobility: "", room: "double", roommate: "" },
  depositPaid: false,
  completed: false,
};

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored) as T;
  } catch {
    // ignore parse errors
  }
  return fallback;
}

export function useLeaderOnboarding() {
  const [data, setData] = useState<LeaderOnboardingData>(() =>
    loadFromStorage(LEADER_STORAGE_KEY, defaultLeaderData)
  );

  useEffect(() => {
    localStorage.setItem(LEADER_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = useCallback((updates: Partial<LeaderOnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const updatePersonalInfo = useCallback((updates: Partial<LeaderOnboardingData["personalInfo"]>) => {
    setData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, ...updates } }));
  }, []);

  const updateOrganizationInfo = useCallback((updates: Partial<LeaderOnboardingData["organizationInfo"]>) => {
    setData((prev) => ({ ...prev, organizationInfo: { ...prev.organizationInfo, ...updates } }));
  }, []);

  const updateTourPreferences = useCallback((updates: Partial<LeaderOnboardingData["tourPreferences"]>) => {
    setData((prev) => ({ ...prev, tourPreferences: { ...prev.tourPreferences, ...updates } }));
  }, []);

  const updateGroupSetup = useCallback((updates: Partial<LeaderOnboardingData["groupSetup"]>) => {
    setData((prev) => ({ ...prev, groupSetup: { ...prev.groupSetup, ...updates } }));
  }, []);

  const nextStep = useCallback(() => {
    setData((prev) => ({ ...prev, step: Math.min(prev.step + 1, 5) }));
  }, []);

  const prevStep = useCallback(() => {
    setData((prev) => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
  }, []);

  const complete = useCallback(() => {
    setData((prev) => ({ ...prev, completed: true }));
    localStorage.removeItem(LEADER_STORAGE_KEY);
  }, []);

  const reset = useCallback(() => {
    setData(defaultLeaderData);
    localStorage.removeItem(LEADER_STORAGE_KEY);
  }, []);

  return {
    data,
    updateData,
    updatePersonalInfo,
    updateOrganizationInfo,
    updateTourPreferences,
    updateGroupSetup,
    nextStep,
    prevStep,
    complete,
    reset,
  };
}

export function useTouristOnboarding() {
  const [data, setData] = useState<TouristOnboardingData>(() =>
    loadFromStorage(TOURIST_STORAGE_KEY, defaultTouristData)
  );

  useEffect(() => {
    localStorage.setItem(TOURIST_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = useCallback((updates: Partial<TouristOnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const updatePersonalInfo = useCallback((updates: Partial<TouristOnboardingData["personalInfo"]>) => {
    setData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, ...updates } }));
  }, []);

  const updateEmergencyContact = useCallback((updates: Partial<TouristOnboardingData["emergencyContact"]>) => {
    setData((prev) => ({ ...prev, emergencyContact: { ...prev.emergencyContact, ...updates } }));
  }, []);

  const updatePreferences = useCallback((updates: Partial<TouristOnboardingData["preferences"]>) => {
    setData((prev) => ({ ...prev, preferences: { ...prev.preferences, ...updates } }));
  }, []);

  const nextStep = useCallback(() => {
    setData((prev) => ({ ...prev, step: Math.min(prev.step + 1, 5) }));
  }, []);

  const prevStep = useCallback(() => {
    setData((prev) => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
  }, []);

  const complete = useCallback(() => {
    setData((prev) => ({ ...prev, completed: true }));
    localStorage.removeItem(TOURIST_STORAGE_KEY);
  }, []);

  const reset = useCallback(() => {
    setData(defaultTouristData);
    localStorage.removeItem(TOURIST_STORAGE_KEY);
  }, []);

  return {
    data,
    updateData,
    updatePersonalInfo,
    updateEmergencyContact,
    updatePreferences,
    nextStep,
    prevStep,
    complete,
    reset,
  };
}
