import { Skeleton } from '@/components/ui/skeleton.ui';
import { cn } from '@/lib/utils';

interface SkeletonRowProps {
  lines?: 1 | 2;
  hasLeading?: boolean;
  hasTrailing?: boolean;
  className?: string;
}

export const SkeletonRow = ({
  lines = 1,
  hasLeading = false,
  hasTrailing = false,
  className,
}: SkeletonRowProps) => (
  <div className={cn('gap-ds-12 py-ds-10 flex items-center', className)}>
    {hasLeading ? (
      <Skeleton className="size-ds-32 rounded-ds-8 shrink-0" />
    ) : null}
    <div className="gap-ds-6 flex flex-1 flex-col">
      <Skeleton className="h-ds-22 max-w-ds-240 w-4/5" />
      {lines === 2 ? <Skeleton className="h-ds-18 w-3/5" /> : null}
    </div>
    {hasTrailing ? <Skeleton className="h-ds-22 w-ds-64 shrink-0" /> : null}
  </div>
);
