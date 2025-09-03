import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    checkAuth();
    setupAxiosInterceptors();
  }, []);

  const setupAxiosInterceptors = () => {
    // Response interceptor to handle token expiration
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && 
            error.response?.data?.code === 'TOKEN_EXPIRED' && 
            !originalRequest._retry && 
            !isRefreshing) {
          
          originalRequest._retry = true;
          setIsRefreshing(true);
          
          const refreshed = await refreshAccessToken();
          setIsRefreshing(false);
          
          if (refreshed) {
            const token = localStorage.getItem('adminToken');
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axios(originalRequest);
          }
        }
        
        return Promise.reject(error);
      }
    );
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get('/auth/me');
        if (response.data.success) {
          setUser(response.data.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        if (error.response?.data?.code === 'TOKEN_EXPIRED') {
          // Try to refresh token
          const refreshed = await refreshAccessToken();
          if (!refreshed) {
            clearAuth();
          }
        } else {
          clearAuth();
        }
      }
    }
    setLoading(false);
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('/auth/refresh');
      if (response.data.success) {
        const { accessToken, user } = response.data.data;
        localStorage.setItem('adminToken', accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setUser(user);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
    return false;
  };

  const clearAuth = () => {
    localStorage.removeItem('adminToken');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      if (response.data.success) {
        const { accessToken, user } = response.data.data;
        localStorage.setItem('adminToken', accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setUser(user);
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuth();
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    refreshAccessToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};