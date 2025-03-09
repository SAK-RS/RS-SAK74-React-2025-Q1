import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { TypedState } from 'store';

interface SelectedCharactersState {
  'selected-characters': ReturnType<
    typeof selectedCharactersAdapter.getInitialState
  >;
}

type ExtendedTypedState = TypedState & SelectedCharactersState;
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
});

export const { addToSelected, removeFromSelected, unselectAll } =
  selectedCharacters.actions;
export const {
  selectAll: selectAllSelectedCharacters,
  selectById: selectSelectedCharacterById,
  selectIds: selectSelectedCharactersIds,
  selectTotal: selectedAmount,
} = selectedCharactersAdapter.getSelectors<ExtendedTypedState>(
  (state) => state['selected-characters']
);
