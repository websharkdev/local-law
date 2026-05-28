'use client';

import { Bell, Search, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button.ui';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group.ui';

const AiChatToolbar = () => {
  const t = useTranslations('Dashboard.chat');

  return (
    <header className="gap-ds-12 px-ds-24 pt-ds-16 flex shrink-0 flex-row items-center justify-between">
      <p className="text-ds-14 text-ink/40 leading-ds-17">{t('breadcrumb')}</p>

      <div className="gap-ds-12 flex flex-row items-center">
        <InputGroup className="h-ds-43 px-ds-14 gap-ds-8 max-w-ds-259 min-w-ds-203 flex-1 rounded-full border-0 bg-[#FAF9F9] focus-within:ring-0">
          <InputGroupAddon align="inline-start">
            <Search className="size-ds-18 text-ink/60" strokeWidth={1.125} />
          </InputGroupAddon>
          <InputGroupInput
            type="search"
            placeholder={t('searchPlaceholder')}
            className="text-ds-15 text-ink/40 placeholder:text-ink/40 bg-transparent"
          />
        </InputGroup>

        <Button
          variant="muted"
          size="icon"
          disableScale
          aria-label={t('notifications')}
          className="size-ds-43 p-ds-0 text-ink relative shrink-0 rounded-full bg-[#FAF9F9] hover:bg-[#FAF9F9]/80"
        >
          <Bell className="size-ds-18" strokeWidth={1.125} />
          <span className="right-ds-11 top-ds-11 size-ds-8 absolute rounded-full border border-[#FAF9F9] bg-[#ED4E2B]" />
        </Button>

        <Button
          variant="muted"
          size="icon"
          disableScale
          aria-label={t('settings')}
          className="size-ds-43 p-ds-0 text-ink shrink-0 rounded-full bg-[#FAF9F9] hover:bg-[#FAF9F9]/80"
        >
          <Settings className="size-ds-18" strokeWidth={1.125} />
        </Button>
      </div>
    </header>
  );
};

export { AiChatToolbar };
