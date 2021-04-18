import http from './base-api-service';

// export const socialLoginUrl = `${process.env.REACT_APP_API_BASE_URL}/authenticate/google`

export const login = (email, password) => http.post('/login', { email, password })

export const profile = () => http.get('/profile')

export const register = (user) => http.post('/register', user)

export const logout = () => http.post('/logout')

export const update = () => http.patch('/profile/update')

