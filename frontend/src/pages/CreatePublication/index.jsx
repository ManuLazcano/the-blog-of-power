import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { postPublication } from '../../api/publicationApi'

const publicationSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  content: z.string().min(20, 'El contenido debe tener al menos 20 caracteres'),
  federation: z.string().min(1, 'Debes seleccionar una federación')
})

const CreatePublication = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(publicationSchema),
  })

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      FederationId: parseInt(data.federation, 10)    
    }
  
    try {
      await postPublication(payload)
      navigate('/')
    } catch (err) {
      console.error(err)      
    }
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <section className="w-full">      
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-6 rounded shadow-md max-w-md w-full mx-auto md:max-w-2xl"
      >
        <h1 className="text-2xl font-bold mb-4">Crear publicación</h1>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Título</label>
          <input 
            className="w-full border border-gray-300 rounded px-3 py-2"
            id="title" 
            type="text"
            placeholder='Debe tener más de 5 caracteres'
            {...register('title')}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700">Contenido</label>
          <textarea 
            className="w-full resize-none border border-gray-300 rounded px-3 py-2 h-56 md:h-80"
            id="content"
            placeholder='El contenido debe tener más de 20 caracteres'
            {...register('content')}
          />
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="federation" className="block text-gray-700">Federación</label>
          <select 
            className="w-full border border-gray-300 rounded px-3 py-2"
            id="federation"
            {...register('federation')}
          >
            <option value="1">IPF</option>
            <option value="2">WRPF</option>
            <option value="3">IPL</option>
            <option value="4">AAP</option>
          </select>
          {errors.federation && <p className="text-red-500 text-sm">{errors.federation.message}</p>}
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
    </section>
  )
}

export { CreatePublication }