import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
export const PrivateRoutes = () => {
  const { user } = useAuthContext();
  const isAuthenticated = user?.data?.emailVerified;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
