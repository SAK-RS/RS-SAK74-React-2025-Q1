import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('../pages/Index.tsx'),
  route('search', '../pages/SearchRoute.tsx', [
    route(':id', '../pages/DetailsRoute.tsx'),
  ]),
  route('example', '../pages/ExamplePage.tsx'),
] satisfies RouteConfig;
