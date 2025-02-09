import Home from 'pages/Home';
import { Navigate, type RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={'search'} />,
  },
  {
    path: 'search',
    element: <Home />,
  },
];
