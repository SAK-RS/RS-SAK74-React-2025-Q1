import { render, screen } from '@testing-library/react';
import { Details } from 'pages/Details';
import * as router from 'react-router';

vi.mock('react-router', () => ({
  useLoaderData: vi.fn(),
  useOutletContext: vi.fn(),
}));

const mockCharacter = {
  id: 1,
  name: 'Rick',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Earth', url: '' },
  image: 'test.jpg',
  episode: [],
  url: '',
  created: '',
};

describe('Details', () => {
  beforeEach(() => {
    vi.mocked(router.useLoaderData).mockReturnValue({
      characterPromise: Promise.resolve(mockCharacter),
    });
    vi.mocked(router.useOutletContext).mockReturnValue({
      closeDetails: vi.fn(),
    });
  });

  it('renders with initial closed state', () => {
    const { container } = render(<Details />);
    expect(container.firstChild).toHaveClass('w-0');
  });

  it('displays loader', async () => {
    render(<Details />);
    const loader = screen.getByText('loading');
    expect(loader).toBeInTheDocument();
  });

  it('calls closeDetails when close button clicked', async () => {
    const mockCloseDetails = vi.fn();
    vi.mocked(router.useOutletContext).mockReturnValue({
      closeDetails: mockCloseDetails,
    });

    render(<Details />);
    const closeButton = await screen.findByRole('button');
    closeButton.click();
    expect(mockCloseDetails).toHaveBeenCalled();
  });
});
