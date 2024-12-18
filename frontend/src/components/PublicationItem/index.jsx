import { Link } from 'react-router-dom'

const PublicationItem = ({ id, title, content, publication_date}) => {
  return(
    <article className="w-full max-w-xl shadow-md rounded-lg p-4 bg-white flex flex-col">
      <header>
        <h2 className="text-xl font-bold mb-2 text-gray-800 overflow-hidden">{title}</h2>
      </header>
      <p className="text-gray-700 line-clamp-3 flex-grow">{content}</p>
      <footer className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">{publication_date}</span>
        <Link
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          to={`/publication/${id}`}>
            Leer más
        </Link>
      </footer>
    </article>        
  )
}

export { PublicationItem }