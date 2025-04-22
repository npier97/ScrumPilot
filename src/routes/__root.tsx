import Header from '@/components/Header';
import {
  Outlet,
  useMatches,
  createRootRouteWithContext
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
interface MyRouterContext {
  isAuthenticated: boolean;
}

const HEADERLESS_ROUTES = ['/login', '/sign-up', '/dashboard'];

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

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootRoute
});
