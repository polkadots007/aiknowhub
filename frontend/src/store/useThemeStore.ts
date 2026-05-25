import { create } from 'zustand'
import { persist } from "zustand/middleware"
import { type ThemeState } from '../types'

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
    isDarkTheme: false,
      setTheme: (isDark: boolean) =>
        set({
          isDarkTheme: isDark,
        }),
}),{
    name: "theme-storage",
    partialize: (state) => ({
      isDarkTheme: state.isDarkTheme
    }),
}))
