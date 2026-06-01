import api from './api'

export const registerRequest = (payload) => api.post('/register', payload)
export const loginRequest = (payload) => api.post('/login', payload)
export const logoutRequest = () => api.post('/logout')
export const getUserRequest = () => api.get('/user')
