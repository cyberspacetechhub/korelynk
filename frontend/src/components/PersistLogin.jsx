import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, refreshAccessToken } = useAuth();
  const persist = JSON.parse(localStorage.getItem('persist') || 'false');

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        if (persist && !isAuthenticated) {
          await refreshAccessToken();
        }
      } catch (err) {
        console.error('Token refresh error:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (!isAuthenticated && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, persist, refreshAccessToken]);

  if (!persist) {
    return <Outlet />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return <Outlet />;
};

export default PersistLogin;