import { SidebarProvider } from '@/components/ui/sidebar.ui';
import { Sidebar } from '@/features/dashboard/components/sidebar.custom';
import { getDashboardSessionUser } from '@/lib/dashboard-access';

const DashboardShellLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getDashboardSessionUser();

  return (
    <SidebarProvider
      className="gap-ds-16 p-ds-16 flex min-h-dvh bg-[#1A1C21]"
      style={
        {
          '--sidebar-width': 'calc(var(--index) * 212 / 25)',
          '--sidebar-width-icon': 'calc(var(--index) * 42 / 25)',
        } as React.CSSProperties
      }
    >
      <Sidebar user={user} />

      <main className="rounded-ds-24 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
        {children}
      </main>
    </SidebarProvider>
  );
};

export { DashboardShellLayout };
