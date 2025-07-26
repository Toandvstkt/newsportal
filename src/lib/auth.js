
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { users, roles } from '../data/mockData';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
export const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    permissions: user.permissions,
    iat: Math.floor(Date.now() / 1000),
  };

  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: JWT_EXPIRES_IN,
    algorithm: 'HS256'
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const authenticateUser = async (email, password) => {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    throw new Error('User not found');
  }

  const isValidPassword = password === user.password;
  
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  const { password: _, ...userWithoutPassword } = user;
  
  return userWithoutPassword;
};

export const getUserById = (id) => {
  const user = users.find(u => u.id === parseInt(id));
  if (!user) return null;
  
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const hasPermission = (user, permission) => {
  return user.permissions && user.permissions.includes(permission);
};

export const hasRole = (user, requiredRole) => {
  const userRole = roles[user.role];
  const requiredRoleData = roles[requiredRole];
  
  return userRole && userRole.level >= requiredRoleData.level;
};

export const requireAuth = (requiredPermission = null, requiredRole = null) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
          success: false, 
          message: 'Access denied. No token provided.' 
        });
      }

      const token = authHeader.substring(7);
      const decoded = verifyToken(token);
      
  
      req.user = decoded;

  
      if (requiredPermission && !hasPermission(decoded, requiredPermission)) {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied. Insufficient permissions.' 
        });
      }

  
      if (requiredRole && !hasRole(decoded, requiredRole)) {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied. Insufficient role level.' 
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token.' 
      });
    }
  };
};

export const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

export const TokenManager = {
  saveToken: (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt_token', token);
  
      sessionStorage.setItem('jwt_token', token);
    }
  },

  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jwt_token') || sessionStorage.getItem('jwt_token');
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt_token');
      sessionStorage.removeItem('jwt_token');
    }
  },

  isAuthenticated: () => {
    const token = TokenManager.getToken();
    if (!token) return false;

    try {
      const decoded = jwt.decode(token);
      const currentTime = Date.now() / 1000;
      
      return decoded.exp > currentTime;
    } catch {
      return false;
    }
  },

  getUser: () => {
    const token = TokenManager.getToken();
    if (!token) return null;

    try {
      return jwt.decode(token);
    } catch {
      return null;
    }
  }
};