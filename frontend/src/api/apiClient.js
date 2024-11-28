import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la solicitud: ', error.response?.data?.message || error.message)    
  }
)

export { apiClient }