'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'cursor-pointer! disabled:cursor-not-allowed group/button relative inline-flex shrink-0 items-center justify-center gap-ds-8 overflow-hidden rounded-ds-12 border border-transparent bg-clip-padding text-ds-16 font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-primary/5 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary-dark',
        default: 'bg-primary text-primary-foreground hover:bg-primary-dark',
        soft: 'bg-primary/8 text-primary hover:bg-primary/12',
        muted: 'bg-ink/5 text-ink hover:bg-ink/8',
        outline: 'border-border bg-card text-card-foreground hover:bg-muted',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-muted hover:text-foreground',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-ds-46 px-ds-25 py-ds-11',
        xs: 'h-ds-24 px-ds-8 text-ds-12',
        sm: 'h-ds-32 px-ds-12 text-ds-14',
        lg: 'h-ds-56 px-ds-32 text-ds-18',
        icon: 'size-ds-46',
        xsIcon: 'size-ds-24! p-ds-0!',
        'icon-sm': 'size-ds-36 p-ds-0',
        'icon-lg': 'size-ds-56 p-ds-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    disableScale?: boolean;
  };

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  isLoading = false,
  disableScale: _disableScale,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  const isDisabled = disabled || isLoading;

  void _disableScale;

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <Loader2 aria-hidden="true" className="size-ds-20 animate-spin" />
      ) : null}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants, type ButtonProps };
