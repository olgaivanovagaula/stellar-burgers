import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  forgotUserPass,
  getUser
} from './userApi';
import { TRegisterData } from '@api';
import { TUser } from '@utils-types';

export type TypeInitialState = {
  userData: TUser | null;
  isLoading: boolean;
  registerError: string | null;
  loginError: string | null;
  authChecked: boolean;
  logoutError: string | null;
  updatedError: string | null;
  forgotError: string | null;
  checkAuthError: string | null;
  isAuthentificatied: boolean;
};

export const initialState: TypeInitialState = {
  authChecked: false,
  userData: null,
  isLoading: false,
  registerError: null,
  loginError: null,
  logoutError: null,
  updatedError: null,
  forgotError: null,
  checkAuthError: null,
  isAuthentificatied: false
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
        state.authChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registerError = null;
        state.isAuthentificatied = true;
        state.userData = action.payload.user;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authChecked = false;
        state.isLoading = false;
        state.loginError = action.error.message ?? 'Ошибка при входе';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authChecked = true;
        state.isLoading = false;
        state.loginError = null;
        state.isAuthentificatied = true;
        state.userData = action.payload.user;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.logoutError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.logoutError = action.error.message ?? 'Ошибка при выходе';
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.authChecked = false;
        state.isLoading = false;
        state.logoutError = null;
        state.userData = null;
        state.isAuthentificatied = false;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.updatedError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.updatedError = action.error.message ?? 'Ошибка при выходе';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updatedError = null;
        state.userData = action.payload.user;
      })

      .addCase(forgotUserPass.pending, (state) => {
        state.isLoading = true;
        state.forgotError = null;
      })
      .addCase(forgotUserPass.rejected, (state, action) => {
        state.isLoading = false;
        state.forgotError = action.error.message ?? 'Ошибка при смене пароля';
      })
      .addCase(forgotUserPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forgotError = null;
      })

      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.checkAuthError = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.checkAuthError = action.error.message ?? 'Ошибка при входе';
        state.authChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checkAuthError = null;
        state.userData = action.payload.user;
        state.authChecked = true;
        state.isAuthentificatied = true;
      });
  }
});

export const { selectUserData } = userApiSlice.selectors;
export default userApiSlice.reducer;
