import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) => (
  <div
    className={cn(
      'gap-ds-12 py-ds-32 flex flex-col items-center text-center',
      className,
    )}
  >
    <span className="text-ink-30 flex items-center justify-center">{icon}</span>
    <div className="gap-ds-4 flex flex-col">
      <p className="text-ds-16 text-ink leading-[1.4] font-medium">{title}</p>
      {description ? (
        <p className="text-ds-14 text-ink-60 leading-[1.4]">{description}</p>
      ) : null}
    </div>
    {action ?? null}
  </div>
);
