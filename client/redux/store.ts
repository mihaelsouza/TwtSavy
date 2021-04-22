import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import queryResultReducer from './queryResultSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    queryResult: queryResultReducer
  },
  middleware: []
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;