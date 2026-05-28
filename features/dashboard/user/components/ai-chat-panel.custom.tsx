'use client';

import Image from 'next/image';
import { useState, type KeyboardEvent } from 'react';
import { Paperclip, Send, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button.ui';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group.ui';
import { AI_CHAT_CHIPS } from '@/features/dashboard/user/data';
import { cn } from '@/lib/utils';

const aiChatChipVariants = {
  selected: {
    false: 'text-white/80 hover:bg-white/10 hover:text-white',
    true: 'bg-white/15 text-white hover:bg-white/20',
  },
} as const;

type AiChatMessage = {
  id: string;
  text: string;
};

const AIChatPanel = () => {
  const t = useTranslations('Dashboard.user.aiChat');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const latestMessage = messages.at(-1);

  const handleChipClick = (chip: string) => setInput(chip);

  const handleSend = () => {
    const message = input.trim();

    if (!message) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: crypto.randomUUID(), text: message },
    ]);
    setInput('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-ds-617 rounded-ds-20 relative flex flex-col justify-between overflow-hidden bg-gradient-to-r from-[#BA8747] to-[#634928]">
      <Image
        src="/background/background-default.webp"
        alt=""
        fill
        className="pointer-events-none object-cover"
      />
      <div className="p-ds-16 flex items-center">
        <Button
          variant="ghost"
          disableScale
          className="h-ds-36 pl-ds-12 pr-ds-16 text-ds-13 relative rounded-full border border-solid border-[#ffffff1a] bg-[#ffffff1a] text-white hover:bg-white/15 hover:text-white/60"
        >
          <Sparkles className="size-ds-14" strokeWidth={1.5} />
          <span className="-mt-ds-1">{t('badge')}</span>
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[23.05%] h-px w-[53.85%] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.9)_50%,rgba(255,255,255,0)_100%)]"
          />
        </Button>
      </div>

      <div className="gap-ds-16 flex flex-col items-center justify-center">
        <div className="py-ds-16 flex flex-1 items-center justify-center">
          <Image
            src="/background/auth-bg.webp"
            alt="ai-chat-avatar"
            width={88}
            height={88}
            className="size-ds-88 pointer-events-none rounded-full mix-blend-luminosity"
          />
        </div>
        <div className="gap-ds-12 flex flex-col">
          <p className="text-ds-20 relative text-center leading-[120%] text-white">
            {t('titlePrefix')} <em>{t('titleAccent')}</em> {t('titleSuffix')}
          </p>

          {latestMessage ? (
            <p className="text-ds-12 px-ds-12 py-ds-6 max-w-full truncate rounded-full bg-white/10 text-white/70">
              {t('latestMessage', { message: latestMessage.text })}
            </p>
          ) : null}

          <div className="gap-ds-5 max-w-ds-355 flex flex-row flex-wrap justify-center">
            {AI_CHAT_CHIPS.map((chip) => {
              const isSelected = input === chip;

              return (
                <Button
                  key={chip}
                  variant="ghost"
                  disableScale
                  onClick={() => handleChipClick(chip)}
                  className={cn(
                    'h-ds-26 px-ds-12 text-ds-12 rounded-full border border-white/5',
                    aiChatChipVariants.selected[
                      String(isSelected) as 'true' | 'false'
                    ],
                  )}
                >
                  {chip}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="gap-ds-12 px-ds-16 pb-ds-16 flex flex-col items-center">
        <InputGroup className="group p-ds-6 h-ds-48 rounded-full border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-300 focus-within:border-white/10! focus-within:opacity-100! focus-within:ring-0">
          <InputGroupAddon align="inline-start">
            <Button
              variant="ghost"
              size="icon-sm"
              disableScale
              aria-label={t('attachFile')}
              className="rounded-full text-white/60 hover:bg-white/10 hover:text-white/80"
            >
              <Paperclip className="size-ds-16" strokeWidth={1.5} />
            </Button>
          </InputGroupAddon>

          <InputGroupInput
            id="ai-chat-input"
            type="text"
            className={cn(
              'px-ds-0 py-ds-0 text-ds-14 leading-ds-17 placeholder:text-ink/40 h-full',
              'text-ds-14 text-white placeholder:text-white/60',
            )}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('placeholder')}
          />

          <InputGroupAddon align="inline-end">
            <Button
              variant="ghost"
              size="icon-sm"
              disableScale
              disabled={!input.trim()}
              aria-label={t('send')}
              onClick={handleSend}
              className="rounded-full bg-white/20 text-white group-focus-within:bg-white group-focus-within:opacity-100! hover:bg-white/30"
            >
              <Send
                className="size-ds-16 group-focus-within:text-primary text-white/40"
                strokeWidth={1.5}
              />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
};

export { AIChatPanel };
