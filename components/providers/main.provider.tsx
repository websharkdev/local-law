'use client';

import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Toaster } from '@/components/ui/sonner.ui';
import { TooltipProvider } from '@/components/ui/tooltip.ui';
import { EASE_EXPO_OUT, EASE_SILK } from '@/lib/animations.lib';

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 'var(--ds-6)',
    scale: 0.998,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.24,
      ease: EASE_SILK,
      opacity: { duration: 0.18, ease: EASE_EXPO_OUT },
    },
  },
  exit: {
    opacity: 0,
    y: 'calc(var(--ds-4) * -1)',
    scale: 0.999,
    transition: {
      duration: 0.12,
      ease: EASE_EXPO_OUT,
      opacity: { duration: 0.1, ease: EASE_EXPO_OUT },
    },
  },
} as const;

const MainProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  return (
    <NuqsAdapter>
      <AnimatePresence mode="wait" initial={false}>
        <TooltipProvider>
          <motion.div
            key={pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransitionVariants}
            className="flex h-full w-full flex-col"
            style={{ transformOrigin: '50% 48%' }}
          >
            {children}
          </motion.div>
        </TooltipProvider>
      </AnimatePresence>
      <Toaster />
    </NuqsAdapter>
  );
};

export default MainProvider;
