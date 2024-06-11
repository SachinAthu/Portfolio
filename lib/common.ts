import { clsx, ClassArray } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...classes: ClassArray) {
  return twMerge(clsx(classes));
}

export function truncateText(value: string, limit: number) {
  if (!value || !limit || value.length <= limit) {
    return value;
  }

  return value.slice(0, limit) + '...';
}
