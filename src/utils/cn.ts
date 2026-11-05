import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Teach tailwind-merge about pearkit's custom font-size scale so
 * `cn('text-body', 'text-title')` resolves to `text-title` instead of keeping
 * both (and `text-title text-muted` keeps both, since one is a colour).
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['overline', 'micro', 'caption', 'label', 'body-sm', 'body', 'body-lg', 'title', 'display'] }],
    },
  },
});

/** Merge class names, letting later classes win. Every component accepts `className` through this. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
