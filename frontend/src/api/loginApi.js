import { apiClient } from './apiClient'

const ENDPOINT = '/user/login'

const login = (data) => apiClient.post(ENDPOINT, data)

export {
  login
}