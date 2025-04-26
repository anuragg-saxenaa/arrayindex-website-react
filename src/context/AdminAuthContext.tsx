import React, { createContext, useContext, useState, useEffect } from 'react';

// Get admin credentials from environment variables with fallbacks for development
const ADMIN_CREDENTIALS = {
  email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@example.com',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'changeme'
};

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Check if admin is authenticated on initial load
  useEffect(() => {
    const adminAuthStatus = localStorage.getItem('adminAuth');
    if (adminAuthStatus === 'true') {
      setIsAdminAuthenticated(true);
    }
  }, []);

  // Admin login function
  const adminLogin = (email: string, password: string): boolean => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAdminAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      return true;
    }
    return false;
  };

  // Admin logout function
  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  const value = {
    isAdminAuthenticated,
    adminLogin,
    adminLogout
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export default AdminAuthContext;
