import { NavBar } from './components/NavBar'
import { PublicationItem } from './components/PublicationItem'
import { PublicationList } from './components/PublicationList'
import { useFetchPublication } from './hooks/useFetchPublication'


function App() {
  const { publications, loading, error } = useFetchPublication()

  return (
    <>
      <NavBar />

      <main className='p-4 max-w-max mx-auto'>
        <PublicationList >
          {loading && <p>Cargando...</p> /**TODO: Crear su propio componente */}
          {error && <p>Hubo un error</p> /**TODO: Crear su propio componente */}
          {publications.map(({id, title, content, publication_date}) => (
            <PublicationItem 
              key={id}
              title={title}
              content={content}
              publication_date={publication_date}/>
          ))}
        </PublicationList >
      </main>
    </>
  )
}

export default App
