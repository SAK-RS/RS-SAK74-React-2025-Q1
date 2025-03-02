import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from 'components/home/Search';
// import { useRouter } from 'next/router';
import { MockInstance } from 'vitest';

const mockedRouterPush = vi.fn();
vi.mock('next/router', () => ({
  useRouter() {
    return { push: mockedRouterPush };
  },
}));

describe('Search Component', () => {
  let setStorageSpy: MockInstance;
  let getStorageSpy: MockInstance;

  beforeEach(() => {
    setStorageSpy = vi.spyOn(localStorage.__proto__, 'setItem');
    getStorageSpy = vi
      .spyOn(localStorage.__proto__, 'getItem')
      .mockReturnValue('initial');
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });
  it('renders with initial value', async () => {
    render(<Search />);
    const input = await screen.findByPlaceholderText('Search');
    await waitFor(() => {
      expect(getStorageSpy).toHaveBeenCalled();
      expect(input).toHaveValue('initial');
    });
  });

  it('updates input value on change', async () => {
    render(<Search />);
    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'test search');
    expect(input).toHaveValue('test search');
  });

  it('calls onSubmit with input value on form submission', async () => {
    render(<Search />);
    const input = screen.getByRole('textbox');

    await userEvent.clear(input);

    await userEvent.type(input, 'test search');

    await userEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(mockedRouterPush).toHaveBeenCalledWith({
      query: { search: 'test search', page: 1 },
    });
    expect(setStorageSpy).toHaveBeenCalledOnce();
  });
});
