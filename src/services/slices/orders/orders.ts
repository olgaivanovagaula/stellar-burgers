import { TOrder } from '@utils-types';
import { fetchOrder } from './orderApi';
import { createSlice } from '@reduxjs/toolkit';

type TInitState = {
  error: string | null;
  orders: TOrder[];
  isLoading: boolean;
};

const initialState: TInitState = {
  error: null,
  isLoading: false,
  orders: []
};

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
