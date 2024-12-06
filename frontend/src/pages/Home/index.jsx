import { useListPublications } from '../../hooks/useListPublications'
import { PublicationList } from '../../components/PublicationList'
import { PublicationItem } from '../../components/PublicationItem'
import { PublicationItemSkeleton } from '../../components/loadings-skeleton/PublicationItem'
import { Error } from '../../components/Error'


const Home = () => {
  const { publications, loading, error } = useListPublications()

  return (
    <>   
      <PublicationList >
        {loading &&
          <>
            <PublicationItemSkeleton />
            <PublicationItemSkeleton />
            <PublicationItemSkeleton />
            <PublicationItemSkeleton />
          </>
        }
        {error && <Error message="No se pudieron cargar las publicaciones. Intenta de nuevo más tarde." />}
        {publications.map(({id, title, content, publication_date}) => (
          <PublicationItem 
            key={id}
            id={id}
            title={title}
            content={content}
            publication_date={publication_date}/>
        ))}
      </PublicationList >
    </>
  )
}

export { Home }