import { z } from 'zod'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUser } from '../../hooks/useUser'
import { patchUser } from '../../api/userApi'

const schema = z.object({
  nick_name: z.string().min(3, { message: 'El nickname debe tener al menos 3 caracteres' }),
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Debe ser un correo electrónico válido' })
})

const EditProfile = () => {
  const { id } = useParams()
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

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      {loading && <p>Cargando...</p> /**TODO: Crear su propio componente */}
      {error && <p>Hubo un error</p> /**TODO: Crear su propio componente */}
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
        </form>
      )}
    </section>
  )
}

export { EditProfile }
