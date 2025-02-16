import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { TypedState } from 'store';
import { Character } from 'types';

const charactersAdapter = createEntityAdapter<Character>();

export const heroes = createSlice({
  name: 'characters',
  initialState: charactersAdapter.getInitialState(),
  reducers: {
    setAll: charactersAdapter.setAll,
  },
});

export const { setAll } = heroes.actions;

export const {
  selectAll: selectAllCharacters,
  selectEntities: selectCharactersEntities,
} = charactersAdapter.getSelectors<TypedState>((state) => state.characters);
