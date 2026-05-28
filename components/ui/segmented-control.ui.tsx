'use client';

import { Button } from '@/components/ui/button.ui';
import { cn } from '@/lib/utils';

export interface SegmentedOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedControlProps {
  options: SegmentedOption[];
  value: string;
  onChange: (id: string) => void;
  size?: 'sm' | 'md';
  className?: string;
}

export const SegmentedControl = ({
  options,
  value,
  onChange,
  size = 'md',
  className,
}: SegmentedControlProps) => (
  <div
    className={cn(
      'flex items-center',
      size === 'sm' ? 'h-ds-32' : 'h-ds-40',
      className,
    )}
  >
    {options.map((option) => {
      const isActive = value === option.id;

      return (
        <Button
          key={option.id}
          type="button"
          variant="ghost"
          disableScale
          onClick={() => onChange(option.id)}
          className={cn(
            'rounded-ds-10 text-ds-14 text-ink-60 hover:bg-primary/8 hover:text-primary',
            size === 'sm' ? 'h-ds-32 px-ds-12' : 'h-ds-40 px-ds-16',
            isActive && 'bg-primary/8 text-primary font-medium',
            !isActive && 'font-normal',
          )}
        >
          {option.icon ? <span className="mr-ds-6">{option.icon}</span> : null}
          {option.label}
        </Button>
      );
    })}
  </div>
);
