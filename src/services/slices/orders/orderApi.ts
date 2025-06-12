import { getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (number: number) => {
    const order = await getOrderByNumberApi(number);
    return order;
  }
);
