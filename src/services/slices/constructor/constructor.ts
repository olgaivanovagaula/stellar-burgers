import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

type TInitState = {
  lastOrderName: string;
  isLoading: boolean;
  error: null | string;
  orderAccept: boolean;
  orderRequest: boolean;
  orderModalData: null | TOrder;
};

const initialState: TInitState = {
  lastOrderName: '',
  isLoading: false,
  error: null,
  orderAccept: false,
  orderRequest: false,
  orderModalData: null
};

export const orderConstructorBurgerApi = createAsyncThunk(
  'constructor/orderConstructorBurgerApi',
  async (data: string[]) => orderBurgerApi(data)
);

const constructorOrderSlice = createSlice({
  name: 'makeOrder',
  initialState,
  reducers: {
    handleCloseOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderConstructorBurgerApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderRequest = true;
        state.orderAccept = false;
      })
      .addCase(orderConstructorBurgerApi.fulfilled, (state, action) => {
        state.lastOrderName = action.payload.name;
        state.error = null;
        state.orderAccept = true;
        state.isLoading = false;
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(orderConstructorBurgerApi.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось сделать заказ';
        state.isLoading = false;
        state.orderModalData = null;
      });
  }
});

export const { handleCloseOrderModal } = constructorOrderSlice.actions;
export default constructorOrderSlice.reducer;
