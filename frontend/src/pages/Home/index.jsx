import { useListPublications } from '../../hooks/useListPublications'
import { PublicationList } from '../../components/PublicationList'
import { PublicationItem } from '../../components/PublicationItem'


const Home = () => {
  const { publications, loading, error } = useListPublications()

  return (
    <main className='p-4 max-w-max mx-auto'>   
      <PublicationList >
        {loading && <p>Cargando...</p> /**TODO: Crear su propio componente */}
        {error && <p>Hubo un error</p> /**TODO: Crear su propio componente */}
        {publications.map(({id, title, content, publication_date}) => (
          <PublicationItem 
            key={id}
            id={id}
            title={title}
            content={content}
            publication_date={publication_date}/>
        ))}
      </PublicationList >
    </main>
  )
}

export { Home }