import ErrorElement from 'components/ErrorElement';
import NativeForm from 'components/nativ-form/Form';
import HookForm from 'components/hook-form/Form';
import { Navigate, type RouteObject } from 'react-router';
import View from 'components/View';

export const routes: RouteObject[] = [
  {
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Navigate to={'view'} />,
      },
      {
        path: 'view',
        element: <View />,
      },
      {
        path: 'native-form',
        element: <NativeForm />,
      },
      {
        path: 'hook-form',
        element: <HookForm />,
      },
    ],
  },
];
