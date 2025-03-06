import { cleanup, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CharacterCard from 'components/home/CharacterCard';
import type { Character } from 'types';
import { results } from 'tests/mock/data.json';
import StoreProvider from 'components/StoreProvider';

describe('CharacterCard', () => {
  const mockCharacter: Character = results[Math.round(Math.random() * 6)];

  beforeEach(() => {
    vi.mock('next/navigation', () => ({
      useSearchParams: () => new URLSearchParams('test=example'),
    }));
    render(
      <StoreProvider>
        <CharacterCard character={mockCharacter} />
      </StoreProvider>
    );
  });
  afterEach(() => {
    vi.resetAllMocks();
    cleanup();
  });

  it('renders character image with correct attributes', () => {
    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image).toHaveAttribute('src');
    expect(image.src).toContain(encodeURIComponent(mockCharacter.image));
    expect(image).toHaveAttribute('alt', mockCharacter.name);
  });

  it('displays character name correctly', () => {
    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
  });

  it('displays character status correctly', () => {
    expect(screen.getByText(/Status:/)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
  });

  it('displays character species correctly', () => {
    expect(screen.getByText(/Species:/)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
  });

  it('displays character type correctly', () => {
    expect(screen.getByText(/Type:/)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.type)).toBeInTheDocument();
  });

  it('displays character gender correctly', () => {
    expect(screen.getByText(/Gender:/)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
  });
});
