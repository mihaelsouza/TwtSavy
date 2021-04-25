import { configureStore } from '@reduxjs/toolkit';
import isLoadingReducer from './isLoadingSlice'
import usersReducer from './usersSlice';
import queryResultReducer from './queryResultSlice';
import wordFrequencyReducer from './wordFrequencySlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    queryResult: queryResultReducer,
    isLoading: isLoadingReducer,
    wordFrequency: wordFrequencyReducer
  },
  middleware: []
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;