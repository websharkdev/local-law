import type { z } from 'zod';

type FieldErrors<TFieldName extends string> = Partial<
  Record<TFieldName, string>
>;

const mapZodFieldErrors = <TFieldName extends string>(
  error: z.ZodError,
  fieldNames: readonly TFieldName[],
  getMessage: (issue: z.core.$ZodIssue) => string,
): FieldErrors<TFieldName> => {
  const allowedFields = new Set<string>(fieldNames);

  return error.issues.reduce<FieldErrors<TFieldName>>((errors, issue) => {
    const fieldName = issue.path[0];

    if (typeof fieldName === 'string' && allowedFields.has(fieldName)) {
      errors[fieldName as TFieldName] = getMessage(issue);
    }

    return errors;
  }, {});
};

export { mapZodFieldErrors, type FieldErrors };
