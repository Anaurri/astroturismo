import { createContext, useState, useCallback } from 'react';

import { currentUserStorageKey } from '../services/base-api-service';

const AuthContext = createContext();

function AuthStore({ children }) {

  const [user, setUser] = useState(localStorage.getItem(currentUserStorageKey) ? JSON.parse(localStorage.getItem(currentUserStorageKey)) : undefined);

  const handleUserChange = useCallback((user) => {
    if (user) localStorage.setItem(currentUserStorageKey, JSON.stringify(user));
    else localStorage.removeItem(currentUserStorageKey);
    setUser(user);
  }, []);

  const isAuthenticated = useCallback(() => {
    return user && user.email;
  }, [user])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, onUserChange: handleUserChange }} >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthStore as default, AuthContext };
