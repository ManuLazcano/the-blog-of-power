import { apiClient } from './apiClient'

const ENDPOINT = '/user'

const login = (data) => apiClient.post(`${ENDPOINT}/login`, data)
const logout = () => apiClient.post(`${ENDPOINT}/logout`)

const postUser = (data) => apiClient.post(ENDPOINT, data)

export {
  login,
  logout,
  postUser
}