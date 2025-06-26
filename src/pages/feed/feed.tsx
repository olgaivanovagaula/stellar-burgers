import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
// import { fetchOrders } from '../../services/slices/orders/orderApi';
import { useEffect, useCallback } from 'react';
// import {Informer} from '@ui'
import { fetchFeeds } from '../../services/slices/feeds/feedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.feed.listItems);
  const ordersError = useSelector((state) => state.feed.isLoading);

  const loading = useSelector((state) => state.orders.isLoading);

  const handleGetFeeds = useCallback(() => dispatch(fetchFeeds()), []);
  useEffect(() => {
    handleGetFeeds();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  if (ordersError) {
    return <h1>{ordersError}</h1>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
