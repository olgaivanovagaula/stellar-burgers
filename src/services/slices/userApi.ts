import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserApi, TRegisterData, TLoginData, loginUserApi, logoutApi, updateUserApi,  getUserApi,forgotPasswordApi } from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie("refreshToken", res.refreshToken)
    return res;
  }
);


export const loginUser = createAsyncThunk (
    'user/loginUser',
    async (data: TLoginData) => {
      const res = await loginUserApi(data )
      setCookie('refreshToken', res.refreshToken)
      localStorage.setItem('email', res.user.email)
      localStorage.setItem("accessToken", res.accessToken )
      return res
    }
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => {
    localStorage.removeItem("accessToken")
    deleteCookie("refreshToken")
    const res = await logoutApi()
    localStorage.removeItem("email")
    return res
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
   async (data: TRegisterData) => {
    const res = await updateUserApi(data)
    return res
   }
)

export const forgotUserPass = createAsyncThunk(
    'user/fogotUserPass',
    async (data: {email: string}) => {
      const res = await forgotPasswordApi(data);
      return res

    }
)

export const getUser = createAsyncThunk("user/getUser", getUserApi)