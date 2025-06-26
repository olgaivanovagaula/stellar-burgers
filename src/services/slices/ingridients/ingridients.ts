import { TIngredient, TConstructorIngredient } from '@utils-types';
import { createSlice, nanoid } from '@reduxjs/toolkit';

export interface BurgerConstructorState {
  ingridients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
}

const initialState: BurgerConstructorState = {
  ingridients: [],
  bun: null
};

export const createBurgerSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action) => {
        const type = action.payload.type;
        if (type !== 'bun') {
          state.ingridients.push(action.payload);
        } else {
          state.bun = action.payload;
        }
      },
      prepare: (ingridient: TIngredient) => {
        const id = nanoid();
        return {
          payload: { ...ingridient, id },
          error: null,
          meta: null
        };
      }
    },
    clearItems: (state) => {
      state.bun = null;
      state.ingridients = [];
    },
    deleteItem: (state, action) => {
      if (action.payload.type !== 'bun') {
        state.ingridients = state.ingridients.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.bun = null;
      }
    },
    upItem: (state, action) => {
      const index = state.ingridients.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index > 0) {
        [state.ingridients[index - 1], state.ingridients[index]] = [
          state.ingridients[index],
          state.ingridients[index - 1]
        ];
      }
    },
    downItem: (state, action) => {
      const index = state.ingridients.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index < state.ingridients.length - 1) {
        [state.ingridients[index], state.ingridients[index + 1]] = [
          state.ingridients[index + 1],
          state.ingridients[index]
        ];
      }
    }
  }
});

export default createBurgerSlice.reducer;
export const { addItem, clearItems, deleteItem, upItem, downItem } =
  createBurgerSlice.actions;
