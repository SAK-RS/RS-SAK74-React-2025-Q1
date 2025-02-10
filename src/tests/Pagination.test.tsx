import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Pagination from 'components/home/Pagination';
import userEvent from '@testing-library/user-event';
import SearchResult from 'components/home/Results';
import { BrowserRouter } from 'react-router';

const user = userEvent.setup();

describe('Pagination testing', () => {
  const mockedFn = vi.fn();
  let unmount: () => void;
  let pagination: HTMLElement;

  beforeEach(() => {
    unmount = render(
      <Pagination page={1} totalPages={5} setPage={mockedFn} />
    ).unmount;
    pagination = screen.getByTestId('pagination');
  });
  afterEach(() => {
    unmount();
  });

  it('Pagination should be rendered', () => {
    expect(pagination).toBeInTheDocument();
  });

  it('Onclick Fn should be called after click', async () => {
    const nextBtn = screen.getByText('▶');
    expect(nextBtn).toBeEnabled();
    await user.click(nextBtn);
    expect(mockedFn).toHaveBeenCalled();
  });
});

describe('Testing query param changing after pagination click', () => {
  const page = () =>
    new URL(location.toString()).searchParams.get('searchPage');

  beforeEach(() => {
    render(
      <BrowserRouter>
        <SearchResult search="" />
      </BrowserRouter>
    );
  });
  afterEach(() => {
    cleanup();
  });

  it('Initial query param page should be 1', () => {
    expect(page()).toBe('1');
  });
});
