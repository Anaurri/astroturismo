import { createContext, useState, useCallback, useEffect } from 'react';
import { currentUserStorageKey, currentReservationStorageKey, currentStartSessionStorageKey } from '../services/base-api-service';
const moment = require('moment');

const AuthContext = createContext();

function AuthStore({ children }) {

  const [user, setUser] = useState(localStorage.getItem(currentUserStorageKey) ? JSON.parse(localStorage.getItem(currentUserStorageKey)) : undefined);
  const [reservation, setReservation] = useState(localStorage.getItem(currentReservationStorageKey) ? JSON.parse(localStorage.getItem(currentReservationStorageKey)) : undefined);
  const [startSession, setSession] = useState(localStorage.getItem(currentStartSessionStorageKey) ? localStorage.getItem(currentStartSessionStorageKey) : 0);



  const handleUserChange = useCallback((user) => {


    console.log("y ahora entra al handleuserChange")
    if (user) {
      localStorage.setItem(currentUserStorageKey, JSON.stringify(user));
      localStorage.setItem(currentStartSessionStorageKey, new Date());
    }
    else {
      localStorage.removeItem(currentUserStorageKey);
      localStorage.removeItem(currentStartSessionStorageKey);
      localStorage.removeItem(currentReservationStorageKey);

    }
    setUser(user);
    setSession(startSession);

  }, []);


  const handleReservationChange = useCallback((reservation) => {
    if (reservation) {

      localStorage.setItem(currentReservationStorageKey, JSON.stringify(reservation));
    }
    else localStorage.removeItem(currentReservationStorageKey);
    setReservation(reservation);
  }, []);


  const sessionEnded = useCallback(() => {
    const timeToSession = Date.parse(startSession) + 60000  //luego cambiar este valor
    const now = new Date()

    console.log(Date.parse(startSession))
    console.log(Number(timeToSession))
    console.log(Number(now))

    return false

    // return now > timeToSession
  }, []);

  const isAuthenticated = useCallback(() => {
    return user && user.email;
  }, [user])

  const isCompany = useCallback(() => {
    return user?.role === 'company';
  }, [user])

  const thereIsReservation = useCallback(() => {
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
    <AuthContext.Provider value={{ user, reservation, isAuthenticated, isCompany, thereIsReservation, onUserChange: handleUserChange, onReservationChange: handleReservationChange, sessionEnded }} >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthStore as default, AuthContext };
