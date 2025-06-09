import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserApi, TRegisterData } from '@api';
import { setCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie("refreshToken", res.refreshToken)
    return res;
  }
);
