import itemsReducer from './feedsSlice'; // путь до твоего слайса
import { fetchFeeds } from './feedsSlice'; // чтобы получить типы экшенов
import { TOrdersData } from '@utils-types';

const initialState = {
  listItems: [],
  feedData: null,
  isLoading: false,
  error: null,
  listItemInfo: {
    total: 0,
    totalToday: 0
  }
};

const samplePayload: TOrdersData = {
  orders: [
    {
      _id: '123',
      ingredients: ['ingredient-1', 'ingredient-2'],
      status: 'done',
      name: 'Test Order',
      createdAt: '2024-02-17T13:10:27.612Z',
      updatedAt: '2024-02-17T13:10:28.088Z',
      number: 1,
    }
  ],
  total: 1500,
  totalToday: 50
};

describe('itemsSlice reducer', () => {
  it('should return initial state', () => {
    expect(itemsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = itemsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle fetchFeeds.fulfilled', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: samplePayload
    };
    const state = itemsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: null,
      listItems: samplePayload.orders,
      listItemInfo: {
        total: 1500,
        totalToday: 50
      }
    });
  });

  it('should handle fetchFeeds.rejected', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка при загрузке фидов' }
    };
    const state = itemsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка при загрузке фидов'
    });
  });
});
