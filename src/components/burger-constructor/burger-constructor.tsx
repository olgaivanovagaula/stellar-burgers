import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { handleCloseOrderModal } from '../../services/slices/constructor/constructor';
import { TInitState } from '../../services/slices/ingridients/ingridientsApi';
import { useNavigate } from 'react-router-dom';
import { orderConstructorBurgerApi } from '../../services/slices/constructor/constructor';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector((state) => state.ingridients);
  const user = useSelector((state) => state.user.userData);

  const orderRequest = useSelector(
    (state) => state.constructorBurger.orderRequest
  );

  const orderModalData = useSelector(
    (state) => state.constructorBurger.orderModalData
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
    } else {
      dispatch(
        orderConstructorBurgerApi([
          constructorItems.bun._id,
          ...constructorItems.ingridients.map((ingrid) => ingrid._id),
          constructorItems.bun._id
        ])
      );
    }
  };
  const closeOrderModal = () => {
    dispatch(handleCloseOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingridients?.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
