import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Theme Configuration
export const theme = {
  light: {
    background: "#F5F5F5",
    surface: "#FFFFFF",
    primary: "#1F7A3D",
    secondary: "#2E5DA0",
    danger: "#C0392B",
    textPrimary: "#1A1A1A",
    textSecondary: "#555555",
    border: "#E0E0E0",
    ecoTipBorder: "#F5A623",
    top3Highlight: "#FFF8E1",
  },
  dark: {
    background: "#121212",
    surface: "#1E1E1E",
    primary: "#2ECC71",
    secondary: "#5B9BD5",
    danger: "#E74C3C",
    textPrimary: "#F0F0F0",
    textSecondary: "#AAAAAA",
    border: "#2E2E2E",
    ecoTipBorder: "#F5A623",
    top3Highlight: "#2A2500",
  },
};

export type ThemeMode = "light" | "dark";

export const getTheme = (mode: ThemeMode) => theme[mode];
