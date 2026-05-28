import { createElement } from 'react';

import { ResetPasswordEmail } from '@/components/emails/reset-password-email';
import { APP_BASE_URL, PASSWORD_RESET_EMAIL_SUBJECT } from '@/lib/constants';
import { sendEmail } from '@/lib/email';
import { logger } from '@/lib/logger';

type SendPasswordResetEmailOptions = {
  email: string;
  resetUrl: string;
};

const getListUnsubscribeUrl = () => `${APP_BASE_URL}/unsubscribe`;

const sendPasswordResetEmail = async ({
  email,
  resetUrl,
}: SendPasswordResetEmailOptions) => {
  try {
    const result = await sendEmail({
      to: email,
      subject: PASSWORD_RESET_EMAIL_SUBJECT,
      react: createElement(ResetPasswordEmail, {
        email,
        url: resetUrl,
      }),
      text: `Reset your password within 1 hour by clicking here: ${resetUrl}`,
      headers: {
        'List-Unsubscribe': `<${getListUnsubscribeUrl()}>`,
      },
      tags: [
        { name: 'category', value: 'auth' },
        { name: 'type', value: 'reset-password' },
      ],
    });

    if (!result.success) {
      logger.error('[Email Reset Error]', { error: result.error });
    }
  } catch (error) {
    logger.error('[Email Reset Unexpected Error]', {
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export { sendPasswordResetEmail };
