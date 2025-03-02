import { cleanup, render, screen } from '@testing-library/react';
import Pagination from 'components/home/Pagination';
import userEvent from '@testing-library/user-event';
import SearchResult from 'components/home/Results';
import { Provider } from 'react-redux';
import { makeStore } from 'store';

const store = makeStore();

const user = userEvent.setup();

const mockedRouterPushFn = vi.hoisted(() => vi.fn());
vi.mock('next/router', () => ({
  useRouter() {
    return { query: {}, push: mockedRouterPushFn };
  },
}));

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
  <Provider store={store}>
    <SearchResult />
  </Provider>
);

import * as apiSlice from 'store/apiSlice';
import { API_URL } from 'api';
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

    expect(mockedRouterPushFn).toHaveBeenCalledWith({
      query: expect.objectContaining({
        page: 2,
      }),
    });
  });
});
