import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CharacterCard from 'components/home/CharacterCard';
import { Character } from 'types';
import { results } from 'tests/mock/data.json';

describe('CharacterCard', () => {
  const mockCharacter: Character = results[Math.round(Math.random() * 6)];

  beforeEach(() => {
    render(<CharacterCard character={mockCharacter} />);
  });

  it('renders character image with correct attributes', () => {
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockCharacter.image);
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
