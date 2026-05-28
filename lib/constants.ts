export const PASSWORD_RESET_TOKEN_EXPIRES_IN = 60 * 60 * 1; // 1 hour
export const AUTH_SESSION_EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days
export const COMPANY_NAME = 'Local Law';
export const APP_BASE_URL = (
  process.env.BETTER_AUTH_URL || 'http://localhost:3000'
).replace(/\/$/, '');
export const PASSWORD_RESET_EMAIL_SUBJECT = `Reset your password - ${COMPANY_NAME}`;

export const companyName = COMPANY_NAME;
