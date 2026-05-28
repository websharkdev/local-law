import { Link } from '@/i18n/routing';
import { RECENT_DOCUMENTS } from '@/features/dashboard/user/data';

const RecentDocumentsPanel = () => {
  return (
    <div className="gap-ds-20 rounded-ds-20 p-ds-16 flex w-full flex-col bg-[#f6f5f3]">
      <p className="text-ds-18 text-ink/80 leading-[120%]">
        Pick up where you <em>left off</em>
      </p>

      <div className="gap-ds-8 flex flex-col">
        {RECENT_DOCUMENTS.map((doc) => (
          <Link
            key={doc.id}
            href={doc.href}
            className="gap-ds-12 rounded-ds-12 border-ink/5 p-ds-12 hover:bg-muted flex flex-row items-start border transition-colors"
          >
            <div className="gap-ds-2 flex flex-1 flex-col overflow-hidden">
              <p className="text-ds-14 text-ink leading-[120%]">{doc.title}</p>
              <p className="text-ds-13 text-ink/40 truncate leading-[120%]">
                {doc.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { RecentDocumentsPanel };
