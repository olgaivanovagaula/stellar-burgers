import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useDispatch, useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const dispatch = useDispatch();

  const ingridients = useSelector((state) => state.ingridients.ingridients);
  const bun = useSelector((state) => state.ingridients.bun);

  const burgerConstructor = { bun, ingridients };

  const ingredientsCounters = useMemo(() => {
    const { bun, ingridients } = burgerConstructor;
    const counters: { [key: string]: number } = {};
    ingridients.forEach((ingridient: TIngredient) => {
      if (!counters[ingridient._id]) counters[ingridient._id] = 0;
      counters[ingridient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
