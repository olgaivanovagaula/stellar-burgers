import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TInitlState = {
  error: string | null;
  orders: TOrder[];
  isLoading: boolean;
};
export const fetchOrders = createAsyncThunk('orders/fetchOrders', getOrdersApi);

export const initialState: TInitlState = {
  error: null,
  orders: [],
  isLoading: false
};

const deliveriesSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectOrdersLoadingStatus: (state) => state.isLoading,
    selectOrdersError: (state) => state.error,
    selectOrdersData: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось загрузить заказы';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.error = null;
      });
  }
});

export default deliveriesSlice.reducer;
