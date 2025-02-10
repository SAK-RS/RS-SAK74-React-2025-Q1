import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from 'components/home/Search';
import { MockInstance } from 'vitest';

describe('Search Component', () => {
  const defaultProps = {
    value: '',
    onSubmit: vi.fn(),
  };

  let storageSpy: MockInstance;

  beforeEach(() => {
    storageSpy = vi.spyOn(localStorage.__proto__, 'setItem');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders with initial value', () => {
    render(<Search {...defaultProps} value="initial" />);
    expect(screen.getByPlaceholderText('Search')).toHaveValue('initial');
  });

  it('updates input value on change', async () => {
    render(<Search {...defaultProps} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test search');
    expect(input).toHaveValue('test search');
  });

  it('calls onSubmit with input value on form submission', async () => {
    render(<Search {...defaultProps} />);
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'test search');
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(defaultProps.onSubmit).toHaveBeenCalledWith('test search');
    expect(storageSpy).toHaveBeenCalledOnce();
  });
});
