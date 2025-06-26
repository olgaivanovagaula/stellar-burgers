import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id: ingridientId } = useParams();
  const ingredients = useSelector(
    (state) => state.ingridients_loader.ingridients
  );

  const ingredientData = ingredients.find((el) => el._id === ingridientId);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
