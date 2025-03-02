import { cleanup, render, screen } from '@testing-library/react';
import Results from 'components/home/Results';
import { Provider } from 'react-redux';
import { makeStore } from 'store';
import * as apiSlice from 'store/apiSlice';
import { results as mockedResults } from './mock/data.json';
import userEvent from '@testing-library/user-event';

const store = makeStore();

const mockedRouterPushFn = vi.hoisted(() => vi.fn());
vi.mock('next/router', () => ({
  useRouter() {
    return { query: {}, push: mockedRouterPushFn };
  },
}));

const WrappedResults = () => (
  <Provider store={store}>
    <Results />
  </Provider>
);

const user = userEvent.setup();

describe('Results Component', () => {
  beforeEach(() => {
    render(<WrappedResults />);
  });
  afterEach(() => {
    cleanup();
  });

  it('Should show loading spinner initially', () => {
    const spiner = screen.getByText('loading');
    expect(spiner).toBeInTheDocument();
  });

  it('Search list should be rendered', async () => {
    const list = await screen.findByTestId('list');
    expect(list).toBeInTheDocument();
  });

  it('Card amount should be = mocked results lenght', async () => {
    const cards = await screen.findAllByTestId('card');
    expect(cards.length).toBe(mockedResults.length);
  });

  it('Should show selected heroes menu when there are selections', async () => {
    let selectBtns: HTMLButtonElement[];

    selectBtns = screen.getAllByRole('button', { name: 'Select' });
    expect(selectBtns).toHaveLength(mockedResults.length);

    await user.click(selectBtns[0]);
    expect(screen.getByText('1 item is selected')).toBeInTheDocument();
    expect(selectBtns[0]).toHaveAccessibleName('Unselect');

    await user.click(selectBtns[1]);
    expect(screen.getByText('2 items are selected')).toBeInTheDocument();

    selectBtns = screen.getAllByRole('button', { name: 'Select' });
    expect(selectBtns).toHaveLength(mockedResults.length - 2);
  });

  it('Should hide selected menu if no selected heroes', async () => {
    const unselectBtn = screen.getByText('Unselect all');
    expect(unselectBtn).toBeInTheDocument();
    await user.click(unselectBtn);
    expect(unselectBtn).not.toBeInTheDocument();
  });
});

describe('With mocked Query', () => {
  it('should show error message when API fails', () => {
    vi.spyOn(apiSlice, 'useGetCharactersQuery').mockReturnValue({
      isLoading: false,
      isSuccess: false,
      isError: true,
      isFetching: false,
      error: { status: 404, data: { error: 'Not found' } },
      refetch: vi.fn(),
    });

    render(<WrappedResults />);

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
