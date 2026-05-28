import { redirectToRoleDashboard } from '@/lib/dashboard-access';

const DashboardPage = async () => {
  await redirectToRoleDashboard();
};

export default DashboardPage;
