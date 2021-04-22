import { UserDTO, userInitialState } from '../utilities/user-dto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export const usersSlice = createSlice({
  name: 'users',
  initialState: userInitialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserDTO>) => {
      state = {...action.payload};
      return state;
    },
  }
});

export const { updateUser } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users;
export default usersSlice.reducer;