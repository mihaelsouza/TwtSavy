import { QueryDTO, queryInitialState } from '../interfaces/query-dto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export const queryResultSlice = createSlice({
  name: 'queryResult',
  initialState: queryInitialState,
  reducers: {
    updateEndpoint: (state: QueryDTO, action: PayloadAction<string>) => {
      state.endpoint = action.payload;
    },
    updateSearch: (state: QueryDTO, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    updateQuery: (state: QueryDTO, action: PayloadAction<QueryDTO>) => {
      state = {...action.payload};
      return state;
    }
  }
});

export const { updateEndpoint, updateSearch, updateQuery } = queryResultSlice.actions;
export const selectQueryResult = (state: RootState) => state.queryResult;
export default queryResultSlice.reducer;