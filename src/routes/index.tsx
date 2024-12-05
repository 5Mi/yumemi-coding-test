import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loading from '@/components/ui/Loading';
import Home from '@/pages/Home';

const NotFound = lazy(() => import('../pages/NotFound'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const AppRoutes: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <RouterProvider router={router} />
  </Suspense>
);

export default AppRoutes;
