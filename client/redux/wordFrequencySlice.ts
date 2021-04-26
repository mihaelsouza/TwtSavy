import { WordFrequencyDTO, wordFrequencyInitialState } from '../interfaces/word.frequency-dto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export const wordFrequencySlice = createSlice({
  name: 'wordFrequency',
  initialState: wordFrequencyInitialState,
  reducers: {
    updateWordFrequency: (state: WordFrequencyDTO, action: PayloadAction<WordFrequencyDTO>) => {
      state = {...action.payload};
      return state;
    },
  }
});

export const { updateWordFrequency } = wordFrequencySlice.actions;
export const selectWordFrequency = (state: RootState) => state.wordFrequency;
export default wordFrequencySlice.reducer;