import { usePublication } from '../../hooks/usePublication'

const PublicationDetail = () => {
  const { publication, loading, error } = usePublication()

  return (
    <section className='h-screen'>
      {loading && <p>Cargando...</p> /**TODO: Crear su propio componente */}
      {error && <p>Hubo un error</p> /**TODO: Crear su propio componente */}
      {!loading && publication &&         
        <article className="bg-white shadow-md rounded-lg w-full p-6 max-w-2xl mx-auto h-auto min-h-[500px] sm:min-h-[600px] flex flex-col">
        <header>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{publication.title}</h1>
        </header>
        <p className="text-gray-700 leading-relaxed mb-6 flex-grow">{publication.content}</p>
        <footer className="mt-4 text-sm text-gray-500 border-t pt-2">
          Publicado el: <span className="font-medium">{publication.publication_date}</span>
        </footer>
      </article>
      }    
    </section>
  )
}

export { PublicationDetail }