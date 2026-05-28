'use client';

import { AlertTriangle, RotateCcw } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { PageCenterLayout } from '@/components/common/page-center-layout.common';
import { Button } from '@/components/ui/button.ui';
import { logger } from '@/lib/logger';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Common.errorPage');
  const common = useTranslations('Common.actions');

  useEffect(() => {
    logger.error('Route error boundary', {
      digest: error.digest,
      message: error.message,
    });
  }, [error]);

  return (
    <PageCenterLayout
      icon={AlertTriangle}
      iconClassName="bg-red-50 text-red-500"
      title={t('title')}
      description={t('description')}
      action={
        <Button variant="default" size="default" onClick={reset}>
          <RotateCcw className="size-ds-20" />
          {common('tryAgain')}
        </Button>
      }
    />
  );
}
