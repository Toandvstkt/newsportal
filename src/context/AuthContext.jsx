
'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { TokenManager } from '../lib/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = TokenManager.getToken();
      
      if (!token) {
        setLoading(false);
        return;
      }

  
      const response = await fetch('/api/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data.user);
        setIsAuthenticated(true);
      } else {
    
        TokenManager.removeToken();
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      TokenManager.removeToken();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
    
        TokenManager.saveToken(data.data.token);
        
    
        setUser(data.data.user);
        setIsAuthenticated(true);
        
        return { success: true, user: data.data.user };
      } else {
        throw new Error(data.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      const token = TokenManager.getToken();
      
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
  
      TokenManager.removeToken();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  const hasRole = (role) => {
    if (!user) return false;
    
    const roleLevels = {
      guest: 0,
      registered: 1,
      editor: 2,
      admin: 3
    };

    const userLevel = roleLevels[user.role] || 0;
    const requiredLevel = roleLevels[role] || 0;

    return userLevel >= requiredLevel;
  };

  const hasAnyRole = (roles) => {
    return roles.some(role => hasRole(role));
  };

  const hasAllPermissions = (permissions) => {
    return permissions.every(permission => hasPermission(permission));
  };

  const canAccess = (requiredPermission, requiredRole = null) => {
    if (requiredRole && !hasRole(requiredRole)) {
      return false;
    }
    
    if (requiredPermission && !hasPermission(requiredPermission)) {
      return false;
    }

    return true;
  };

  const value = {

    user,
    loading,
    isAuthenticated,
    

    login,
    logout,
    updateUser,
    checkAuthStatus,
    

    hasPermission,
    hasRole,
    hasAnyRole,
    hasAllPermissions,
    canAccess,
    

    isAdmin: () => hasRole('admin'),
    isEditor: () => hasRole('editor'),
    isRegistered: () => hasRole('registered'),
    isGuest: () => user?.role === 'guest',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};