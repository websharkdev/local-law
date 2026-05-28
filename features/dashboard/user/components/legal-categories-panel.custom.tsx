import { Link } from '@/i18n/routing';
import { LEGAL_CATEGORIES } from '@/features/dashboard/user/data';

const LegalCategoriesPanel = () => {
  return (
    <div className="gap-ds-12 pt-ds-14 flex w-full flex-col">
      <div className="gap-ds-12 flex flex-row items-center">
        <p className="text-ds-18 text-ink/80 flex-1 leading-[120%]">
          Legal <em>Categories</em>
        </p>
        <Link
          href="/laws"
          className="text-ds-14 text-ink/60 leading-[17px] font-medium underline"
        >
          View All
        </Link>
      </div>

      <div className="gap-ds-10 flex flex-col">
        {LEGAL_CATEGORIES.map((category, index) => (
          <div key={category.id} className="gap-ds-10 flex flex-col">
            <Link
              href={category.href}
              className="gap-ds-12 rounded-ds-12 flex flex-row items-center transition-colors"
            >
              <div className="rounded-ds-10 bg-muted p-ds-11 flex shrink-0 items-center">
                <category.icon
                  className="size-ds-20 text-ink/60"
                  strokeWidth={1.5}
                />
              </div>
              <div className="gap-ds-4 flex flex-col">
                <p className="text-ds-14 text-ink leading-[120%]">
                  {category.name}
                </p>
                <p className="text-ds-13 text-ink/40 leading-[120%]">
                  {category.description}
                </p>
              </div>
            </Link>
            {index < LEGAL_CATEGORIES.length - 1 && (
              <div className="bg-app-surface h-px w-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export { LegalCategoriesPanel };
