import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function DesignColors() {
  const C = {
  primary: "#4648d4",
  primaryContainer: "#6063ee",
  onPrimary: "#ffffff",
  onPrimaryContainer: "#fffbff",
  surface: "#fcf8ff",
  surfaceLow: "#f5f2fe",
  surfaceContainer: "#efecf8",
  surfaceContainerLowest: "#ffffff",
  onSurface: "#1b1b23",
  onSurfaceVariant: "#464554",
  outlineVariant: "#c7c4d7",
  outline: "#767586",
  secondary: "#565e74",
  tertiary: "#904900",
  tertiaryContainer: "#b55d00",
  inverseOnSurface: "#f2effb",
  inverseSurface: "#303038",
  surfaceContainerHighest: "#e4e1ed",
};

 return C;
}

export const Colors = {
  primary: "#4648d4",
  primaryContainer: "#6063ee",
  onPrimary: "#ffffff",
  surface: "#fcf8ff",
  surfaceContainerLow: "#f5f2fe",
  surfaceContainer: "#efecf8",
  onSurface: "#1b1b23",
  onSurfaceVariant: "#464554",
  outlineVariant: "#c7c4d7",
  background: "#fcf8ff",
  surfaceContainerHigh: "#e9e6f3",
  surfaceContainerHighest: "#e4e1ed",
  secondaryContainer: "#dae2fd",
  error: "#ba1a1a",
  outline: "#767586",
  errorContainer: "#ffdad6",
  onErrorContainer: "#93000a",
  inverseSurface: "#303038",
  inverseOnSurface: "#f2effb",
};

export const statusStyles = {
    Confirmed: { bg: "#dcfce7", text: "#15803d", dot: "#22c55e" },
    Pending: { bg: "#fef3c7", text: "#b45309", dot: "#f59e0b" },
    Completed: { bg: "#e0e7ff", text: "#3730a3", dot: "#6366f1" },
    Cancelled: { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
  };