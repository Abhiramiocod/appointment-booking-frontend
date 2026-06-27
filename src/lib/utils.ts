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