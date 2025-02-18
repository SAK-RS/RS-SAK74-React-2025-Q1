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
    unselectAll: selectedCharactersAdapter.removeAll,
  },
});

export const { addToSelected, removeFromSelected, unselectAll } =
  selectedCharacters.actions;

export const {
  selectAll: selectAllSelectedCharacters,
  selectById: selectSelectedCharacterById,
  selectIds: selectSelectedCharactersIds,
  selectTotal: selectedAmount,
} = selectedCharactersAdapter.getSelectors<TypedState>(
  (state) => state['selected-characters']
);
