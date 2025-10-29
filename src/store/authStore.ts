import { BaseState } from "./types";
import { User } from "@/types/auth";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  email: string;
  headerText: string | null;
  currentCard: "sign-in" | "sign-up" | "verify-token";
};

type AuthActions = {
  setCards: (cards: "sign-in" | "sign-up" | "verify-token" | null) => void;
  resetCards: () => void;
  setAuth: (user: User | null) => void;
  clearAuth: () => void;
  setEmail: (email: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

export type AuthStore = BaseState & AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  currentCard: "sign-in",
  email: "",
  headerText: "Sign in/Sign up",
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      status: "idle",
      error: null,
      setAuth: (user: User | null) =>
        set({
          user,
          isAuthenticated: !!user,
          status: user ? "success" : "idle",
          error: null,
        }),

      clearAuth: () =>
        set({
          user: null,
          isAuthenticated: false,
          status: "idle",
          error: null,
          email: "",
        }),

      setCards: (cards: "sign-in" | "sign-up" | "verify-token" | null) =>
        set({
          currentCard: cards || "sign-in",
        }),

      resetCards: () =>
        set({
          currentCard: "sign-in",
          headerText: "Sign in/Sign up",
        }),

      setEmail: (email: string) =>
        set({
          email,
        }),

      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({
          isAuthenticated,
        }),
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
