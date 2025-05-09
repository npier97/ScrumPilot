import { createFileRoute, redirect } from '@tanstack/react-router';
import Dashboard from '@/components/Dashboard';
import { SidebarProvider } from '@/components/ui/sidebar';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/login'
      });
    }
  },
  component: DashboardComponent
});

function DashboardComponent() {
  return (
    <SidebarProvider>
      <Dashboard />
    </SidebarProvider>
  );
}
