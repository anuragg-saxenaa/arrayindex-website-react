import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAdminAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!isAdminAuthenticated) {
    // Redirect to admin login page if not authenticated
    // Store the attempted URL to redirect back after login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
