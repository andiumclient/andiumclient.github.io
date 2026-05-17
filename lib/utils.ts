import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Shared cubic-bezier matches design brief
export const EASE = [0.22, 1, 0.36, 1] as const;
