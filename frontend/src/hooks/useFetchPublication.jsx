import { useEffect, useState } from 'react'
import { getPublicacion } from '../api/publicationApi'

export const useFetchPublication = () => {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPublications = async () => {
        setLoading(true)
        try {
            const response = await getPublicacion()
            setPublications(response.data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    fetchPublications()
  }, [])

  return { publications, loading, error }
}