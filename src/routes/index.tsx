import App from '@/App';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({
        to: '/dashboard'
      });
    }
  },
  component: RouteComponent
});

function RouteComponent() {
  return <App />;
}
