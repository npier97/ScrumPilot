import { createFileRoute, redirect } from '@tanstack/react-router';
import Signup from '@/components/Auth/Signup';

export const Route = createFileRoute('/sign-up')({
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({
        to: '/dashboard'
      });
    }
  },
  component: Signup
});
