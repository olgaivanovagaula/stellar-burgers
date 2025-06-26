import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

import { getFeedsApi } from '@api';

type TInitialState = {
  error: string | null;
  feedData: TOrdersData | null;
  listItems: TOrder[];
  listItemInfo: {
    totalToday: number;
    total: number;
  };
  isLoading: boolean;
};

const initialState: TInitialState = {
  listItems: [],
  feedData: null,
  isLoading: false,
  error: null,
  listItemInfo: {
    total: 0,
    totalToday: 0
  }
};

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', getFeedsApi);

const itemsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Не удалось загрузить список заказов';
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.listItems = action.payload.orders;
        state.listItemInfo.totalToday = action.payload.totalToday;
        state.listItemInfo.total = action.payload.total;
      });
  }
});

export default itemsSlice.reducer;
