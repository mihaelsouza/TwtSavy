import { UserDTO, userInitialState } from '../interfaces/user-dto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export const usersSlice = createSlice({
  name: 'users',
  initialState: userInitialState,
  reducers: {
    updateUser: (state: UserDTO, action: PayloadAction<UserDTO>) => {
      state = {...state, ...action.payload};
      return state;
    },
    userLogout: (state: UserDTO) => {
      state.isSignedIn = false;
    }
  }
});

export const { updateUser, userLogout } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users;
export default usersSlice.reducer;