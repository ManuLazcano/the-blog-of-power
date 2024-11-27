import { apiClient } from './apiClient'

const ENDPOINT = '/publication'

const getAllPublication = () => apiClient.get(ENDPOINT)
const getPublication = (id) => apiClient.get(`${ENDPOINT}/${id}`) 
const postPublication = (data) => apiClient.post(ENDPOINT, data)
const patchPublication = (id, data) => apiClient.patch(`${ENDPOINT}/${id}`, data)
const deletePublication = (id) => apiClient.delete(`${ENDPOINT}/${id}`)

export {
  getAllPublication,
  getPublication,
  postPublication,
  patchPublication,
  deletePublication
}