import { ArrowUpRight } from 'lucide-react';

import { Link } from '@/i18n/routing';
import { TRENDING_QUESTIONS } from '@/features/dashboard/user/data';
import { cn } from '@/lib/utils';

const BAR_OPACITY = [
  'bg-primary/60',
  'bg-primary/40',
  'bg-primary/20',
  'bg-primary/10',
] as const;

const TrendingQuestionsPanel = () => {
  return (
    <div className="rounded-ds-20 p-ds-16 bg-app-surface">
      <p className="mb-ds-12 text-ds-18 text-ink/80 leading-[120%] italic">
        Trending <span className="not-italic">questions</span>
      </p>

      <div className="gap-ds-10 flex flex-col">
        {TRENDING_QUESTIONS.map((question, index) => (
          <div key={question.id} className="gap-ds-10 flex flex-col">
            {index === TRENDING_QUESTIONS.length - 1 && (
              <div className="bg-ink/5 h-px w-full" />
            )}
            <Link
              href={question.href}
              className={cn(
                'group gap-ds-8 flex flex-row items-center',
                question.hasExternalLink && 'rounded-ds-10 bg-card p-ds-12',
              )}
            >
              <span
                className={cn(
                  'h-ds-16 w-[1.5px] shrink-0 rounded-full',
                  BAR_OPACITY[index] ?? 'bg-primary/10',
                )}
              />
              <span className="text-ds-14 text-ink group-hover:text-primary flex-1 leading-[120%]">
                {question.text}
              </span>
              {question.hasExternalLink && (
                <ArrowUpRight
                  className="size-ds-18 text-ink/40 group-hover:text-primary shrink-0"
                  strokeWidth={1.5}
                />
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export { TrendingQuestionsPanel };
