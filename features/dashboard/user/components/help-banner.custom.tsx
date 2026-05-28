'use client';

import { ArrowUpRight, Lightbulb } from 'lucide-react';

import { Button } from '@/components/ui/button.ui';
import { useRouter } from 'next/navigation';

const HelpBanner = () => {
  const router = useRouter();
  return (
    <div className="min-h-ds-80 gap-ds-12 bg-app-surface py-ds-8 pl-ds-8 pr-ds-20 flex flex-row items-center overflow-hidden rounded-full bg-stone-50">
      <div className="size-ds-64 bg-card p-ds-20 flex shrink-0 items-center justify-center rounded-full">
        <Lightbulb className="size-ds-24 text-primary" strokeWidth={1.5} />
      </div>

      <div className="gap-ds-6 flex flex-1 flex-col">
        <p className="text-ds-18 text-ink leading-[120%]">
          Need help with a legal issue?
        </p>
        <p className="text-ds-14 text-ink/40 leading-[120%]">
          Get guidance, generate documents, or take the next step.
        </p>
      </div>

      <div className="gap-ds-16 flex flex-row items-center">
        <Button
          variant="outline"
          className="h-ds-42 px-ds-20 text-ds-15 rounded-full font-normal"
          disableScale
          onClick={() => router.push('/laws')}
        >
          Browse Laws
        </Button>

        <Button
          className="h-ds-42 px-ds-12 pl-ds-20 text-ds-15 rounded-full font-normal"
          disableScale
          onClick={() => router.push('/documents/new')}
        >
          Generate Document
          <ArrowUpRight className="size-ds-18" strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
};

export { HelpBanner };
