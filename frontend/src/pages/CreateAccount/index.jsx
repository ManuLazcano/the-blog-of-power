import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { useNavigate } from 'react-router-dom'
import { postUser } from '../../api/userApi'

const userSchema = z.object({
  nick_name: z.string()
    .min(1, 'El campo "ninck_name" no puede estar vacío')
    .max(30, 'El campo "ninck_name" no debe exceder los 30 caracteres'),
  name: z.string()
    .min(1, 'El campo "name" no puede estar vacío')
    .max(50, 'El campo "name" no debe exceder los 50 caracteres'),
  email: z.string()
    .email('El correo electrónico no es válido')
    .min(1, 'Ingrese un email')
    .max(60, 'El "email" no debe exceder los 60 caracteres'),
  password: z.string().min(1, 'Ingrese una contraseña')   
}) // TODO FIX: No puedo importar el esquema 'userSchema' del esquema que se comparte de manera global

const CreateAccount = () => {
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(userSchema) })
  const navigate = useNavigate()
  
  const onSubmit = async (data) => {
    try {
      setError('')
      const response = await postUser(data)      
  
      if (!response) {
        throw new Error('No se pudo crear la cuenta')
      }
  
      alert('Cuenta creada exitosamente. Por favor, inicia sesión.')
      navigate('/login')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="w-full flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
          <input
            type="text"
            id="name"
            {...register('name')}
            placeholder="Tu nombre"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="nick_name" className="block text-gray-700 text-sm font-bold mb-2">Nombre de usuario:</label>
          <input
            type="text"
            id="nick_name"
            {...register('nick_name')}
            placeholder="Nombre de usuario"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.nick_name.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            placeholder="Tu email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña:</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            placeholder="Crea una contraseña"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Crear Cuenta
          </button>
        </div>
      </form>
    </div>
  )
}

export { CreateAccount }