import { apiClient } from './apiClient'

const ENDPOINT = '/user'

const login = (data) => apiClient.post(`${ENDPOINT}/login`, data)
const logout = () => apiClient.post(`${ENDPOINT}/logout`)

const getUser = (id) => apiClient.get(`${ENDPOINT}/${id}`)
const postUser = (data) => apiClient.post(ENDPOINT, data)
const patchUser = (id, data) => apiClient.patch(`${ENDPOINT}/${id}`, data)

export {
  login,
  logout,
  getUser,
  postUser,
  patchUser
}