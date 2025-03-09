import { cleanup, render, screen } from '@testing-library/react';
import Pagination from 'components/home/Pagination';
import userEvent from '@testing-library/user-event';
import SearchResult from 'components/home/Results';

const user = userEvent.setup();

describe('Pagination testing', () => {
  const mockedFn = vi.fn();
  let unmount: () => void;
  let pagination: HTMLElement;

  beforeEach(() => {
    unmount = render(
      <Pagination page={2} totalPages={5} setPage={mockedFn} />
    ).unmount;
    pagination = screen.getByTestId('pagination');
  });
  afterEach(() => {
    unmount();
  });

  it('Pagination should be rendered', () => {
    expect(pagination).toBeInTheDocument();
  });

  it('Onclick Fn should be called after click Next', async () => {
    const nextBtn = screen.getByText('▶');
    expect(nextBtn).toBeEnabled();
    await user.click(nextBtn);
    expect(mockedFn).toHaveBeenCalled();
  });

  it('Onclick Fn should be called after click Prev', async () => {
    const prevBtn = screen.getByText('◀');
    expect(prevBtn).toBeEnabled();
    await user.click(prevBtn);
    expect(mockedFn).toHaveBeenCalled();
  });
});

const WrappedResults = () => (
  <StoreProvider>
    <MemoryRouter>
      <SearchResult />
    </MemoryRouter>
  </StoreProvider>
);

import * as apiSlice from 'store/apiSlice';
import { API_URL } from 'api';
import StoreProvider from 'components/StoreProvider';
import { MemoryRouter } from 'react-router';

const mockedNavigate = vi.hoisted(() => vi.fn());
vi.mock('react-router', async (originalImport) => {
  const original = await originalImport<typeof import('react-router')>();
  return {
    ...original,
    useNavigate: () => mockedNavigate,
  };
});

const mockCharacterData = {
  info: {
    pages: 3,
  },
  results: [
    {
      id: 1,
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      image: `${API_URL}/rick.jpg`,
    },
  ],
};

describe('Integration testing', () => {
  beforeEach(() => {
    vi.spyOn(apiSlice, 'useGetCharactersQuery').mockReturnValue({
      data: mockCharacterData,
      isLoading: false,
      isSuccess: true,
      isError: false,
      isFetching: false,
      refetch: vi.fn(),
    });
    render(<WrappedResults />);
  });
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('Should update page on pagination click', async () => {
    const nextButton = screen.getAllByText('▶')[0];

    await user.click(nextButton);

    expect(mockedNavigate).toHaveBeenCalledWith(
      expect.objectContaining({ search: expect.stringContaining('page=2') })
    );
  });
});
