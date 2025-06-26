import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/users/userApi';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then((data) => {
        if (data.success) {
          navigate('/');
          window.location.reload();
        }
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
