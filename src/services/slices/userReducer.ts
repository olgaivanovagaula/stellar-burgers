import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './userApi';
import { TRegisterData } from '@api';

type TypeInitialState = {
  userData: TRegisterData | null;
  isLoading: boolean;
  registerError: string | null;
  loginError: string | null;
};

const initialState: TypeInitialState = {
  userData: null,
  isLoading: false,
  registerError: null,
  loginError: null
};

const userApiSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUserData: (state) => state.userData
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.registerError = action.error.message ?? 'Ошибка при регистрации';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registerError = null;
      });
  }
});

export const { selectUserData } = userApiSlice.selectors;
export default userApiSlice.reducer;
