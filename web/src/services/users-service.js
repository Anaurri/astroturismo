
import http from './base-api-service';

// export const socialLoginUrl = `${process.env.REACT_APP_API_BASE_URL}/authenticate/google`

export const login = (email, password) => http.post('/login', { email, password })

export const profile = () => http.get('/profile')

export const register = (user) => http.post('/register', user)

export const logout = () => http.post('/logout')

/*Cuando tenemos FILES tenemos que enviar a la API un objeto como FormData*/
export const update = (user) => {

    const data = new FormData()
  
    Object.keys(user).forEach(key => {
      if (Array.isArray(user[key])) {
        user[key].forEach(value => data.append(`${key}[]`, value))
      } else data.append(key, user[key])
    })
  
    return http.patch('/profile/update', data)
  }