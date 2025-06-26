import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useMatch } from 'react-router-dom';
import { fetchOrder } from '../../services/slices/orders/orders';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */

  const orderNumber = useMatch('/feed/:number')
    ? Number(useMatch('/feed/:number')?.params.number)
    : Number(useMatch('/profile/orders/:number')?.params.number);

  const dispatch = useDispatch();

  // const ingredients: TIngredient[] = [];

  const orders = useSelector((state) => state.orders.orders);
  const orderData = orders.find((order) => order.number === orderNumber);
  const ingrdients = useSelector(
    (state) => state.ingridients_loader.ingridients
  );
  useEffect(() => {
    dispatch(fetchOrder(orderNumber));
    console.log(orderNumber);
  }, [orderNumber]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingrdients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingrdients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingrdients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
