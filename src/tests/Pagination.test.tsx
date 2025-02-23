import { cleanup, render, screen } from '@testing-library/react';
import Pagination from 'components/home/Pagination';
import userEvent from '@testing-library/user-event';
import SearchResult from 'components/home/Results';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from 'store';

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
  <Provider store={store}>
    <BrowserRouter>
      <SearchResult search="" />
    </BrowserRouter>
  </Provider>
);

import * as apiSlice from 'store/apiSlice';
import { MockInstance } from 'vitest';
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
      image: 'rick.jpg',
    },
  ],
};

describe('Integration testing', () => {
  const getSearchParamsPage = () =>
    new URL(location.toString()).searchParams.get('searchPage');
  let queryMock: MockInstance;

  beforeEach(() => {
    queryMock = vi.spyOn(apiSlice, 'useGetCharactersQuery').mockReturnValue({
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

  it('Initial query param page should be 1', () => {
    expect(getSearchParamsPage()).toBe('1');
  });

  it('Should update page on pagination click', async () => {
    const nextButton = screen.getAllByText('▶')[0];
    await user.click(nextButton);

    expect(queryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 2,
        name: '',
      })
    );
    expect(getSearchParamsPage()).toBe('2');
  });
});
