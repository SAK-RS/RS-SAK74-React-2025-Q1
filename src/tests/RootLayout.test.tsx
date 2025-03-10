import { render, screen } from '@testing-library/react';
import RootLayout from 'components/RootLayout';
import * as ThemeProvider from 'components/ThemeProvider';
import Header from 'components/Header';
import userEvent from '@testing-library/user-event';

vi.mock('components/ThemeProvider', () => ({
  useTheme: vi.fn(),
}));

describe('RootLayout', () => {
  it('renders with light theme', () => {
    vi.mocked(ThemeProvider.useTheme).mockReturnValue({
      isDark: false,
      setDark: vi.fn(),
    });
    const { container } = render(
      <RootLayout>
        <div data-testid="child">Test Child</div>
      </RootLayout>
    );

    expect(container.firstChild).not.toHaveClass('dark');
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders with dark theme', () => {
    vi.mocked(ThemeProvider.useTheme).mockReturnValue({
      isDark: true,
      setDark: vi.fn(),
    });
    const { container } = render(
      <RootLayout>
        <div data-testid="child">Test Child</div>
      </RootLayout>
    );

    expect(container.firstChild).toHaveClass('dark');
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('integrated with header should toggle theme', async () => {
    const toggleFn = vi.fn();
    vi.mocked(ThemeProvider.useTheme).mockReturnValue({
      isDark: false,
      setDark: toggleFn,
    });
    render(<Header />);
    const toggleBtn = screen.getByRole('button', {
      description: 'toggle theme',
    });
    expect(toggleBtn).toBeInTheDocument();
    await userEvent.click(toggleBtn);
    expect(toggleFn).toHaveBeenCalled();
  });

  it('throws error when error button is clicked', async () => {
    render(<RootLayout />);
    const errorButton = screen.getByRole('button', { name: /throw error/i });

    expect(() => userEvent.click(errorButton)).rejects.toThrow(
      'Error thrown from Home page'
    );
  });
});
