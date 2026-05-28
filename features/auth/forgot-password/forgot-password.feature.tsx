'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button.ui';
import { FieldGroup } from '@/components/ui/field.ui';
import { AuthField } from '@/features/auth/components/auth-field.custom';
import { AuthFormStatus } from '@/features/auth/components/auth-form-status.custom';
import { AuthPageShell } from '@/features/auth/components/auth-page-shell.custom';
import { useAuthForm } from '@/features/auth/hooks/use-auth-form';
import { Link } from '@/i18n/routing';
import { authClient } from '@/lib/auth-client';
import { getErrorMessage } from '@/lib/error-message';
import { getStringFormValues } from '@/lib/form-data';
import { mapZodFieldErrors } from '@/lib/zod-errors';
import {
  ForgotPasswordSchema,
  type ForgotPasswordValues,
} from '@/schemas/auth';

type ForgotFieldName = keyof ForgotPasswordValues;

const forgotFieldNames = [
  'email',
] as const satisfies readonly ForgotFieldName[];

const RESEND_DELAY_SECONDS = 60;

const formatResendDelay = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`;
};

const ForgotPasswordFeature = () => {
  const t = useTranslations('Auth.Forgot');
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const [resendDelay, setResendDelay] = useState(0);
  const {
    fieldErrors,
    formError,
    isPending,
    resetErrors,
    setFieldErrors,
    setFormError,
    startTransition,
  } = useAuthForm<ForgotFieldName>();

  useEffect(() => {
    if (resendDelay <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setResendDelay((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [resendDelay]);

  const requestPasswordReset = async (email: string) => {
    const response = await authClient.$fetch('/request-password-reset', {
      method: 'POST',
      body: { email, redirectTo: '/auth/reset-password' },
    });

    if (response.error) {
      setFormError(getErrorMessage(response.error, t('error')));
      return;
    }

    setSentEmail(email);
    setResendDelay(RESEND_DELAY_SECONDS);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetErrors();
    setSentEmail(null);

    const values = getStringFormValues(
      new FormData(event.currentTarget),
      forgotFieldNames,
    );
    const parsed = ForgotPasswordSchema.safeParse(values);

    if (!parsed.success) {
      setFieldErrors(
        mapZodFieldErrors(
          parsed.error,
          forgotFieldNames,
          (issue) => issue.message,
        ),
      );
      return;
    }

    startTransition(async () => {
      await requestPasswordReset(parsed.data.email);
    });
  };

  const handleResend = () => {
    if (!sentEmail || resendDelay > 0) {
      return;
    }

    resetErrors();

    startTransition(async () => {
      await requestPasswordReset(sentEmail);
    });
  };

  if (sentEmail) {
    return (
      <AuthPageShell
        title={
          <>
            {t('checkTitlePrefix')}{' '}
            <span className="italic">{t('checkTitleAccent')}</span>
          </>
        }
        subtitle={
          <>
            {t('checkDescriptionPrefix')} <br />
            <span className="underline">{sentEmail}</span>
            {t('checkDescriptionSuffix')}
          </>
        }
        footer={
          <Link className="text-primary hover:underline" href="/auth/sign-in">
            {t('backToSignIn')}
          </Link>
        }
      >
        <div className="gap-ds-16 flex w-full flex-col">
          {formError ? (
            <AuthFormStatus variant="error">{formError}</AuthFormStatus>
          ) : null}
          <Button
            className="h-ds-42 rounded-ds-110 border-ink/10 text-ds-15 w-full font-normal"
            disabled={isPending || resendDelay > 0}
            isLoading={isPending}
            onClick={handleResend}
            type="button"
            variant="outline"
            disableScale
          >
            {resendDelay > 0
              ? t('resendIn', { time: formatResendDelay(resendDelay) })
              : t('resend')}
          </Button>
        </div>
      </AuthPageShell>
    );
  }

  return (
    <AuthPageShell
      title={
        <>
          {t('titlePrefix')} <span className="italic">{t('titleAccent')}</span>?
        </>
      }
      subtitle={t('description')}
      footer={
        <Link className="text-primary hover:underline" href="/auth/sign-in">
          {t('backToSignIn')}
        </Link>
      }
    >
      <form className="w-full" onSubmit={handleSubmit}>
        <FieldGroup className="gap-ds-16">
          {formError ? (
            <AuthFormStatus variant="error">{formError}</AuthFormStatus>
          ) : null}
          <AuthField
            autoComplete="email"
            error={fieldErrors.email}
            icon={Mail}
            id="forgot-email"
            label={t('emailLabel')}
            name="email"
            placeholder={t('emailPlaceholder')}
            required
            type="email"
          />
          <Button
            className="mt-ds-6 h-ds-42 rounded-ds-110 text-ds-15 w-full font-normal"
            disabled={isPending}
            isLoading={isPending}
            type="submit"
            disableScale
          >
            {t('submit')}
          </Button>
        </FieldGroup>
      </form>
    </AuthPageShell>
  );
};

export { ForgotPasswordFeature };
