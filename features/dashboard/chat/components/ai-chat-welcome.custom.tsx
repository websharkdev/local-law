'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button.ui';
import { AI_CHAT_CHIPS } from '@/features/dashboard/user/data';
import { cn } from '@/lib/utils';

const aiChatChipVariants = {
  selected: {
    false: 'text-ink/80 hover:bg-ink/4',
    true: 'border-primary/30 bg-primary/5 text-ink',
  },
} as const;

interface AiChatWelcomeProps {
  onChipSelect: (chip: string) => void;
  selectedChip: string;
}

const AiChatWelcome = ({ onChipSelect, selectedChip }: AiChatWelcomeProps) => {
  const t = useTranslations('Dashboard.chat.welcome');

  return (
    <section className="gap-ds-24 flex flex-col items-center justify-center">
      <Image
        src="/background/auth-bg.webp"
        alt=""
        width={88}
        height={88}
        className="size-ds-88 pointer-events-none rounded-full mix-blend-luminosity"
      />

      <div className="gap-ds-12 flex max-w-ds-474 flex-col items-center">
        <h1 className="text-ds-28 text-ink w-full text-center leading-[120%] font-normal">
          {t('titlePrefix')}{' '}
          <em>{t('titleAccent')}</em>{' '}
          {t('titleSuffix')}
        </h1>

        <div className="gap-ds-5 flex max-w-ds-474 flex-row flex-wrap justify-center">
          {AI_CHAT_CHIPS.map((chip) => {
            const isSelected = selectedChip === chip;

            return (
              <Button
                key={chip}
                variant="outline"
                disableScale
                type="button"
                onClick={() => onChipSelect(chip)}
                className={cn(
                  'h-ds-35 px-ds-14 py-ds-8 text-ds-15 rounded-full border-ink/5 font-normal leading-[120%]',
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
    </section>
  );
};

export { AiChatWelcome };
