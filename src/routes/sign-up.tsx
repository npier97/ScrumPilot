import { createFileRoute } from '@tanstack/react-router';
import Signup from '@/components/Auth/Signup';

export const Route = createFileRoute('/sign-up')({
  component: Signup
});
