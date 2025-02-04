import React from 'react';
import { Navigate } from 'react-router-dom';
import useStore from '../../zustand/useStore';

const PrivateRoute = ({ allowedRoles, children }) => {
  const { user } = useStore();
  return allowedRoles.includes(user?.user?.role) ? children : <Navigate to="/green_syria"/>;
  // return children;
};

export default PrivateRoute;
