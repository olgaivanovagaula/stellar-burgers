import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useSelector((state) => state.user.authChecked);
  const user = useSelector((state) => state.user.userData);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '' };
    return <Navigate to={from} replace />;
  }

  return children;
};

export default ProtectedRoute;
