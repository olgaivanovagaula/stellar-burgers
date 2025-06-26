import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { useEffect } from 'react';
import { fetchIngridients } from '../../services/slices/ingridients/ingridientsApi';

import { AppHeader } from '@components';
import {
  NotFound404,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ProfileOrders,
  ResetPassword,
  Profile
} from '@pages';

import { Modal } from '@components';
import { OrderInfo } from '@components';
import { IngredientDetails } from '@components';

import { useDispatch } from '../../services/store';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import { useSelector } from '../../services/store';

import { getUser } from '../../services/slices/users/userApi';

const App = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onCloseModal = () => {
    navigate(-1);
  };
  useEffect(() => {
    dispatch(fetchIngridients());
    dispatch(getUser());
  }, []);
  const ingredients = useSelector((state) => state.ingridients.ingridients);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route path=':number' element={<OrderInfo />} />
        </Route>
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              {' '}
              <Register />{' '}
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              {' '}
              <ForgotPassword />{' '}
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              {' '}
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              {' '}
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />

        {/* Модальные окна */}

        <Route
          path='/feed/:number'
          element={
            <ProtectedRoute onlyUnAuth>
              <Modal title='Детали заказа' onClose={onCloseModal}>
                <OrderInfo />{' '}
              </Modal>
            </ProtectedRoute>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={onCloseModal}>
              <IngredientDetails />{' '}
            </Modal>
          }
        />
        <Route
          path='/prodile/orders/:number'
          element={
            <Modal title='Детали заказа' onClose={onCloseModal}>
              <OrderInfo />{' '}
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
