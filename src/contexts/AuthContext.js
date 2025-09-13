import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const login = useCallback((newToken) => {
    localStorage.setItem('jwtToken', newToken);
    setToken(newToken);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};