import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState = {
  scrollViewHeight: 600,
};

export const stylePropertiesSlice = createSlice({
  name: 'styleProperties',
  initialState,
  reducers: {
    updateScrollViewHeight: (state, action: PayloadAction<number>) => {
      state.scrollViewHeight = action.payload;
    }
  }
});

export const { updateScrollViewHeight } = stylePropertiesSlice.actions;
export const selectStyleProperties = (state: RootState) => state.styleProperties;
export default stylePropertiesSlice.reducer;