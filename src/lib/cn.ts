import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge class names, handling conditional classes and Tailwind CSS optimizations.
 * @param inputs An array of class values, which can include strings, objects, or arrays.
 * @returns A single string of merged class names, optimized for Tailwind CSS.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
