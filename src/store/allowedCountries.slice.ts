import { createSelector, createSlice } from '@reduxjs/toolkit';
import { ALLOWED_COUNTRIES } from 'form_setup';
import { TypedStore } from 'store';

const allowedCountries = createSlice({
  name: 'allowedCountries',
  initialState: ALLOWED_COUNTRIES,
  reducers: {},
});

const mainSelector = createSelector.withTypes<TypedStore>();
export const selectAllowedCountries = mainSelector(
  [(state) => state],
  (state) => state.allowedCountries
);

export default allowedCountries;
