import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('../components/Index.tsx'),
  route('search', '../components/SearchRoute.tsx'),
  route('example', '../components/ExamplePage.tsx'),
] satisfies RouteConfig;
