import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { sendPasswordResetEmail } from './auth-email';
import prisma from './prisma';
import {
  AUTH_SESSION_EXPIRES_IN,
  PASSWORD_RESET_TOKEN_EXPIRES_IN,
} from './constants';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  session: {
    expiresIn: AUTH_SESSION_EXPIRES_IN,
    disableSessionRefresh: true,
  },
  emailAndPassword: {
    enabled: true,
    resetPasswordTokenExpiresIn: PASSWORD_RESET_TOKEN_EXPIRES_IN,
    async sendResetPassword({ user, url }) {
      await sendPasswordResetEmail({ email: user.email, resetUrl: url });
    },
  },
  user: {
    deleteUser: {
      enabled: true,
    },
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'user',
      },
      lastName: {
        type: 'string',
        required: true,
      },
    },
  },
  plugins: [nextCookies()],
  rateLimit: {
    window: 60,
    max: 10,
    enabled: true,
  },
});
