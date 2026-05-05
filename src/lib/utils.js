import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind class names with conflict resolution.
 * @param  {...any} inputs class name fragments
 * @returns {string} merged class string
 */
export const cn = (...inputs) => twMerge(clsx(inputs))
