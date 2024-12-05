import { useListUsers } from '../../hooks/useListUsers'
import { deleteUser } from '../../api/userApi'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const { users, loading, error } = useListUsers()
  const [deletingUserId, setDeletingUserId] = useState(null)
  const [localUsers, setLocalUsers] = useState([])
  
  useEffect(() => {
    if (users) {
        setLocalUsers(users)
    }
  }, [users])

  const handleDelete = async (userId) => {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este usuario?')
    if (confirmed) {
      try {
        setDeletingUserId(userId)
        await deleteUser(userId)        
        setLocalUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
      } catch (err) {
        console.error('Error al eliminar el usuario:', err)        
      } finally {
        setDeletingUserId(null)
      }
    }
  }

  return (
    <section className="p-6 min-h-screen bg-gray-100">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard de Administración</h1>
        <p className="text-gray-500">Gestión de usuarios</p>
      </header>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">Hubo un error al cargar los usuarios.</p>}
      {!loading && !error && (
        <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nickname</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Borrar cuenta</th>
            </tr>
          </thead>
          <tbody>
            {localUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.nick_name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <button
                    type="button"
                    onClick={() => handleDelete(user.id)}
                    className={`px-4 py-2 rounded ${
                      deletingUserId === user.id
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                    disabled={deletingUserId === user.id}
                  >
                    {deletingUserId === user.id ? 'Eliminando...' : 'Borrar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export { Dashboard }
