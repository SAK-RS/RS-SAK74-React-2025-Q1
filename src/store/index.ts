import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { charactersApi } from './apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectedCharacters } from './selectedHeroesSlice';
import { createWrapper } from 'next-redux-wrapper';

const reducer = combineSlices(charactersApi, selectedCharacters);

const makeStore = () =>
  configureStore({
    reducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(charactersApi.middleware);
    },
  });

export type TypedState = ReturnType<typeof makeStore>;

export const useStateSelector = useSelector.withTypes<TypedState>();

export const useTypedDispatch =
  useDispatch.withTypes<ReturnType<typeof makeStore>['dispatch']>();

export const wrapper = createWrapper(makeStore);
