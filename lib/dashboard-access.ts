import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export type DashboardRole = 'user' | 'lawyer';

const ROLE_DASHBOARD_PATH: Record<DashboardRole, string> = {
  user: '/dashboard/user',
  lawyer: '/dashboard/lawyer',
};

function normalizeRole(role?: string | null): DashboardRole | null {
  if (role === 'user' || role === 'lawyer') {
    return role;
  }

  return null;
}

async function getCurrentRole() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const users = await prisma.$queryRaw<Array<{ role: string | null }>>`
        SELECT "role"
        FROM "User"
        WHERE "id" = ${session.user.id}
        LIMIT 1
    `;

  const sessionUser = session.user as typeof session.user & {
    role?: string | null;
  };

  return (
    normalizeRole(users[0]?.role) ?? normalizeRole(sessionUser.role) ?? 'user'
  );
}

export async function redirectToRoleDashboard() {
  const role = await getCurrentRole();

  if (!role) {
    redirect('/auth/sign-in');
  }

  redirect(ROLE_DASHBOARD_PATH[role]);
}

export async function assertDashboardAccess() {
  const role = await getCurrentRole();

  if (!role) {
    redirect('/auth/sign-in');
  }

  return role;
}

export async function getDashboardSessionUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/auth/sign-in');
  }

  const users = await prisma.$queryRaw<
    Array<{
      email: string;
      image: string | null;
      lastName: string;
      name: string;
      role: string | null;
    }>
  >`
        SELECT "email", "image", "lastName", "firstName" AS "name", "role"
        FROM "User"
        WHERE "id" = ${session.user.id}
        LIMIT 1
    `;

  const user = users[0];

  if (!user) {
    redirect('/auth/sign-in');
  }

  return user;
}

export async function assertRoleDashboardAccess(expectedRole: DashboardRole) {
  const role = await getCurrentRole();

  if (!role) {
    redirect('/auth/sign-in');
  }

  if (role !== expectedRole) {
    redirect(ROLE_DASHBOARD_PATH[role]);
  }
}
