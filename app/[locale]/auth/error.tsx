'use client';

import { useEffect } from 'react';
import { Lock, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button.ui';
import { logger } from '@/lib/logger';

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Auth.Error');
  const common = useTranslations('Common.actions');

  useEffect(() => {
    logger.error('Auth error boundary', {
      digest: error.digest,
      message: error.message,
    });
  }, [error]);

  return (
    <div className="auth-content-stack animate-in fade-in slide-in-from-bottom-ds-16 justify-center text-center duration-500">
      <div className="auth-icon-lg mb-ds-8 bg-red-50 text-red-500">
        <Lock className="size-ds-36" />
      </div>
      <div className="layout-column gap-ds-8">
        <h2 className="text-ds-28 text-ink leading-[120%] font-normal">
          {t('title')}
        </h2>
        <p className="ds-text-muted-16 max-w-ds-400">{t('description')}</p>
      </div>

      <div className="gap-ds-12 max-w-ds-320 flex w-full flex-col">
        <Button
          onClick={() => reset()}
          className="h-ds-46 w-full gap-ds-8"
        >
          <RotateCcw className="size-ds-18" />
          {common('tryAgain')}
        </Button>
        <Link href="/auth/sign-in" className="auth-link-primary">
          {common('backToLogin')}
        </Link>
      </div>
    </div>
  );
}
