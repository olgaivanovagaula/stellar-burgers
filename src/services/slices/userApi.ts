import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserApi } from '@api';
import { TRegisterData } from '@api';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    console.log(res);
    return res;
  }
);
