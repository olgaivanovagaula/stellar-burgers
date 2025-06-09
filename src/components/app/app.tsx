import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';

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

const App = () => {
  const navigate = useNavigate();

  const onCloseModal = () => {
    navigate(-1);
  };
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />

        {/* Модальные окна */}

        <Route
          path='/feed/:number'
          element={
            <Modal title='Детали заказа' onClose={onCloseModal}>
              <OrderInfo />{' '}
            </Modal>
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
