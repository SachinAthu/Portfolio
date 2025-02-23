import { clsx, ClassArray } from 'clsx';
import { twMerge } from 'tailwind-merge';
import DOMPurify from 'isomorphic-dompurify';

export function cn(...classes: ClassArray) {
  return twMerge(clsx(classes));
}

export function truncateText(value: string, limit: number) {
  if (!value || !limit || value.length <= limit) {
    return value;
  }

  return value.slice(0, limit) + '...';
}

export function getAnimGridSize(vw: number) {
  let grid = { cols: 16, rows: 10 };

  if (vw > 3840) {
    // 8k
    grid = { cols: 64, rows: 40 };
  } else if (vw > 2560) {
    // 4k
    grid = { cols: 32, rows: 20 };
  } else if (vw > 1920) {
    // 2k
    grid = { cols: 22, rows: 14 };
  } else if (vw > 1024) {
    // 1080P
    grid = { cols: 16, rows: 10 };
  } else if (vw > 768) {
    // tab
    grid = { cols: 10, rows: 10 };
  } else {
    // mobile
    grid = { cols: 6, rows: 10 };
  }

  return grid;
}

export function isSanitized(value: string) {
  if (!value) return false;

  const sanitizedValue = DOMPurify.sanitize(value);

  if (sanitizedValue && value.length === sanitizedValue.length) {
    return true;
  } else {
    return false;
  }
}
