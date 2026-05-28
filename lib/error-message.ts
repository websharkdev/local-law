const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error !== 'object' || error === null || !('message' in error)) {
    return fallback;
  }

  const { message } = error;

  return typeof message === 'string' && message.trim() ? message : fallback;
};

export { getErrorMessage };
