'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button.ui';
import { Separator } from '@/components/ui/separator.ui';
import { AiChatRecentItem } from '@/features/dashboard/chat/components/ai-chat-recent-item.custom';
import { RECENT_CHATS } from '@/features/dashboard/chat/data';

const AiChatRecentPanel = () => {
  const t = useTranslations('Dashboard.chat.recent');

  return (
    <aside className="gap-ds-16 p-ds-16 rounded-ds-20 flex w-full shrink-0 flex-col self-stretch bg-[#FAF9F9]">
      <Button
        variant="outline"
        disableScale
        type="button"
        className="h-ds-42 py-ds-12 pr-ds-20 pl-ds-12 text-ds-15 gap-ds-8 border-ink/12 text-ink w-full justify-start rounded-full font-normal hover:bg-white"
      >
        <Plus className="size-ds-18 shrink-0" strokeWidth={1.12} />
        {t('newConversation')}
      </Button>

      <Separator className="bg-ink/10 h-px w-full" />

      <div className="gap-ds-8 flex min-h-0 flex-1 flex-col overflow-hidden">
        <p className="text-ds-13 text-ink/60 leading-[120%]">{t('title')}</p>

        <div className="gap-ds-2 flex min-h-0 flex-1 flex-col overflow-y-auto">
          {RECENT_CHATS.map((chat) => (
            <AiChatRecentItem key={chat.id} chat={chat} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export { AiChatRecentPanel };
