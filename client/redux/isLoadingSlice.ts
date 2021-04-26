import { LoadingState, loadingInitialState } from '../utilities/loading.state-dto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: loadingInitialState,
  reducers: {
    setLoading: (state, action: PayloadAction<LoadingState>) => {
      return {
        ...state,
        ...action.payload
      };
    }
  }
});

export const { setLoading } = isLoadingSlice.actions;
export const selectIsLoading = (state: RootState) => state.isLoading;
export default isLoadingSlice.reducer;