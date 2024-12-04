import { useUser } from '../../hooks/useUser'

const Perfil = () => {
  const { user, loading, error } = useUser()

  return (
    <section className="h-screen w-full p-6 flex items-center justify-center">
      {loading && <p>Cargando...</p> /**TODO: Crear su propio componente */}
      {error && <p>Hubo un error</p> /**TODO: Crear su propio componente */}
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
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
               onClick={() => console.log('Editar perfil')}
            >
              Editar Perfil
            </button>
          </footer>
        </article>
      }
    </section>
  )
}

export { Perfil }