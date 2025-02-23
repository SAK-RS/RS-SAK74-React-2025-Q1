import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type MockInstance, vi } from 'vitest';
import Home, { LOCAL_STORAGE_KEY } from 'pages/Home';

vi.mock('components/home/Results', () => ({
  default: ({ search }: { search: string }) => (
    <div data-testid="results">{search}</div>
  ),
}));

vi.mock('components/home/Search', () => ({
  default: ({
    value,
    onSubmit,
  }: {
    value: string;
    onSubmit: (search: string) => void;
  }) => (
    <div data-testid="search">
      <input value={value} onChange={(e) => onSubmit(e.target.value)} />
    </div>
  ),
}));

describe('Home', () => {
  let storageSpy: MockInstance;

  beforeEach(() => {
    storageSpy = vi.spyOn(Storage.prototype, 'getItem');
  });

  afterEach(() => {
    storageSpy.mockClear();
  });

  it('renders with initial state from localStorage', () => {
    storageSpy.mockReturnValue('initial search');
    render(<Home />);

    expect(storageSpy).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
    expect(screen.getByTestId('search')).toBeInTheDocument();
    expect(screen.getByTestId('results')).toHaveTextContent('initial search');
    expect(
      screen.getByRole('button', { name: /throw error/i })
    ).toBeInTheDocument();
  });

  it('updates search state when Search component triggers onSubmit', async () => {
    render(<Home />);
    const searchInput = screen.getByRole('textbox');

    await userEvent.type(searchInput, 'new search');

    expect(screen.getByTestId('results')).toHaveTextContent('new search');
  });

  it('throws error when error button is clicked', async () => {
    render(<Home />);
    const errorButton = screen.getByRole('button', { name: /throw error/i });

    expect(() => userEvent.click(errorButton)).rejects.toThrow(
      'Error thrown from Home page'
    );
  });

  it('renders with empty search when localStorage is empty', () => {
    storageSpy.mockReturnValue(null);
    render(<Home />);

    expect(screen.getByTestId('results')).toHaveTextContent('');
  });
});
