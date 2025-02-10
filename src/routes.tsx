import ErrorElement from 'components/ErrorElement';
import { Details, loader } from 'pages/Details';
import Home from 'pages/Home';
import { Navigate, type RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Navigate to={'search'} />,
      },
      {
        path: 'search',
        element: <Home />,
        children: [
          {
            path: 'details/:detailsID',
            loader,
            element: <Details />,
          },
        ],
      },
    ],
  },
];
