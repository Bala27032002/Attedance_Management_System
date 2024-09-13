// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem('token');
  let isAuthenticated = false;

  if (authToken) {
    isAuthenticated = true;
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
