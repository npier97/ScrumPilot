import Header from '@/components/Header';
import { createRootRoute, Outlet, useMatches } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const HEADERLESS_ROUTES = ['/login', '/sign-up'];

const RootRoute = () => {
  const matches = useMatches();
  const shouldShowHeader = !matches.some((match) =>
    HEADERLESS_ROUTES.includes(match.routeId)
  );

  return (
    <>
      {shouldShowHeader && <Header />}
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({
  component: RootRoute
});
