"use client";

import { useState, useEffect } from "react";
import { MOCK_DELAY } from "@/lib/constants";
import {
  groups,
  leaders,
  tourists,
  itineraries,
  commissions,
  payments,
  notifications,
  checklistItems,
  documents,
  dayLogs,
  operator,
  getGroupById,
  getLeaderById,
  getTouristById,
  getItineraryById,
  getTouristsByGroup,
  getGroupsByLeader,
  getNotificationsByUser,
  getDocumentsByTourist,
  getCommissionsByLeader,
  getPaymentsByGroup,
} from "@/data/mock-data";
import type {
  Group,
  Leader,
  Tourist,
  Itinerary,
  Commission,
  Payment,
  Notification,
  ChecklistItem,
  DocumentRecord,
  DayLog,
  Operator,
} from "@/types";

function useMockFetch<T>(data: T): { data: T | null; loading: boolean } {
  const [state, setState] = useState<{ data: T | null; loading: boolean }>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setState({ data, loading: false });
    }, MOCK_DELAY);
    return () => clearTimeout(timer);
  }, [data]);

  return state;
}

export function useOperator() {
  return useMockFetch<Operator>(operator);
}

export function useGroups() {
  return useMockFetch<Group[]>(groups);
}

export function useGroup(id: string) {
  const group = getGroupById(id);
  return useMockFetch<Group | undefined>(group);
}

export function useLeaders() {
  return useMockFetch<Leader[]>(leaders);
}

export function useLeader(id: string) {
  const leader = getLeaderById(id);
  return useMockFetch<Leader | undefined>(leader);
}

export function useTourists() {
  return useMockFetch<Tourist[]>(tourists);
}

export function useTourist(id: string) {
  const tourist = getTouristById(id);
  return useMockFetch<Tourist | undefined>(tourist);
}

export function useTouristsByGroup(groupId: string) {
  const data = getTouristsByGroup(groupId);
  return useMockFetch<Tourist[]>(data);
}

export function useGroupsByLeader(leaderId: string) {
  const data = getGroupsByLeader(leaderId);
  return useMockFetch<Group[]>(data);
}

export function useItineraries() {
  return useMockFetch<Itinerary[]>(itineraries);
}

export function useItinerary(id: string) {
  const itinerary = getItineraryById(id);
  return useMockFetch<Itinerary | undefined>(itinerary);
}

export function useCommissions() {
  return useMockFetch<Commission[]>(commissions);
}

export function useCommissionsByLeader(leaderId: string) {
  const data = getCommissionsByLeader(leaderId);
  return useMockFetch<Commission[]>(data);
}

export function usePayments() {
  return useMockFetch<Payment[]>(payments);
}

export function usePaymentsByGroup(groupId: string) {
  const data = getPaymentsByGroup(groupId);
  return useMockFetch<Payment[]>(data);
}

export function useNotifications(userId: string) {
  const data = getNotificationsByUser(userId);
  return useMockFetch<Notification[]>(data);
}

export function useAllNotifications() {
  return useMockFetch<Notification[]>(notifications);
}

export function useChecklist() {
  return useMockFetch<ChecklistItem[]>(checklistItems);
}

export function useDocuments(touristId: string) {
  const data = getDocumentsByTourist(touristId);
  return useMockFetch<DocumentRecord[]>(data);
}

export function useAllDocuments() {
  return useMockFetch<DocumentRecord[]>(documents);
}

export function useDayLogs() {
  return useMockFetch<DayLog[]>(dayLogs);
}
