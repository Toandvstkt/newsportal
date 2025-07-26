

'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ 
  children, 
  requiredPermission = null, 
  requiredRole = null,
  fallbackPath = '/login',
  loadingComponent = null 
}) {
  const { user, isAuthenticated, loading, canAccess } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(fallbackPath);
        return;
      }

      if (!canAccess(requiredPermission, requiredRole)) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isAuthenticated, loading, user, requiredPermission, requiredRole, router, fallbackPath, canAccess]);

  
  if (loading) {
    return loadingComponent || (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  
  if (!isAuthenticated || !canAccess(requiredPermission, requiredRole)) {
    return null;
  }

  return children;
}


export const withAuth = (WrappedComponent, options = {}) => {
  return function AuthorizedComponent(props) {
    return (
      <ProtectedRoute {...options}>
        <WrappedComponent {...props} />
      </ProtectedRoute>
    );
  };
};


export const AdminRoute = ({ children }) => (
  <ProtectedRoute requiredRole="admin">
    {children}
  </ProtectedRoute>
);

export const EditorRoute = ({ children }) => (
  <ProtectedRoute requiredRole="editor">
    {children}
  </ProtectedRoute>
);

export const RegisteredRoute = ({ children }) => (
  <ProtectedRoute requiredRole="registered">
    {children}
  </ProtectedRoute>
);