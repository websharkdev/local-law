import { z } from 'zod';

import { ResetPasswordFeature } from '@/features/auth/reset-password/reset-password.feature';

const resetPasswordSearchParamsSchema = z.object({
  error: z.string().optional(),
  token: z.string().min(1).optional(),
});

type ResetPasswordSearchParams = z.infer<
  typeof resetPasswordSearchParamsSchema
>;

type Props = {
  searchParams: Promise<ResetPasswordSearchParams>;
};

const isResetTokenActive = async (token: string) => {
  try {
    const { default: prisma } = await import('@/lib/prisma');
    const verification = await prisma.verification.findFirst({
      where: {
        identifier: `reset-password:${token}`,
      },
      select: {
        expiresAt: true,
      },
    });

    return Boolean(verification && verification.expiresAt > new Date());
  } catch (error) {
    const { logger } = await import('@/lib/logger');

    logger.error('[Password Reset Token Validation Error]', {
      error: error instanceof Error ? error.message : String(error),
    });

    return false;
  }
};

const ResetPasswordPage = async ({ searchParams }: Props) => {
  const parsedSearchParams = resetPasswordSearchParamsSchema.safeParse(
    await searchParams,
  );

  if (!parsedSearchParams.success) {
    return <ResetPasswordFeature isTokenInvalid />;
  }

  const { error, token } = parsedSearchParams.data;
  const isTokenInvalid =
    error === 'INVALID_TOKEN' ||
    (token ? !(await isResetTokenActive(token)) : false);

  return <ResetPasswordFeature isTokenInvalid={isTokenInvalid} token={token} />;
};

export default ResetPasswordPage;
