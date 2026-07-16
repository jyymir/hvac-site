import { clsx, type ClassValue } from "clsx";

/** Thin wrapper around clsx so call sites read `cn(...)` like shadcn/ui conventions. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
