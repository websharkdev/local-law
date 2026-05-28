'use client';

import { type FormEvent } from 'react';
import { LockKeyhole, Mail } from 'lucide-react';
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
import { LoginSchema, type LoginValues } from '@/schemas/auth';

type SignInFieldName = keyof LoginValues;

const signInFieldIds = {
  email: 'sign-in-email',
  password: 'sign-in-password',
} as const;

const signInFieldNames = [
  'email',
  'password',
] as const satisfies readonly SignInFieldName[];

const SignInFeature = () => {
  const t = useTranslations('Auth.Login');
  const router = useRouter();
  const {
    fieldErrors,
    formError,
    isPending,
    resetErrors,
    setFieldErrors,
    setFormError,
    startTransition,
  } = useAuthForm<SignInFieldName>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetErrors();

    const values = getStringFormValues(
      new FormData(event.currentTarget),
      signInFieldNames,
    );

    const parsed = LoginSchema.safeParse(values);

    if (!parsed.success) {
      setFieldErrors(
        mapZodFieldErrors(parsed.error, signInFieldNames, () =>
          t('errors.validation'),
        ),
      );
      return;
    }

    startTransition(async () => {
      const response = await authClient.signIn.email({
        email: parsed.data.email,
        password: parsed.data.password,
        callbackURL: '/dashboard',
      });

      if (response.error) {
        setFormError(getErrorMessage(response.error, t('errors.submit')));
        return;
      }

      router.push('/dashboard');
    });
  };

  return (
    <AuthPageShell
      title={
        <>
          {t('titlePrefix')} <span className="italic">{t('titleAccent')}</span>
        </>
      }
      subtitle={t('subtitle')}
      footer={
        <p>
          {t('noAccount')}{' '}
          <Link className="text-primary hover:underline" href="/auth/sign-up">
            {t('createAccount')}
          </Link>
        </p>
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
            id={signInFieldIds.email}
            label={t('emailLabel')}
            name="email"
            placeholder={t('emailPlaceholder')}
            required
            type="email"
          />
          <AuthField
            autoComplete="current-password"
            error={fieldErrors.password}
            icon={LockKeyhole}
            id={signInFieldIds.password}
            labelAddon={
              <Link
                className="text-ds-13 leading-ds-16 text-ink/40 hover:text-primary hover:underline"
                href="/auth/forgot-password"
              >
                {t('forgotPassword')}
              </Link>
            }
            label={t('passwordLabel')}
            name="password"
            placeholder={t('passwordPlaceholder')}
            required
            toggleLabel={t('togglePassword')}
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

export { SignInFeature };
