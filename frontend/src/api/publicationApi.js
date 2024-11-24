import { apiClient } from './apiClient'

const ENDPOINT = '/publication'

const getPublicacion = () => apiClient.get(ENDPOINT)
const postPublication = (data) => apiClient.post(ENDPOINT, data)
const patchPublication = (id, data) => apiClient.patch(`${ENDPOINT}/${id}`, data)
const deletePublication = (id) => apiClient.delete(`${ENDPOINT}/${id}`)

export {
  getPublicacion,
  postPublication,
  patchPublication,
  deletePublication
}