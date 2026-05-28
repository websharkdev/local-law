'use client';

import { type FormEvent } from 'react';
import { LockKeyhole, Mail, UserRound } from 'lucide-react';
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
import { RegisterSchema, type RegisterValues } from '@/schemas/auth';

type SignUpFieldName = keyof RegisterValues;

const signUpFieldIds = {
  fullName: 'sign-up-full-name',
  email: 'sign-up-email',
  password: 'sign-up-password',
  confirmPassword: 'sign-up-confirm-password',
} as const;

const signUpFieldNames = [
  'fullName',
  'email',
  'password',
  'confirmPassword',
] as const satisfies readonly SignUpFieldName[];

const getNameParts = (fullName: string) => {
  const [firstName = '', ...lastNameParts] = fullName.trim().split(/\s+/);

  return {
    firstName,
    lastName: lastNameParts.join(' '),
  };
};

const SignUpFeature = () => {
  const t = useTranslations('Auth.Register');
  const router = useRouter();
  const {
    fieldErrors,
    formError,
    isPending,
    resetErrors,
    setFieldErrors,
    setFormError,
    startTransition,
  } = useAuthForm<SignUpFieldName>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetErrors();

    const values = getStringFormValues(
      new FormData(event.currentTarget),
      signUpFieldNames,
    );

    const parsed = RegisterSchema.safeParse(values);

    if (!parsed.success) {
      setFieldErrors(
        mapZodFieldErrors(parsed.error, signUpFieldNames, () =>
          t('errors.validation'),
        ),
      );
      return;
    }

    startTransition(async () => {
      const { firstName, lastName } = getNameParts(parsed.data.fullName);
      const response = await authClient.signUp.email({
        name: firstName || parsed.data.fullName,
        email: parsed.data.email,
        password: parsed.data.password,
        lastName,
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
      title={t('title')}
      subtitle={t('subtitle')}
      footer={
        <p>
          {t('alreadyHaveAccount')}{' '}
          <Link className="text-primary hover:underline" href="/auth/sign-in">
            {t('signIn')}
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
            autoComplete="name"
            error={fieldErrors.fullName}
            icon={UserRound}
            id={signUpFieldIds.fullName}
            label={t('fullName')}
            name="fullName"
            placeholder={t('fullNamePlaceholder')}
            required
          />
          <AuthField
            autoComplete="email"
            error={fieldErrors.email}
            icon={Mail}
            id={signUpFieldIds.email}
            label={t('email')}
            name="email"
            placeholder={t('emailPlaceholder')}
            required
            type="email"
          />
          <AuthField
            autoComplete="new-password"
            error={fieldErrors.password}
            icon={LockKeyhole}
            id={signUpFieldIds.password}
            label={t('password')}
            name="password"
            placeholder={t('passwordPlaceholder')}
            required
            toggleLabel={t('togglePassword')}
            type="password"
          />
          <AuthField
            autoComplete="new-password"
            error={fieldErrors.confirmPassword}
            icon={LockKeyhole}
            id={signUpFieldIds.confirmPassword}
            label={t('confirmPassword')}
            name="confirmPassword"
            placeholder={t('passwordPlaceholder')}
            required
            toggleLabel={t('toggleConfirmPassword')}
            type="password"
          />
          <Button
            className="mt-ds-6 h-ds-42 rounded-ds-110 text-ds-15 w-full font-normal"
            disabled={isPending}
            isLoading={isPending}
            disableScale
            type="submit"
          >
            {t('submit')}
          </Button>
        </FieldGroup>
      </form>
    </AuthPageShell>
  );
};

export { SignUpFeature };
