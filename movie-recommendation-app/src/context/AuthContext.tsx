import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getUserFromLocalStorage, getThemeFromLocalStorage, saveThemeToLocalStorage, saveUserToLocalStorage, removeUserFromLocalStorage } from '../utils/authUtils';

// Define the shape of our context
interface AuthContextType {
  user: any;
  login: (userData: any) => void;
  logout: () => void;
  theme: string;
  toggleTheme: () => void;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  theme: 'light',
  toggleTheme: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

// Create the provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [theme, setTheme] = useState(getThemeFromLocalStorage());

  // Apply theme to the document
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    saveThemeToLocalStorage(theme);
  }, [theme]);

  // Login function
  const login = (userData: any) => {
    setUser(userData);
    saveUserToLocalStorage(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    removeUserFromLocalStorage();
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const value = {
    user,
    login,
    logout,
    theme,
    toggleTheme,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  return React.useContext(AuthContext);
}; 