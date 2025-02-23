import { Character } from 'types';

export type CharacterResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

export type SearchType = {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
};
