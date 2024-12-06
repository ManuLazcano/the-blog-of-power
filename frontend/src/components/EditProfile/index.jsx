import { z } from 'zod'
import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUser } from '../../hooks/useUser'
import { deleteUser, logout, patchUser } from '../../api/userApi'
import { AuthContext } from '../../context/authContex'
import { EditProfileSkeleton } from '../loadings-skeleton/EditProfileSkeleton'
import { Error } from '../Error'

const schema = z.object({ // TO-DO: congirar esquema en su respectiva carpeta
  nick_name: z.string().min(3, { message: 'El nickname debe tener al menos 3 caracteres' }),
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Debe ser un correo electrónico válido' })
})

const EditProfile = () => {
  const { id } = useParams()
  const { setUserAuth, userAuth } = useContext(AuthContext)
  const { user, loading, error } = useUser()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nick_name: user?.nick_name || '',
      name: user?.name || '',
      email: user?.email || '',
    }
  })

  useEffect(() => {
    if (user) {
      setValue('nick_name', user.nick_name)
      setValue('name', user.name)
      setValue('email', user.email)
    }        
  }, [user, setValue])

  const onSubmit = async (data) => {    
    try {
      await patchUser(id, data)
      navigate(`/profile/${id}`)
    } catch (err) {
      console.error(err)        
    }    
  }

  const handleCancel = () => {
    navigate(`/profile/${id}`) 
  }

  const handleDeleteAccount = async () => {    
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar la cuenta?") // TODO: Usar un modal

    if (confirmed && userAuth.isAdmin && (id === userAuth.userId)) { // TO-DO: usar un modal
      alert('No puede eliminar su propia cuenta de administrador')
      return
    }

    if(confirmed) {
      try {
        const response = await deleteUser(user.id)         
         
        if (response.status === 200) {
          await logout()
          setUserAuth(null)
          navigate('/')
        }        
      } catch (err) {
        console.error(err)       
      }
    }
  }

  return (
    <section className="w-full max-w-sm flex items-center justify-center bg-gray-100 p-6 mt-8">
      {loading && <EditProfileSkeleton />}
      {error && <Error message="No se pudo cargar el perfil. Por favor, intenta nuevamente más tarde." />}
      {!loading && user && (
        <form
          className="bg-white shadow-md rounded-lg w-full max-w-md p-6 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <header className="mb-4 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Editar Perfil</h1>
            <p className="text-gray-500">Actualiza tu información</p>
          </header>
          <div>
            <label className="block text-gray-600 font-medium">Nickname</label>
            <input
              type="text"
              {...register('nick_name')}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Ingresa tu nickname"
            />
            {errors.nick_name && (
              <p className="text-red-500 text-sm">{errors.nick_name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Nombre</label>
            <input
              type="text"
              {...register('name')}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Ingresa tu nombre"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Ingresa tu email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>          
          <div className="mt-4 text-sm text-gray-500 border-t pt-2 flex justify-center hover:text-gray-900">            
            <button type="button" className="font-medium"
              onClick={handleDeleteAccount}
            >
              Borrar cuenta
            </button>
          </div>
        </form>
      )}
    </section>
  )
}

export { EditProfile }
