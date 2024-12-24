import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


import { login } from '../../api/userApi'
import { AuthContext } from '../../context/authContex'
import { loginSchema } from '../../schemas/user'

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors} } = useForm({ resolver: zodResolver(loginSchema) })
    const [error, setError] = useState('');
    
    const { setUserAuth } = useContext(AuthContext)
    const navigate = useNavigate()
  
    const onSubmit = async (data) => {
      try {
        setError(''); 
        const response = await login(data)
  
        if (!response) {
          throw new Error('Credenciales inválidas');
        }
  
        setUserAuth(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
        
        navigate('/')
      } catch (err) {
        setError(err.message || 'Hubo un error al iniciar sesión');
      }
    };
  
    return (
      <div className="w-full flex items-center justify-center h-screen bg-gray-100">
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          
          <div className="mb-4">
            <label 
              htmlFor="email" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}            
              placeholder="Ingresa tu email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
  
          <div className="mb-4">
            <label 
              htmlFor="password" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}            
              placeholder="Ingresa tu contraseña"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
  
          <div className="mt-6 flex flex-col gap-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Iniciar sesión
            </button>
            <Link
              to={'/createAccount'}
              className="inline-block align-baseline font-bold text-md text-gray-500 hover:text-gray-800 self-center"
            >
              Crear cuenta
            </Link>
          </div>
        </form>
      </div>
    )
}

export { LoginForm }