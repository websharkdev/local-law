const getStringFormValues = <const TFieldNames extends readonly string[]>(
  formData: FormData,
  fieldNames: TFieldNames,
): Record<TFieldNames[number], string> =>
  Object.fromEntries(
    fieldNames.map((fieldName) => [
      fieldName,
      String(formData.get(fieldName) ?? ''),
    ]),
  ) as Record<TFieldNames[number], string>;

export { getStringFormValues };
