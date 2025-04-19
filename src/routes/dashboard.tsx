import { createFileRoute, redirect } from '@tanstack/react-router';
import Dashboard from '@/components/Dashboard';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/login'
      });
    }
  },
  component: Dashboard
});
