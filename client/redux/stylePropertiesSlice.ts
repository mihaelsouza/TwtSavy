import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: {scrollViewHeight: number} = {
  scrollViewHeight: 600,
};

export const stylePropertiesSlice = createSlice({
  name: 'styleProperties',
  initialState,
  reducers: {
    updateScrollViewHeight: (state: {scrollViewHeight: number}, action: PayloadAction<number>) => {
      state.scrollViewHeight = action.payload;
    }
  }
});

export const { updateScrollViewHeight } = stylePropertiesSlice.actions;
export const selectStyleProperties = (state: RootState) => state.styleProperties;
export default stylePropertiesSlice.reducer;