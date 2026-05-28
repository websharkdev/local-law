import { assertRoleDashboardAccess } from '@/lib/dashboard-access';

const LawyerDashboardPage = async () => {
  await assertRoleDashboardAccess('lawyer');

  return (
    <main className="p-ds-32">
      <h1 className="text-ds-24 font-semibold">Lawyer Dashboard</h1>
    </main>
  );
};

export default LawyerDashboardPage;
