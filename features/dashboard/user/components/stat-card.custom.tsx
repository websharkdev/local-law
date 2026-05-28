import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  trendIcon?: LucideIcon;
  label: string;
  value: number;
  trend?: string;
  trendColor: string;
}

const StatCard = ({
  icon: Icon,
  trendIcon: TrendIcon,
  trendColor: TrendColor,
  label,
  value,
  trend,
}: StatCardProps) => {
  return (
    <div className="gap-ds-12 flex flex-row items-start">
      <div className="rounded-ds-12 bg-app-surface size-ds-64 flex shrink-0 items-center justify-center">
        <Icon className="size-ds-24 text-primary" strokeWidth={1.5} />
      </div>
      <div className="gap-ds-12 flex flex-col">
        <p className="text-ds-14 text-ink/40 leading-[120%]">{label}</p>
        <div className="gap-ds-6 flex flex-row items-center">
          <span className="text-ds-32 text-ink leading-[100%]">{value}</span>
          {trend ? (
            <div className="gap-ds-4 pt-ds-13 flex flex-row items-center">
              {TrendIcon && (
                <TrendIcon
                  className={cn('size-ds-14', TrendColor)}
                  strokeWidth={1.5}
                />
              )}
              <span className={cn('text-ds-14 leading-[17px]', TrendColor)}>
                {trend}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { StatCard };
