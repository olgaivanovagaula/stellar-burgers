import userReducer from './userReducer';
import { TypeInitialState, initialState } from './userReducer';

import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  forgotUserPass,
  getUser
} from './userApi';

const fakeUser = {
  email: 'test@example.com',
  name: 'Test User'
};


describe('userApi reducer', () => {
  test('should handle registerUser.fulfilled', () => {
    expect(
      userReducer(initialState, {
        type: registerUser.fulfilled.type,
        payload: { user: fakeUser }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      registerError: null,
      isAuthentificatied: true,
      userData: fakeUser
    });
  });

  test('should handle loginUser.fulfilled', () => {
    expect(
      userReducer(initialState, {
        type: loginUser.fulfilled.type,
        payload: { user: fakeUser }
      })
    ).toEqual({
      ...initialState,
      authChecked: true,
      isLoading: false,
      loginError: null,
      isAuthentificatied: true,
      userData: fakeUser
    });
  });

  test('should handle logoutUser.fulfilled', () => {
    const loggedInState = {
      ...initialState,
      authChecked: true,
      isAuthentificatied: true,
      userData: fakeUser
    };
    expect(
      userReducer(loggedInState, {
        type: logoutUser.fulfilled.type
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      logoutError: null,
      userData: null,
      authChecked: false
    });
  });

  test('should handle updateUser.fulfilled', () => {
    const updatedUser = { ...fakeUser, name: 'Updated User' };
    expect(
      userReducer(initialState, {
        type: updateUser.fulfilled.type,
        payload: { user: updatedUser }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      updatedError: null,
      userData: updatedUser
    });
  });

  test('should handle forgotUserPass.rejected', () => {
    expect(
      userReducer(initialState, {
        type: forgotUserPass.rejected.type,
        error: { message: 'Ошибка при смене пароля' }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      forgotError: 'Ошибка при смене пароля'
    });
  });

  test('should handle getUser.fulfilled', () => {
    expect(
      userReducer(initialState, {
        type: getUser.fulfilled.type,
        payload: { user: fakeUser }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      checkAuthError: null,
      userData: fakeUser,
      authChecked: true,
      isAuthentificatied: true
    });
  });
});
