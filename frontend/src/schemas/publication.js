import z from 'zod'

export const publicationSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  content: z.string().min(20, 'El contenido debe tener al menos 20 caracteres'),
  federation: z.enum(['1', '2', '3', '4'], {
    required_error: 'La federación seleccionada no es válida',
  })
})
  