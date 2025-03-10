import { render, screen } from '@testing-library/react';
import { fn, spyOn } from '@vitest/spy';
import Details from 'components/home/Details';

import { results } from './mock/data.json';

const mockCharacter = results[Math.round(Math.random() * 6)];

import * as apiSlice from 'store/apiSlice';

const queryMock = spyOn(apiSlice, 'useGetCharacterByIdQuery');

const mockedCloseFn = vi.hoisted(() => vi.fn());

vi.mock('react-router', () => ({
  useOutletContext: () => ({ onCloseDetails: mockedCloseFn }),
}));

describe('Details', () => {
  beforeEach(() => {
    queryMock.mockReturnValue({
      refetch: fn(),
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders with initial title', () => {
    const { getByText } = render(<Details id={mockCharacter.id.toString()} />);
    expect(getByText('Details:')).toBeInTheDocument();
  });

  it('displays loader', async () => {
    queryMock.mockReturnValue({
      refetch: fn(),
      isLoading: true,
    });
    render(<Details id={mockCharacter.id.toString()} />);
    const loader = screen.getByText('loading');
    expect(loader).toBeInTheDocument();
  });

  it('should render character fields', () => {
    queryMock.mockReturnValue({
      refetch: fn(),
      isSuccess: true,
      data: mockCharacter,
    });
    render(<Details id={mockCharacter.id.toString()} />);
    const { name, ...rest } = mockCharacter;
    expect(screen.getByText(name)).toBeInTheDocument();
    for (const key in rest) {
      expect(screen.getAllByText(key, { exact: false })[0]).toBeInTheDocument();
    }
  });

  it('calls closeDetails when close button clicked', async () => {
    render(<Details id={mockCharacter.id.toString()} />);

    const closeButton = await screen.findByRole('button');
    closeButton.click();
    expect(mockedCloseFn).toHaveBeenCalled();
  });

  it('query should be called with appropriate param', () => {
    render(<Details id={mockCharacter.id.toString()} />);
    expect(queryMock).toHaveBeenCalledWith(mockCharacter.id.toString());
  });
});
