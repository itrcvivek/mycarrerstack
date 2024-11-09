import { auth } from './Firebase';  // Import your Firebase authentication instance

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const isAuthenticated = () => {
  const user = getCurrentUser();
  return !!user;
};
