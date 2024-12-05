import { useEffect, useState } from 'react'
import { getAllUser } from '../api/userApi'

export const useListUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
 
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await getAllUser()
        setUsers(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])
  
  return { users, loading, error }
}