import deliveriesReducer from './shippingData';
import infoOrderReducer from './orders'; // или как ты его называешь
import { initialState as deliveriesInitialState } from './shippingData';
import { initialState as infoInitialState } from './orders';

const sampleOrder = {
  _id: '65d0b04397ede0001d05c948',
  ingredients: ['643d69a5c3f7b9001cfa093c'],
  owner: '658556a887899c001b824aff',
  status: 'done',
  name: 'Краторный люминесцентный бургер',
  createdAt: '2024-02-17T13:10:27.612Z',
  updatedAt: '2024-02-17T13:10:28.088Z',
  number: 34391,
  __v: 0
};

/* =======================
   deliveriesSlice TESTS
   ======================= */

describe('deliveriesSlice reducer', () => {
  test('fetchOrders.pending', () => {
    const action = { type: 'orders/fetchOrders/pending' };
    const state = deliveriesReducer(deliveriesInitialState, action);
    expect(state).toEqual({
      ...deliveriesInitialState,
      isLoading: true,
      error: null
    });
  });

  test('fetchOrders.fulfilled', () => {
    const action = {
      type: 'orders/fetchOrders/fulfilled',
      payload: [sampleOrder]
    };
    const state = deliveriesReducer(deliveriesInitialState, action);
    expect(state).toEqual({
      ...deliveriesInitialState,
      orders: [sampleOrder],
      isLoading: false,
      error: null
    });
  });

  test('fetchOrders.rejected', () => {
    const action = {
      type: 'orders/fetchOrders/rejected',
      error: { message: 'Ошибка загрузки заказов' }
    };
    const state = deliveriesReducer(deliveriesInitialState, action);
    expect(state).toEqual({
      ...deliveriesInitialState,
      isLoading: false,
      error: 'Ошибка загрузки заказов'
    });
  });
});

/* =======================
   infoOrderReducer TESTS
   ======================= */

describe('infoOrderReducer reducer', () => {
  test('fetchOrder.pending', () => {
    const action = { type: 'order/fetchOrder/pending' };
    const state = infoOrderReducer(infoInitialState, action);
    expect(state).toEqual({
      ...infoInitialState,
      isLoading: true,
      error: null
    });
  });

  test('fetchOrder.fulfilled', () => {
    const action = {
      type: 'order/fetchOrder/fulfilled',
      payload: { orders: [sampleOrder] }
    };
    const state = infoOrderReducer(infoInitialState, action);
    expect(state).toEqual({
      ...infoInitialState,
      orders: [sampleOrder],
      isLoading: false,
      error: null
    });
  });

  test('fetchOrder.rejected', () => {
    const action = {
      type: 'order/fetchOrder/rejected',
      error: { message: 'Не удалось загрузить заказ' }
    };
    const state = infoOrderReducer(infoInitialState, action);
    expect(state).toEqual({
      ...infoInitialState,
      isLoading: false,
      error: 'Не удалось загрузить заказ'
    });
  });
});
