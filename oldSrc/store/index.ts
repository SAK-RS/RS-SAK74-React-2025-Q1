import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { charactersApi } from './apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectedCharacters } from './selectedHeroesSlice';

const reducer = combineSlices(charactersApi, selectedCharacters);

export const store = configureStore({
  reducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(charactersApi.middleware);
  },
});

export type TypedState = ReturnType<typeof store.getState>;

export const useStateSelector = useSelector.withTypes<TypedState>();

export const useTypedDispatch = useDispatch.withTypes<typeof store.dispatch>();
