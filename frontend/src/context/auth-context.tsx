import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (name: string) => void;
  logout: () => void;
  name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const login = (userName: string) => {
    setIsLoggedIn(true);
    setName(userName);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setName('');
  };

  return <AuthContext.Provider value={{ isLoggedIn, login, logout, name }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
