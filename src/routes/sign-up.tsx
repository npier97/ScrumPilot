import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent
});

function RouteComponent() {
  return <div>Hello "/sign-up"!</div>;
}
