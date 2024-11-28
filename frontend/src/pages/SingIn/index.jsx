import { useState } from 'react'
import { login } from '../../api/loginApi'

const SingIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación simple
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    try {
      setError(''); 
      const response = await login({ email, password})

      if (!response) {
        throw new Error('Credenciales inválidas');
      }

      console.log('Inicio de sesión exitoso:', response.data);
      // TODO: Redirigir al Home
    } catch (err) {
      setError(err.message || 'Hubo un error al iniciar sesión');
    }
  };

  return (
    <div className="w-full flex items-center justify-center h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Iniciar sesión
          </button>
          <a // TODO: Link
            href="/register" 
            className="inline-block align-baseline font-bold text-md text-gray-500 hover:text-gray-800 self-center"
          >
            Crear cuenta
          </a>
        </div>
      </form>
    </div>
  )
}

export { SingIn }