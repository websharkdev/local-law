'use client';

import { useState } from 'react';

import { AiChatComposer } from '@/features/dashboard/chat/components/ai-chat-composer.custom';
import { AiChatRecentPanel } from '@/features/dashboard/chat/components/ai-chat-recent-panel.custom';
import { AiChatToolbar } from '@/features/dashboard/chat/components/ai-chat-toolbar.custom';
import { AiChatWelcome } from '@/features/dashboard/chat/components/ai-chat-welcome.custom';

const AiChatEmptyFeature = () => {
  const [input, setInput] = useState('');
  const [selectedChip, setSelectedChip] = useState('');

  const handleChipSelect = (chip: string) => {
    setSelectedChip(chip);
    setInput(chip);
  };

  const handleSend = () => {
    const message = input.trim();

    if (!message) return;

    setInput('');
    setSelectedChip('');
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <AiChatToolbar />

      <div className="gap-ds-24 p-ds-24 grid min-h-0 flex-1 grid-cols-12">
        <div className="col-span-9 flex flex-col justify-between">
          <div className="flex flex-1 items-center justify-center">
            <AiChatWelcome
              selectedChip={selectedChip}
              onChipSelect={handleChipSelect}
            />
          </div>
          <AiChatComposer
            input={input}
            onInputChange={setInput}
            onSend={handleSend}
          />
        </div>
        <div className="col-span-3">
          <AiChatRecentPanel />
        </div>
      </div>
    </div>
  );
};

export { AiChatEmptyFeature };
