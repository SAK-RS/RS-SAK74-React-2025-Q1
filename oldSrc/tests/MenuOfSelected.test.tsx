import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuSelected from 'components/home/MenuOfSelected';
import { Provider } from 'react-redux';
import mockedCsvGenerator from '../utils/csvContent';
import * as storeModule from 'store';
import { results } from './mock/data.json';
const mockedCharacter = results[Math.round(Math.random() * 6)];

vi.mock('../utils/csvContent', () => ({
  default: vi.fn(),
}));

const user = userEvent.setup();
describe('Menu of selected', () => {
  beforeEach(() => {
    render(<MenuSelected quantity={2} />, {
      wrapper: ({ children }) => (
        <Provider store={storeModule.store}>{children}</Provider>
      ),
    });
    vi.restoreAllMocks();
  });
  afterEach(() => {
    cleanup();
  });
  beforeAll(() => {
    const mockURL = {
      createObjectURL: vi.fn(() => 'fake-url'),
      revokeObjectURL: vi.fn(),
    };
    vi.stubGlobal('URL', mockURL);
    vi.spyOn(storeModule, 'useStateSelector').mockReturnValue([
      mockedCharacter,
    ]);
  });
  afterAll(() => {
    vi.unstubAllGlobals();
    vi.resetAllMocks();
  });

  it('should invoke appropriated fn after click "download"', async () => {
    expect(screen.getByText('2 items are selected')).toBeInTheDocument();
    const downloadBtn = screen.getByRole('button', {
      name: /download/i,
    });
    expect(downloadBtn).toBeInTheDocument();
    await user.click(downloadBtn);
    expect(mockedCsvGenerator).toHaveBeenCalledOnce();
    expect(mockedCsvGenerator).toHaveBeenCalledWith([mockedCharacter]);
  });

  it('should clear store after "Unselect all" click', async () => {
    const unselectBtn = screen.getByRole('button', {
      name: /unselect/i,
    });
    expect(unselectBtn).toBeInTheDocument();
    await user.click(unselectBtn);

    const selectedArr = storeModule.store.getState()['selected-characters'].ids;

    expect(selectedArr).toHaveLength(0);
  });
});
