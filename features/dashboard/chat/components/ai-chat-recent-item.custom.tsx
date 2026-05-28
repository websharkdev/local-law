'use client';

import { Bookmark, EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button.ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.ui';
import { Separator } from '@/components/ui/separator.ui';
import type { RecentChat } from '@/features/dashboard/chat/data';
import { cn } from '@/lib/utils';

const recentChatRowVariants = {
  active: {
    false: 'bg-transparent text-ink hover:bg-white/60',
    true: 'bg-white text-ink hover:bg-white',
  },
  highlighted: {
    false: '',
    true: 'bg-primary/5 text-ink hover:bg-primary/8',
  },
} as const;

interface AiChatRecentItemProps {
  chat: RecentChat;
}

const AiChatRecentItem = ({ chat }: AiChatRecentItemProps) => {
  const t = useTranslations('Dashboard.chat.recent');

  const rowClassName = cn(
    'text-ds-14 h-ds-42 w-full rounded-ds-10 font-normal leading-[120%]',
    recentChatRowVariants.active[String(!!chat.isActive) as 'true' | 'false'],
    recentChatRowVariants.highlighted[
      String(!!chat.hasContextMenu) as 'true' | 'false'
    ],
  );

  if (chat.hasContextMenu) {
    return (
      <>
        <div className={cn('gap-ds-8 py-ds-12 pr-ds-12 pl-ds-14 flex items-center', rowClassName)}>
          <span className="min-w-0 flex-1 truncate">{chat.title}</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                disableScale
                type="button"
                aria-label={t('openMenu')}
                className="size-ds-18 shrink-0 rounded-ds-6 p-ds-0 text-primary hover:bg-primary/10"
              >
                <EllipsisVertical className="size-ds-18" strokeWidth={1.12} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="gap-ds-5 p-ds-6 w-ds-167 rounded-ds-14 border-0 bg-white shadow-[0px_2px_12px_-9px_rgba(0,0,0,0.1)]"
            >
              <DropdownMenuItem className="gap-ds-8 py-ds-8 pr-ds-12 pl-ds-11 text-ds-14 h-ds-34 rounded-ds-10 text-[#1F1F1F] focus:bg-primary/12 focus:text-[#1F1F1F]">
                <Bookmark className="text-primary size-ds-16" strokeWidth={1.07} />
                {t('saved')}
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-ds-8 py-ds-8 pr-ds-12 pl-ds-11 text-ds-14 h-ds-34 rounded-ds-10 text-[#1F1F1F] focus:bg-ink/5 focus:text-[#1F1F1F]">
                <Pencil className="size-ds-16 text-[#1F1F1F]" strokeWidth={1.07} />
                {t('rename')}
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-[#1F1F1F]/7 my-ds-0 h-px" />

              <DropdownMenuItem
                variant="destructive"
                className="gap-ds-8 py-ds-8 pr-ds-12 pl-ds-10 text-ds-14 h-ds-34 rounded-ds-10 focus:bg-destructive/10"
              >
                <Trash2 className="size-ds-16 text-destructive" strokeWidth={1.1} />
                {t('delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {chat.hasDividerAfter ? (
          <Separator className="bg-ink/5 h-px w-full" />
        ) : null}
      </>
    );
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        disableScale
        className={cn(
          'py-ds-12 pr-ds-12 pl-ds-14 justify-start',
          rowClassName,
        )}
      >
        <span className="block truncate">{chat.title}</span>
      </Button>

      {chat.hasDividerAfter ? (
        <Separator className="bg-ink/5 h-px w-full" />
      ) : null}
    </>
  );
};

export { AiChatRecentItem };
