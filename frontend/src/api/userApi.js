import { apiClient } from './apiClient'

const ENDPOINT = '/user'

const login = (data) => apiClient.post(`${ENDPOINT}/login`, data)
const logout = () => apiClient.post(`${ENDPOINT}/logout`)

const getAllUser = () => apiClient.get(ENDPOINT)
const getUser = (id) => apiClient.get(`${ENDPOINT}/${id}`)
const postUser = (data) => apiClient.post(ENDPOINT, data)
const patchUser = (id, data) => apiClient.patch(`${ENDPOINT}/${id}`, data)
const deleteUser = (id) => apiClient.delete(`${ENDPOINT}/${id}`)

export {
  login,
  logout,
  getAllUser,
  getUser,
  postUser,
  patchUser,
  deleteUser
}