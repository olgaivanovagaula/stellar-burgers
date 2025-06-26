/*  burgerSlices.test.ts
    ---------------------
    Юнит-тесты для:
      1. burgerIngridSlice      – асинхронная загрузка ингредиентов
      2. createBurgerSlice      – конструктор бургера
*/

import burgerIngridReducer, {
  fetchIngridients,
  TInitState as TIngridState
} from './ingridientsApi';

import burgerConstructorReducer, {
  addItem,
  clearItems,
  deleteItem,
  upItem,
  downItem
} from './ingridients';

import type { TConstructorIngredient } from '@utils-types';

/* ------------------------------------------------------------------ */
/*  Мок-данные для тестов                                              */
/* ------------------------------------------------------------------ */

const sampleBun: TConstructorIngredient = {
  _id: '60666c42cc7b410027a1a9b1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  id: 'bun-1'
};

const ingredientOne: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  id: 'main-1'
};

const ingredientTwo: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0940',
  name: 'Говяжий метеорит (отбивная)',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
  id: 'main-2'
};

/* ------------------------------------------------------------------ */
/* 1.  burgerIngridSlice                                              */
/* ------------------------------------------------------------------ */

describe('burgerIngridSlice', () => {
  const initial: TIngridState = {
    error: null,
    ingridients: [],
    isLoading: false,
    isLoaded: false
  };

  const mockPayload = [sampleBun, ingredientOne, ingredientTwo];

  test('fetchIngridients.pending ➜ isLoading = true', () => {
    const next = burgerIngridReducer(initial, {
      type: fetchIngridients.pending.type
    });
    expect(next).toEqual({
      ...initial,
      isLoading: true,
      error: null
    });
  });

  test('fetchIngridients.fulfilled ➜ данные загружены', () => {
    const next = burgerIngridReducer(initial, {
      type: fetchIngridients.fulfilled.type,
      payload: mockPayload
    });
    expect(next.ingridients).toHaveLength(3);
    expect(next.isLoading).toBe(false);
    expect(next.isLoaded).toBe(true);
    expect(next.error).toBeNull();
  });

  test('fetchIngridients.rejected ➜ ошибка загрузки', () => {
    const next = burgerIngridReducer(initial, {
      type: fetchIngridients.rejected.type,
      error: { message: 'Ошибка сети' }
    });
    expect(next.error).toBe('Ошибка сети');
    expect(next.isLoading).toBe(false);
    expect(next.isLoaded).toBe(false);
  });
});

/* ------------------------------------------------------------------ */
/* 2.  createBurgerSlice (конструктор)                                */
/* ------------------------------------------------------------------ */

describe('createBurgerSlice – конструктор бургера', () => {
  const emptyState = { bun: null, ingridients: [] as TConstructorIngredient[] };

  test('addItem: добавляет булку', () => {
    const next = burgerConstructorReducer(emptyState, addItem(sampleBun));
    expect(next.bun?._id).toBe(sampleBun._id);
  });

  test('addItem: добавляет начинку', () => {
    const next = burgerConstructorReducer(emptyState, addItem(ingredientOne));
    expect(next.ingridients).toHaveLength(1);
  });

  test('deleteItem: удаляет начинку по id', () => {
    const state = {
      bun: sampleBun,
      ingridients: [ingredientOne, ingredientTwo]
    };
    const next = burgerConstructorReducer(
      state,
      deleteItem({ id: 'main-2', type: 'main' })
    );
    expect(next.ingridients).toEqual([ingredientOne]);
  });

  test('upItem: меняет порядок вверх', () => {
    const state = {
      bun: sampleBun,
      ingridients: [ingredientOne, ingredientTwo]
    };
    const next = burgerConstructorReducer(state, upItem({ id: 'main-2' }));
    expect(next.ingridients).toEqual([ingredientTwo, ingredientOne]);
  });

  test('downItem: меняет порядок вниз', () => {
    const state = {
      bun: sampleBun,
      ingridients: [ingredientTwo, ingredientOne]
    };
    const next = burgerConstructorReducer(state, downItem({ id: 'main-2' }));
    expect(next.ingridients).toEqual([ingredientOne, ingredientTwo]);
  });

  test('clearItems: очищает конструктор', () => {
    const filled = { bun: sampleBun, ingridients: [ingredientOne] };
    const next = burgerConstructorReducer(filled, clearItems());
    expect(next).toEqual(emptyState);
  });
});
