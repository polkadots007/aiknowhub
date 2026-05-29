import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import type { AuthState } from "../types";


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  initialized: false,
  session: null,
  isAuthLoading: false,
  setAuthLoading: (authStatus: boolean) => set({ isAuthLoading : authStatus }),
  login: (
    user: User | null,
    session: Session | null
  ) =>
    set({
      user,
      session,
      initialized: true,
    }),

  logout: () =>
    set({
      user: null,
      session: null,
    }),
}));