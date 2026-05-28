'use client';

import { useState, useTransition } from 'react';

import type { FieldErrors } from '@/lib/zod-errors';

const useAuthForm = <TFieldName extends string>() => {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TFieldName>>({});

  const resetErrors = () => {
    setFormError(null);
    setFieldErrors({});
  };

  return {
    fieldErrors,
    formError,
    isPending,
    resetErrors,
    setFieldErrors,
    setFormError,
    startTransition,
  };
};

export { useAuthForm };
