import { render, screen } from '@testing-library/react';
import { fn, spyOn } from '@vitest/spy';
import { Details } from 'pages/Details';
import * as router from 'react-router';

vi.mock('react-router', () => ({
  useLoaderData: vi.fn(),
  useOutletContext: vi.fn(),
}));

import { results } from './mock/data.json';

const mockCharacter = results[Math.round(Math.random() * 6)];

import * as apiSlice from 'store/apiSlice';

const queryMock = spyOn(apiSlice, 'useGetCharacterByIdQuery');

describe('Details', () => {
  beforeEach(() => {
    vi.mocked(router.useLoaderData).mockReturnValue(
      mockCharacter.id.toString()
    );
    vi.mocked(router.useOutletContext).mockReturnValue({
      closeDetails: vi.fn(),
    });
    queryMock.mockReturnValue({
      refetch: fn(),
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders with initial title', () => {
    const { getByText } = render(<Details />);
    expect(getByText('Details:')).toBeInTheDocument();
  });

  it('displays loader', async () => {
    queryMock.mockReturnValue({
      refetch: fn(),
      isLoading: true,
    });
    render(<Details />);
    const loader = screen.getByText('loading');
    expect(loader).toBeInTheDocument();
  });

  it('should render character fields', () => {
    queryMock.mockReturnValue({
      refetch: fn(),
      isSuccess: true,
      data: mockCharacter,
    });
    render(<Details />);
    for (const key in mockCharacter) {
      expect(screen.getAllByText(key + ':')[0]).toBeInTheDocument();
    }
  });

  it('calls closeDetails when close button clicked', async () => {
    const mockCloseDetails = fn();
    vi.mocked(router.useOutletContext).mockReturnValue({
      closeDetails: mockCloseDetails,
    });

    render(<Details />);

    const closeButton = await screen.findByRole('button');
    closeButton.click();
    expect(mockCloseDetails).toHaveBeenCalled();
  });

  it('query should be called with appropriate param', () => {
    render(<Details />);
    expect(queryMock).toHaveBeenCalledWith(mockCharacter.id.toString());
  });
});
