import { createFileRoute, redirect } from '@tanstack/react-router';
import LogIn from '@/components/Auth/Login';

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({
        to: '/dashboard'
      });
    }
  },
  component: LogIn
});
