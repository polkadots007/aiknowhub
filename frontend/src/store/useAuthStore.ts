import { create } from "zustand";


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  initialized: false,
  session: null,
  isAuthLoading: false,
  setAuthLoading: (authStatus: boolean) => set({ isAuthLoading : authStatus }),
  login: (user: User | null) => set({ user }),
  logout: () => set({ user: null }),
}));