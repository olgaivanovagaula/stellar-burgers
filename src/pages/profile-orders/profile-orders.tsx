import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders } from '../../services/slices/orders/shippingData';
import { useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.myOrders.orders);
  const loading = useSelector((state) => state.myOrders.isLoading);
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  return <ProfileOrdersUI orders={orders} loading={loading} />;
};
