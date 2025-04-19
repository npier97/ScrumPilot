import { routeTree } from './routeTree.gen';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import './utils/i18n';
import { useAuth } from './hooks/useAuth';

const router = createRouter({
  routeTree,
  context: { isAuthenticated: undefined! }
});

const AppRoot = () => {
  const { isAuthenticated } = useAuth();
  return <RouterProvider router={router} context={{ isAuthenticated }} />;
};

export default AppRoot;
