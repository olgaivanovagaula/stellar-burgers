import { TOrder } from '@utils-types';
import { fetchOrders } from './orderApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';

type TInitState = {
  error: string | null;
  orders: TOrder[];
  isLoading: boolean;
};

export const initialState: TInitState = {
  error: null,
  isLoading: false,
  orders: []
};

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (number: number) => {
    const order = await getOrderByNumberApi(number);
    return order;
  }
);

const infoOrderReducer = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {},
  selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось загрузить заказ';
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload.orders;
      });
  }
});

export default infoOrderReducer.reducer;
