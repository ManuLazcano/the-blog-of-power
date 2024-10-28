import z from 'zod'

const publicationSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  content: z.string().min(20, 'El contenido debe tener al menos 20 caracteres'),
  UserId: z.string().uuid('El ID de usuario debe ser un UUID válido'),
  FederationId: z.number().int().positive('El ID de federación debe ser un número entero positivo')
})

export const validatePublication = (object) => {
  return publicationSchema.safeParse(object)
}

export const validateParcialPublication = (object) => {
  return publicationSchema.partial().safeParse(object)
}
