import { apiClient } from './apiClient'

const ENDPOINT = '/user'

const login = (data) => apiClient.post(`${ENDPOINT}/login`, data)
const logout = () => apiClient.post(`${ENDPOINT}/logout`)

export {
  login,
  logout
}