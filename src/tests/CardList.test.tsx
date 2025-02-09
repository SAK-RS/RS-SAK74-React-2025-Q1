import { cleanup, render, screen } from '@testing-library/react';
import Results from 'components/home/Results';
import { MemoryRouter } from 'react-router';

describe('Results', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Results search="" />
      </MemoryRouter>
    );
  });
  afterEach(() => {
    cleanup();
  });

  test('Spinner should be rendering', () => {
    const spiner = screen.getByText('loading');
    expect(spiner).toBeInTheDocument();
  });

  it('Search list should be rendered', async () => {
    const list = await screen.findByTestId('list');
    expect(list).toBeInTheDocument();
  });

  it('Card amount should be 7 (max mocked results)', async () => {
    const cards = await screen.findAllByTestId('card');
    expect(cards.length).toBe(7);
  });
});
