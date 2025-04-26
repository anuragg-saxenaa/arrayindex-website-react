import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useAdminAuth } from '../context/AdminAuthContext';

const navigation = [
  { name: 'We create digital experiences', href: '/' },
  { name: 'Our Services', href: '/services' },
  { name: 'Selected Work', href: '/works' },
  { name: 'About Us', href: '/about' },
  { name: 'Development Tools', href: '/tools' },
  { name: 'Get in Touch', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdminAuthenticated, adminLogout } = useAdminAuth();

  const isActive = (path: string) => {
    // Consider admin routes to match corresponding main site routes for highlighting purposes
    if (location.pathname.startsWith('/admin') && path === '/') {
      return location.pathname === '/admin';
    }
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img
                className="h-10 w-auto object-contain"
                src="/img/logo.png"
                alt="arrayindex"
              />
              <span className="text-white text-xl font-bold">arrayindex</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-xs font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-color'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className={`text-xs font-medium transition-colors ${
                isActive('/login')
                  ? 'text-primary-color'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Sign in
            </Link>
          </div>
          
          {/* Admin Controls (Desktop) */}
          {isAdminAuthenticated && (
            <div className="hidden md:flex items-center ml-4">
              <div className="px-3 py-1 bg-primary-color/20 rounded-full flex items-center space-x-2">
                <Link
                  to="/admin"
                  className="text-xs font-medium text-primary-color hover:text-white transition-colors"
                >
                  Admin
                </Link>
                <span className="text-white/30">|</span>
                <button
                  onClick={adminLogout}
                  className="text-xs font-medium text-primary-color hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-color"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'text-primary-color bg-white/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/login')
                  ? 'text-primary-color bg-white/5'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign in
            </Link>
            
            {/* Admin Controls (Mobile) */}
            {isAdminAuthenticated && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="px-3 py-2 text-xs uppercase text-gray-400 font-semibold">Admin</div>
                <Link
                  to="/admin"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-primary-color hover:text-white hover:bg-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
                <button
                  onClick={() => {
                    adminLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary-color hover:text-white hover:bg-white/5"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 