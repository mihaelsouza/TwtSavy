import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: false,
  reducers: {
    toggleLoading: state => !state,
  }
});

export const { toggleLoading } = isLoadingSlice.actions;
export const selectIsLoading = (state: RootState) => state.isLoading;
export default isLoadingSlice.reducer;