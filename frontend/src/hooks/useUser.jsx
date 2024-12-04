import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUser } from '../api/userApi'

export const useUser = () => {
  const { id } = useParams()
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const response = await getUser(id)
        setUser(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  return { user, loading, error }
}