import { Character } from 'types';

export type CharacterResponse = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Character[];
};
