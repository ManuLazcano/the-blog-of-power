import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPublication } from '../api/publicationApi'

export const usePublication = () => {
  const { id } = useParams()
  const [publication, setPublication] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPublication = async () => {
      setLoading(true)
      try {
        const response = await getPublication(id)
        setPublication(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPublication()
  }, [id])

  return { publication, loading, error }
}