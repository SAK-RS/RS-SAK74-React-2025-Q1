import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { TypedState } from 'store';
import { Character } from 'types';

const selectedCharactersAdapter = createEntityAdapter<Character>();

export const selectedCharacters = createSlice({
  name: 'selected-characters',
  initialState: selectedCharactersAdapter.getInitialState(),
  reducers: {
    addToSelected: selectedCharactersAdapter.addOne,
    removeFromSelected: selectedCharactersAdapter.removeOne,
  },
});

export const { addToSelected, removeFromSelected } = selectedCharacters.actions;

export const {
  selectAll: selectAllSelectedCharacters,
  selectById: selectSelectedCharacterById,
  selectIds: selectSelectedCharactersIds,
} = selectedCharactersAdapter.getSelectors<TypedState>(
  (state) => state['selected-characters']
);
