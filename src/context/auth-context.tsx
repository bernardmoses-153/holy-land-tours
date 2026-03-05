"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { Role, User } from "@/types";
import { operator, leaders, tourists } from "@/data/mock-data";

interface AuthContextType {
  user: User | null;
  role: Role | null;
  isAuthenticated: boolean;
  onboardingComplete: boolean;
  login: (role: Role) => void;
  logout: () => void;
  switchRole: (role: Role) => void;
  joinGroup: (groupId: string) => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<Role, User> = {
  operator: operator,
  leader: leaders[0],
  tourist: tourists[0],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUsers.operator);
  const [role, setRole] = useState<Role | null>("operator");
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const login = useCallback((newRole: Role) => {
    setUser(mockUsers[newRole]);
    setRole(newRole);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setRole(null);
    setOnboardingComplete(false);
  }, []);

  const switchRole = useCallback((newRole: Role) => {
    setUser(mockUsers[newRole]);
    setRole(newRole);
  }, []);

  const joinGroup = useCallback((groupId: string) => {
    // In a real app, this would associate the user with the group
    // For now, we just set the role to tourist
    setUser(mockUsers.tourist);
    setRole("tourist");
  }, []);

  const completeOnboarding = useCallback(() => {
    setOnboardingComplete(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        onboardingComplete,
        login,
        logout,
        switchRole,
        joinGroup,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
