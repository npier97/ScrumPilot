import { createFileRoute } from '@tanstack/react-router';
import LogIn from '@/components/Auth/Login';

export const Route = createFileRoute('/login')({
  component: LogIn
});
