import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { routeTree } from './routeTree.gen';
import { RouterProvider, createRouter } from '@tanstack/react-router';

const router = createRouter({ routeTree });

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
