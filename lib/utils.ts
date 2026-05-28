import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const DESIGN_SYSTEM_VALUE_PATTERN = /^ds-\d+$/;
const DESIGN_SYSTEM_CLASS_GROUPS = [
  'm',
  'mx',
  'my',
  'mt',
  'mr',
  'mb',
  'ml',
  'p',
  'px',
  'py',
  'pt',
  'pr',
  'pb',
  'pl',
  'gap',
  'gap-x',
  'gap-y',
  'size',
  'w',
  'h',
  'min-w',
  'min-h',
  'max-w',
  'max-h',
  'inset',
  'top',
  'right',
  'bottom',
  'left',
  'rounded',
  'rounded-t',
  'rounded-r',
  'rounded-b',
  'rounded-l',
  'leading',
  'space-x',
  'space-y',
  'scroll-m',
  'scroll-mx',
  'scroll-my',
  'scroll-mt',
  'scroll-mr',
  'scroll-mb',
  'scroll-ml',
  'scroll-p',
  'scroll-px',
  'scroll-py',
  'scroll-pt',
  'scroll-pr',
  'scroll-pb',
  'scroll-pl',
] as const;

const isDesignSystemValue = (value: string) =>
  DESIGN_SYSTEM_VALUE_PATTERN.test(value);

const designSystemClassGroups = Object.fromEntries(
  DESIGN_SYSTEM_CLASS_GROUPS.map((group) => [
    group,
    [{ [group]: [isDesignSystemValue] }],
  ]),
);

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      ...designSystemClassGroups,
      'font-size': [{ text: [isDesignSystemValue] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
