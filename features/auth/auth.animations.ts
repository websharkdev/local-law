import {
  EASE_BACK_OUT,
  EASE_EXPO_IN_OUT,
  EASE_EXPO_OUT,
  EASE_MAGNETIC,
  EASE_SILK,
} from '@/lib/animations.lib';

// Left panel: form page transition (route change fade)
export const AUTH_FORM_PAGE_VARIANTS = {
  initial: {
    opacity: 0,
    y: 'var(--ds-12)',
    scale: 0.992,
    filter: 'blur(var(--ds-4))',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0)',
    transition: {
      duration: 0.34,
      ease: EASE_SILK,
      opacity: { duration: 0.22, ease: EASE_EXPO_OUT },
      filter: { duration: 0.24, ease: EASE_EXPO_OUT },
    },
  },
  exit: {
    opacity: 0,
    y: 'calc(var(--ds-8) * -1)',
    scale: 0.996,
    filter: 'blur(var(--ds-3))',
    transition: {
      duration: 0.18,
      ease: EASE_EXPO_OUT,
      opacity: { duration: 0.14, ease: EASE_EXPO_OUT },
      filter: { duration: 0.14, ease: EASE_EXPO_OUT },
    },
  },
} as const;

// Right panel: logo entry on mount
export const AUTH_LOGO_REVEAL = {
  initial: { opacity: 0, y: 'var(--ds-24)', filter: 'blur(var(--ds-4))' },
  animate: { opacity: 1, y: 0, filter: 'blur(0)' },
  transition: { duration: 0.6, ease: EASE_MAGNETIC, delay: 0.05 },
} as const;

// Right panel: marketing copy that changes with route/role
export const AUTH_COPY_REVEAL = {
  initial: { opacity: 0, y: 'var(--ds-28)', filter: 'blur(var(--ds-6))' },
  animate: { opacity: 1, y: 0, filter: 'blur(0)' },
  exit: {
    opacity: 0,
    y: 'calc(-1 * var(--ds-16))',
    filter: 'blur(var(--ds-4))',
  },
  transition: {
    duration: 0.6,
    ease: EASE_BACK_OUT,
    opacity: { duration: 0.3, ease: EASE_EXPO_OUT },
    filter: { duration: 0.4 },
  },
} as const;

// Right panel: horizontal divider line that scales in from the left
export const AUTH_DIVIDER_REVEAL = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  transition: { duration: 0.8, ease: EASE_EXPO_IN_OUT, delay: 0.15 },
} as const;

// Right panel: company logos row at the bottom
export const AUTH_LOGOS_REVEAL = {
  initial: { opacity: 0, y: 'var(--ds-12)' },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE_SILK, delay: 0.3 },
} as const;
