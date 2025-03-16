import { combineSlices, configureStore } from '@reduxjs/toolkit';
import allowedCountriesSlice from './allowedCountries.slice';
import { useDispatch, useSelector } from 'react-redux';
import formDataSlice from './formsData.slice';

export const store = configureStore({
  reducer: combineSlices(allowedCountriesSlice, formDataSlice),
});

export type TypedStore = ReturnType<typeof store.getState>;

export const useStateSelector = useSelector.withTypes<TypedStore>();

export const useTypedDispatch = useDispatch.withTypes<typeof store.dispatch>();
