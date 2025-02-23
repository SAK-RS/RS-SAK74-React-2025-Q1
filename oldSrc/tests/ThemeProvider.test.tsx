import { vi } from 'vitest';
import {
  renderHook,
  act,
  RenderHookResult,
  cleanup,
} from '@testing-library/react';
import ThemeProvider, {
  ThemeContextType,
  useTheme,
} from 'components/ThemeProvider';

describe('ThemeProvider', () => {
  const matchMediaMock = vi.fn().mockImplementation(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  let result: RenderHookResult<ThemeContextType, never>['result'];

  beforeEach(() => {
    window.matchMedia = matchMediaMock;

    result = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    }).result;
  });

  afterEach(() => {
    matchMediaMock.mockClear();
    cleanup();
  });

  it('should provide initial dark theme based on system preference', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });

    expect(result.current.isDark).toBeFalsy();
  });

  it('should throw error when useTheme is used outside provider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      'Component is beyong context...!'
    );
  });

  it('should toggle theme', () => {
    act(() => {
      result.current.setDark(true);
    });

    expect(result.current.isDark).toBe(true);
  });
});
