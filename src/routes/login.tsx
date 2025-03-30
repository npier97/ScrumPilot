import { createFileRoute } from '@tanstack/react-router';
import LogIn from '@/components/Login';

export const Route = createFileRoute('/login')({
  component: LogIn
});
