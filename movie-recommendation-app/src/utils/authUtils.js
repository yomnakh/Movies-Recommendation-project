// Authentication and theme utility functions

// User authentication
export const saveUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

// Theme management
export const saveThemeToLocalStorage = (theme) => {
  localStorage.setItem('theme', theme);
};

export const getThemeFromLocalStorage = () => {
  return localStorage.getItem('theme') || 'dark';
}; 