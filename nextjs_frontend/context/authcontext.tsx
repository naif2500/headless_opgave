// context/AuthContext.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({ isLoggedIn: false, user: null });

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check for token on load
    const token = document.cookie.includes('auth_token=');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};