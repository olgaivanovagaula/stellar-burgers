import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk('order/fetchOrder', async () => {
  const data = await getOrdersApi();
  return data;
});
