import 'vitest-dom/extend-expect';
import { server } from './mock/server';

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
