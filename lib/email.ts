import { render, toPlainText } from '@react-email/render';
import nodemailer from 'nodemailer';
import type { ReactNode } from 'react';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

import { logger } from './logger';

type EmailTag = {
  name: string;
  value: string;
};

type SendEmailOptions = {
  to: string | string[];
  subject: string;
  html?: string;
  react?: ReactNode;
  text?: string;
  from?: string;
  headers?: Record<string, string>;
  tags?: EmailTag[];
};

let transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> | null =
  null;

const smtpAuthTypes = ['auto', 'none', 'oauth2', 'password'] as const;

type SmtpAuthType = (typeof smtpAuthTypes)[number];

function getEmailDeliveryMode() {
  return (process.env.EMAIL_DELIVERY_MODE || 'smtp').toLowerCase();
}

function getSmtpAuthType(): SmtpAuthType {
  const configuredAuthType = (process.env.SMTP_AUTH_TYPE || 'auto')
    .trim()
    .toLowerCase();

  if (smtpAuthTypes.includes(configuredAuthType as SmtpAuthType)) {
    return configuredAuthType as SmtpAuthType;
  }

  throw new Error(
    'SMTP_AUTH_TYPE must be one of: auto, none, oauth2, password.',
  );
}

function getSmtpSecure() {
  const configured = process.env.SMTP_SECURE?.toLowerCase();

  if (configured === 'true') return true;
  if (configured === 'false') return false;

  return process.env.SMTP_PORT === '465';
}

function getSmtpAuth(): SMTPTransport.Options['auth'] {
  const authType = getSmtpAuthType();
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
  const clientId = process.env.CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
  const clientSecret =
    process.env.CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken =
    process.env.REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN;

  if (authType === 'none') {
    return undefined;
  }

  if (!user) {
    throw new Error('SMTP_USER is required to send email with SMTP auth.');
  }

  if (authType === 'password') {
    if (!password) {
      throw new Error(
        'SMTP_PASSWORD or SMTP_PASS is required when SMTP_AUTH_TYPE=password.',
      );
    }

    return {
      user,
      pass: password,
    };
  }

  if (authType === 'oauth2') {
    if (!clientId || !clientSecret || !refreshToken) {
      throw new Error(
        'CLIENT_ID, CLIENT_SECRET, and REFRESH_TOKEN are required when SMTP_AUTH_TYPE=oauth2.',
      );
    }

    return {
      type: 'OAuth2',
      user,
      clientId,
      clientSecret,
      refreshToken,
    };
  }

  if (password) {
    return {
      user,
      pass: password,
    };
  }

  if (clientId && clientSecret && refreshToken) {
    return {
      type: 'OAuth2',
      user,
      clientId,
      clientSecret,
      refreshToken,
    };
  }

  throw new Error(
    'SMTP auth is incomplete. Set SMTP_PASSWORD/SMTP_PASS for password auth or set SMTP_AUTH_TYPE=oauth2 with CLIENT_ID, CLIENT_SECRET, and REFRESH_TOKEN.',
  );
}

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;

  if (!host) {
    throw new Error('SMTP_HOST is required to send email.');
  }

  const port = Number(process.env.SMTP_PORT || (getSmtpSecure() ? 465 : 587));

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: getSmtpSecure(),
    auth: getSmtpAuth(),
  });

  return transporter;
}

function getTagHeaders(tags?: EmailTag[]) {
  if (!tags?.length) return {};

  return Object.fromEntries(
    tags.map(({ name, value }) => [`X-LocalLaw-${name.trim()}`, value.trim()]),
  );
}

export async function sendEmail({
  to,
  subject,
  html,
  react,
  text,
  from = process.env.SMTP_FROM || 'Local Law <no-reply@local-law.com>',
  headers,
  tags,
}: SendEmailOptions) {
  try {
    const renderedHtml = react ? await render(react) : html;
    const renderedText =
      text || (renderedHtml ? toPlainText(renderedHtml) : undefined);

    if (getEmailDeliveryMode() === 'log') {
      logger.info('Email delivery skipped in log mode', {
        to,
        subject,
        text: renderedText,
      });

      return {
        success: true,
        data: {
          messageId: 'local-log-mode',
        },
      };
    }

    const data = await getTransporter().sendMail({
      from,
      to,
      subject,
      html: renderedHtml,
      text: renderedText,
      headers: {
        ...headers,
        ...getTagHeaders(tags),
      },
    });
    const previewUrl = nodemailer.getTestMessageUrl(data);

    if (previewUrl) {
      logger.info('Email preview URL', { previewUrl });
    }

    return { success: true, data };
  } catch (error) {
    logger.error('Failed to send email', {
      error: error instanceof Error ? error.message : String(error),
    });
    return { success: false, error };
  }
}
