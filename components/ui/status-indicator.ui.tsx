import { Check, CircleAlert, Clock3, Pencil, X } from 'lucide-react';

import { StatusIcon } from '@/lib/statuses';
import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  icon: StatusIcon;
  className?: string;
}

export const StatusIndicator = ({ icon, className }: StatusIndicatorProps) => {
  if (icon === StatusIcon.Dot) {
    return <span className={cn('h-ds-4 w-ds-4 rounded-full', className)} />;
  }

  const iconClassName = cn('h-ds-12 w-ds-12', className);

  if (icon === StatusIcon.Check)
    return <Check className={iconClassName} strokeWidth={2} />;
  if (icon === StatusIcon.Clock)
    return <Clock3 className={iconClassName} strokeWidth={2} />;
  if (icon === StatusIcon.X)
    return <X className={iconClassName} strokeWidth={2} />;
  if (icon === StatusIcon.Pencil)
    return <Pencil className={iconClassName} strokeWidth={2} />;

  if (icon === StatusIcon.Alert)
    return <CircleAlert className={iconClassName} strokeWidth={2} />;
  return null;
};
