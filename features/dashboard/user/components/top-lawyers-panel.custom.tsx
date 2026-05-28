import { Link } from '@/i18n/routing';
import { AvatarDisplay } from '@/components/ui/avatar.ui';
import { TOP_LAWYERS } from '@/features/dashboard/user/data';

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

const TopLawyersPanel = () => {
  return (
    <div className="rounded-ds-20 p-ds-14 bg-app-surface">
      <div className="mb-ds-20 gap-ds-12 flex flex-row items-center">
        <p className="text-ds-18 text-ink/80 flex-1 leading-[120%] italic">
          Top <span className="not-italic">Lawyers</span>
        </p>
        <Link
          href="/lawyers"
          className="text-ds-14 text-ink/60 leading-[17px] font-medium underline"
        >
          View All
        </Link>
      </div>

      <div className="gap-ds-8 flex flex-col">
        {TOP_LAWYERS.map((lawyer) => (
          <Link
            key={lawyer.id}
            href={`/lawyers/${lawyer.id}`}
            className="gap-ds-12 rounded-ds-12 border-ink/5 px-ds-12 py-ds-12 hover:bg-card flex flex-row items-start border transition-colors"
          >
            <AvatarDisplay
              alt={lawyer.name}
              fallback={getInitials(lawyer.name)}
              src={lawyer.avatarUrl}
              className="size-ds-32 ring-primary/40 shrink-0 rounded-full ring-1"
              imageClassName="rounded-full"
              fallbackClassName="rounded-full text-ds-12"
            />
            <div className="gap-ds-2 flex flex-1 flex-col overflow-hidden">
              <div className="gap-ds-8 flex flex-row items-center">
                <p className="text-ds-14 text-ink flex-1 truncate leading-[120%]">
                  {lawyer.name}
                </p>
                <span className="bg-card px-ds-6 py-ds-2 text-ds-12 text-ink shrink-0 rounded-full leading-[15px]">
                  {lawyer.specialty}
                </span>
              </div>
              <p className="text-ds-13 text-ink/40 leading-[120%]">
                {lawyer.role}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { TopLawyersPanel };
