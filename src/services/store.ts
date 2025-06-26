import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/users/userReducer';
import infoOrderReducer from './slices/orders/orders';
import deliveriesSlice from './slices/orders/shippingData';
import createBurgerSlice from './slices/ingridients/ingridients';
import burgerIngridSlice from './slices/ingridients/ingridientsApi';
import constructorOrderSlice from './slices/constructor/constructor';
import itemsSlice from './slices/feeds/feedsSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  user: userReducer,
  orders: infoOrderReducer,
  ingridients: createBurgerSlice,
  ingridients_loader: burgerIngridSlice,
  constructorBurger: constructorOrderSlice,
  feed: itemsSlice,
  myOrders: deliveriesSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
