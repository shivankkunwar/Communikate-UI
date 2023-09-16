// src/AuthContext.js
import React, { useState } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setisLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};