import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormDataType } from 'schemas';

const initialState: FormDataType[] = [];

const formDatas = createSlice({
  name: 'form-data',
  initialState,
  reducers: {
    addEntry: (state, { payload }: PayloadAction<FormDataType>) => {
      state.push(payload);
    },
  },
  selectors: {
    selectStoredFormData: (state) => state,
  },
});

export const { addEntry } = formDatas.actions;
export const { selectStoredFormData } = formDatas.selectors;
// const test = selectStoredFormData()

export default formDatas;
