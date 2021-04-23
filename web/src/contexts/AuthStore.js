import { createContext, useState, useCallback, useEffect } from 'react';

import { currentUserStorageKey, currentReservationStorageKey} from '../services/base-api-service';

const AuthContext = createContext();

function AuthStore({ children }) {

  const [user, setUser] = useState(localStorage.getItem(currentUserStorageKey) ? JSON.parse(localStorage.getItem(currentUserStorageKey)) : undefined);
  const [reservation , setReservation] = useState(localStorage.getItem(currentReservationStorageKey) ? JSON.parse(localStorage.getItem(currentReservationStorageKey)) : undefined);


  const handleUserChange = useCallback((user) => {
    if (user) {
      
      
      localStorage.setItem(currentUserStorageKey, JSON.stringify(user));
      // localStorage.setItem(currentUserStorageKey, moment(new Date()));
    }
    else localStorage.removeItem(currentUserStorageKey);
    setUser(user);
    //aqui borramos la fecha tambien
  }, []);


  const handleReservationChange = useCallback((reservation) => {
    if (reservation) {
      
      localStorage.setItem(currentReservationStorageKey, JSON.stringify(reservation));
    }
    else localStorage.removeItem(currentReservationStorageKey);
    setReservation(reservation);
  }, []);

  const isAuthenticated = useCallback(() => {
    return user && user.email;
  }, [user])

  const isCompany = useCallback(() => {
      return user?.role==='company';
  }, [user])

  const thereIsReservation = useCallback(()=> {
    return reservation;
  }, [reservation])


  // useEffect(() => {
  //   async function fetch() {
  //     const user = await profile()

  //     onUserChange(user)
  //   }

  //   fetch()
  // }, [onUserChange])
/* useeffect leer dl localstorage que mire la fecha de inicio de la cookie 
no tiene dependencias
comparo fecha con los 3600000ms ( lo normal es una semana ) que dura la coockie . Si ha caducado llamo al handle Userchange   (para probar probar con un minuto)*/




  return (
    <AuthContext.Provider value={{ user, reservation,  isAuthenticated, isCompany, thereIsReservation , onUserChange: handleUserChange, onReservationChange: handleReservationChange }} >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthStore as default, AuthContext };
