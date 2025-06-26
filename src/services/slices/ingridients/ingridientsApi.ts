import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type TInitState = {
  error: string | null;
  ingridients: TIngredient[];
  isLoading: boolean;
  isLoaded: boolean;
};

const initialState: TInitState = {
  error: null,
  ingridients: [],
  isLoading: false,
  isLoaded: false
};

export const fetchIngridients = createAsyncThunk(
  'ingridients/fetchIngridients',
  getIngredientsApi
);

const burgerIngridSlice = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngridients.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Не удалось загрузить ингридиенты';
        state.isLoaded = false;
      })
      .addCase(fetchIngridients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngridients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.ingridients = action.payload;
        state.isLoaded = true;
      });
  }
});

export default burgerIngridSlice.reducer;
