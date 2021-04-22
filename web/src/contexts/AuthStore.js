import { createContext, useState, useCallback } from 'react';

import { currentUserStorageKey } from '../services/base-api-service';

const AuthContext = createContext();

function AuthStore({ children }) {

  const [user, setUser] = useState(localStorage.getItem(currentUserStorageKey) ? JSON.parse(localStorage.getItem(currentUserStorageKey)) : undefined);

  const handleUserChange = useCallback((user) => {
    if (user) {
      
      localStorage.setItem(currentUserStorageKey, JSON.stringify(user));
   // localStorage.setItem(currentUserStorageKey, new Date()) poner con buen formato de fecha (moment);
    }
    else localStorage.removeItem(currentUserStorageKey);
    setUser(user);
    //aqui borramos la fecha tambien
  }, []);

  const isAuthenticated = useCallback(() => {
    return user && user.email;
  }, [user])

  const isCompany = useCallback(() => {
      return user?.role==='company';
  }, [user])

/* useeffect leer dl localstorage que mire la fecha de inicio de la cookie 
no tiene dependencias
comparo fecha con los 3600000ms ( lo normal es una semana ) que dura la coockie . Si ha caducado llamo al handle Userchange   (para probar probar con un minuto)*/
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isCompany, onUserChange: handleUserChange }} >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthStore as default, AuthContext };
