import { assertRoleDashboardAccess, getDashboardSessionUser } from '@/lib/dashboard-access';
import { UserDashboardFeature } from '@/features/dashboard/user/user-dashboard.feature';

const UserDashboardPage = async () => {
  await assertRoleDashboardAccess('user');
  const user = await getDashboardSessionUser();

  return <UserDashboardFeature user={user} />;
};

export default UserDashboardPage;
