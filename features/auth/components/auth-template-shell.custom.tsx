'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { AUTH_FORM_PAGE_VARIANTS } from '@/features/auth/auth.animations';
import { usePathname } from '@/i18n/routing';

interface AuthTemplateShellProps {
  children: React.ReactNode;
}

const AuthTemplateShell = ({ children }: AuthTemplateShellProps) => {
  const pathname = usePathname();

  const t = useTranslations('Auth.Marketing');
  return (
    <main className="auth-ds-scope p-ds-8 relative flex min-h-dvh w-full min-w-screen overflow-hidden bg-[url('/background/background-default.webp')] bg-cover bg-center">
      <div className="relative z-10 w-full lg:w-[calc(var(--index)*600/25)] lg:shrink-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={AUTH_FORM_PAGE_VARIANTS}
            className="h-full"
            style={{ transformOrigin: '50% 46%' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      <aside className="text-primary-foreground gap-ds-40 relative hidden min-h-dvh flex-1 flex-col items-center justify-center overflow-hidden bg-transparent bg-cover bg-center lg:flex">
        <Image
          src="/background/auth-bg.webp"
          alt="Auth Visual"
          width={140}
          height={140}
          className="size-ds-140 rounded-full mix-blend-luminosity"
        />
        <div className="layout-column-center gap-ds-12 text-center">
          <h2 className="text-ds-36 leading-[120%] font-normal text-white">
            {t('titlePrefix')}{' '}
            <span className="italic">{t('titleAccent')}</span>
          </h2>
          <p className="max-w-ds-560 text-ds-18 leading-[120%] text-white">
            {t('subtitle')}
          </p>
        </div>
      </aside>
    </main>
  );
};

export { AuthTemplateShell };
