import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deletePublication } from '../../api/publicationApi'
import { usePublication } from '../../hooks/usePublication'
import { PublicationDetailSkeleton } from '../loadings-skeleton/PublicationDetail'
import { Error } from '../Error'

const PublicationDetail = () => {
  const { publication, loading, error } = usePublication()
  const [deleteError, setDeleteError] = useState(null)
  const navigate = useNavigate()

  const handleDelete = async () => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta publicación?") // TODO: Usar un modal
    
    if(confirmed) {
      try {
        const response = await deletePublication(publication.id)                
        
        if(response.status === 200) {
          navigate('/')
        }        
      } catch (error) {
        console.error(error)
        setDeleteError("Ocurrió un error al eliminar la publicación")
      }
    }
  }

  return (
    <section className="h-screen w-full">
      {loading && <PublicationDetailSkeleton />}
      {error && <Error message="No se pudo cargar el detalle de la publicación. Por favor, intenta nuevamente más tarde." />}
      {!loading && !error && publication &&         
        <article className="bg-white shadow-md rounded-lg w-full p-6 max-w-2xl mx-auto h-auto min-h-[500px] sm:min-h-[600px] flex flex-col">
        <header>
          <h1 className="text-3xl font-bold mb-4 text-gray-800 break-words">{publication.title}</h1>
        </header>
        <p className="text-gray-700 leading-relaxed mb-6 flex-grow break-words">{publication.content}</p>
        <footer>
        {publication.hasPermissions &&         
          <div className="flex justify-between">
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleDelete}>
                Eliminar
            </button>            
            <Link
              to={`/editPublication/${publication.id}`}
              className="min-w-[88.27px] bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Editar
            </Link>
          </div>
        }      
          {deleteError && <p className="text-red-500 mt-2">{deleteError}</p>}
          <div className="mt-4 text-sm text-gray-500 border-t pt-2 flex justify-between">
            <span>Publicado el: <span className="font-medium">{publication.publication_date}</span></span>
            <span className="font-medium">{publication.federationName}</span>
          </div>
        </footer>
      </article>
      }          
    </section>
  )
}

export { PublicationDetail }