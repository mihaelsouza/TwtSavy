import { LoadingStateDTO, loadingInitialState } from '../interfaces/loading.state-dto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: loadingInitialState,
  reducers: {
    setLoading: (state: LoadingStateDTO, action: PayloadAction<LoadingStateDTO>) => {
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