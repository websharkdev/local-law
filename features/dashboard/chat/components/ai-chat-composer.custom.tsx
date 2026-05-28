'use client';

import { AlertCircle, Paperclip, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type KeyboardEvent } from 'react';

import { Button } from '@/components/ui/button.ui';
import { Textarea } from '@/components/ui/textarea.ui';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group.ui';
import { cn } from '@/lib/utils';

const sendButtonVariants = {
  ready: {
    false: 'bg-[#FAF9F9] text-primary-dark/40 hover:bg-[#FAF9F9]/80',
    true: 'bg-[linear-gradient(91.12deg,#BA8747_0.96%,#634928_100%)] text-white hover:opacity-95',
  },
} as const;

interface AiChatComposerProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

const AiChatComposer = ({
  input,
  onInputChange,
  onSend,
}: AiChatComposerProps) => {
  const t = useTranslations('Dashboard.chat.composer');

  return (
    <div className="gap-ds-16 flex flex-col">
      <div
        className={cn(
          'h-ds-48 border-primary/20 flex w-full flex-col rounded-[61px] border backdrop-blur-sm',
        )}
      >
        <InputGroup className="h-ds-48 p-ds-6 gap-ds-6 w-full max-w-none rounded-[61px] border-0 bg-transparent focus-within:ring-0">
          <InputGroupAddon align="inline-start">
            <Button
              variant="ghost"
              size="icon-sm"
              disableScale
              type="button"
              aria-label={t('attachFile')}
              className="size-ds-36 text-ink/60 hover:bg-ink/5 hover:text-ink/80 rounded-full"
            >
              <Paperclip className="size-ds-16" strokeWidth={1.07} />
            </Button>
          </InputGroupAddon>

          <InputGroupInput
            type="text"
            value={input}
            onChange={(event) => onInputChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                onSend();
              }
            }}
            placeholder={t('placeholder')}
            className="text-ds-15 text-ink/60 px-ds-0 py-ds-0 placeholder:text-ink/60 h-full bg-transparent"
          />

          <InputGroupAddon align="inline-end">
            <Button
              variant="ghost"
              size="icon-sm"
              disableScale
              type="button"
              disabled
              aria-label={t('send')}
              className={cn(
                'size-ds-36 rounded-full',
                sendButtonVariants.ready.false,
              )}
            >
              <Send className="size-ds-16" strokeWidth={1.07} />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <p className="gap-ds-8 text-ds-14 text-ink/60 leading-ds-17 mx-auto flex w-full items-center justify-center">
        <AlertCircle
          aria-hidden="true"
          className="text-primary size-ds-16 shrink-0"
          strokeWidth={1.1}
        />
        {t('disclaimer')}
      </p>
    </div>
  );
};

export { AiChatComposer };
