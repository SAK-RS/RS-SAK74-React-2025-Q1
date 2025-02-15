import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { charactersApi } from './apiSlice';

const reducer = combineReducers({
  [charactersApi.reducerPath]: charactersApi.reducer,
});

export const store = configureStore({
  reducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(charactersApi.middleware);
  },
});
