'use client';

import { type FormEvent } from 'react';
import { LockKeyhole } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button.ui';
import { FieldGroup } from '@/components/ui/field.ui';
import { AuthField } from '@/features/auth/components/auth-field.custom';
import { AuthFormStatus } from '@/features/auth/components/auth-form-status.custom';
import { AuthPageShell } from '@/features/auth/components/auth-page-shell.custom';
import { useAuthForm } from '@/features/auth/hooks/use-auth-form';
import { Link, useRouter } from '@/i18n/routing';
import { authClient } from '@/lib/auth-client';
import { getErrorMessage } from '@/lib/error-message';
import { getStringFormValues } from '@/lib/form-data';
import { mapZodFieldErrors } from '@/lib/zod-errors';
import { ResetPasswordSchema, type ResetPasswordValues } from '@/schemas/auth';

type ResetFieldName = keyof ResetPasswordValues;

const resetFieldNames = [
  'password',
  'repeatPassword',
] as const satisfies readonly ResetFieldName[];

interface ResetPasswordFeatureProps {
  isTokenInvalid?: boolean;
  token?: string;
}

const ResetPasswordFeature = ({
  isTokenInvalid = false,
  token,
}: ResetPasswordFeatureProps) => {
  const t = useTranslations('Auth.Reset');
  const router = useRouter();
  const {
    fieldErrors,
    formError,
    isPending,
    resetErrors,
    setFieldErrors,
    setFormError,
    startTransition,
  } = useAuthForm<ResetFieldName>();

  if (!token || isTokenInvalid) {
    return (
      <AuthPageShell
        title={t('expiredTitle')}
        subtitle={t('expiredDescription', { hours: 1 })}
        footer={null}
      >
        <Link
          className="h-ds-42 rounded-ds-110 bg-primary text-primary-foreground text-ds-15 hover:bg-primary-dark flex w-full items-center justify-center font-normal transition-colors"
          href="/auth/forgot-password"
        >
          {t('requestNewLink')}
        </Link>
      </AuthPageShell>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetErrors();

    const values = getStringFormValues(
      new FormData(event.currentTarget),
      resetFieldNames,
    );
    const parsed = ResetPasswordSchema.safeParse(values);

    if (!parsed.success) {
      setFieldErrors(
        mapZodFieldErrors(
          parsed.error,
          resetFieldNames,
          (issue) => issue.message,
        ),
      );
      return;
    }

    startTransition(async () => {
      const response = await authClient.resetPassword({
        newPassword: parsed.data.password,
        token,
      });

      if (response.error) {
        setFormError(getErrorMessage(response.error, t('error')));
        return;
      }

      router.push('/auth/sign-in');
    });
  };

  return (
    <AuthPageShell
      title={
        <>
          {t('titlePrefix')} <span className="italic">{t('titleAccent')}</span>
        </>
      }
      subtitle={
        <>
          {t('descriptionLineOne')}
          <br />
          {t('descriptionLineTwo')}
          <br />
          {t('descriptionLineThree')}
        </>
      }
    >
      <form className="w-full" onSubmit={handleSubmit}>
        <FieldGroup className="gap-ds-16">
          {formError ? (
            <AuthFormStatus variant="error">{formError}</AuthFormStatus>
          ) : null}
          <AuthField
            autoComplete="new-password"
            error={fieldErrors.password}
            icon={LockKeyhole}
            id="reset-password"
            label={t('passwordLabel')}
            name="password"
            placeholder="••••••"
            required
            toggleLabel={t('togglePassword')}
            type="password"
          />
          <AuthField
            autoComplete="new-password"
            error={fieldErrors.repeatPassword}
            icon={LockKeyhole}
            id="reset-repeat-password"
            label={t('repeatPasswordLabel')}
            name="repeatPassword"
            placeholder="••••••"
            required
            toggleLabel={t('toggleRepeatPassword')}
            type="password"
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

export { ResetPasswordFeature };
