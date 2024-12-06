import { Link } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import { AuthContext } from '../../context/authContex'
import { useContext } from 'react'
import { ProfileSkeleton } from '../../components/loadings-skeleton/ProfileSkeleton'
import { Error } from '../../components/Error'

const Perfil = () => {
  const { user, loading, error } = useUser()
  const { userAuth } = useContext(AuthContext)

  return (
    <section className="w-full p-6 flex items-center justify-center mt-8">
      {loading && <ProfileSkeleton />} 
      {error && <Error message="Hubo un error al cargar el perfil." />}
      {!loading && user &&
        <article className="bg-white shadow-md rounded-lg w-full max-w-sm p-6 mx-auto">
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Perfil de Usuario</h1>
            <p className="text-gray-500">Información personal</p>
          </header>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium">Nickname</label>
              <p className="bg-gray-100 border border-gray-300 rounded px-4 py-2">{user.nick_name}</p>
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Nombre</label>
              <p className="bg-gray-100 border border-gray-300 rounded px-4 py-2">{user.name}</p>
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <p className="bg-gray-100 border border-gray-300 rounded px-4 py-2">{user.email}</p>
            </div>
          </div>
          <footer className="mt-6 text-center">
            <Link to={`/editProfile/${userAuth.userId}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"               
            >
              Editar Perfil
            </Link>
          </footer>
        </article>
      }
    </section>
  )
}

export { Perfil }