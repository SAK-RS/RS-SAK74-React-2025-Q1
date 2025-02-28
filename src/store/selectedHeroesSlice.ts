import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import type { TypedState } from 'store';
import type { Character } from 'types';

const selectedCharactersAdapter = createEntityAdapter<Character>();

export const selectedCharacters = createSlice({
  name: 'selected-characters',
  initialState: selectedCharactersAdapter.getInitialState(),
  reducers: {
    addToSelected: selectedCharactersAdapter.addOne,
    removeFromSelected: selectedCharactersAdapter.removeOne,
    unselectAll: selectedCharactersAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action['payload']['selected-characters'],
      };
    });
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
