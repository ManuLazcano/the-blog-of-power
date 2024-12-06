import z from 'zod'

const userSchema = z.object({
  nick_name: z.string()
    .min(3,  'El nickname debe tener al menos 3 caracteres')
    .max(30, 'El nickname no debe exceder los 30 caracteres'),
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El campo nombre no debe exceder los 50 caracteres'),
  email: z.string()
    .email('El correo electrónico no es válido')
    .min(1, 'Ingrese un email')
    .max(60, 'El email no debe exceder los 60 caracteres'),
  password: z.string().min(1, 'Ingrese una contraseña')
})

const loginSchema = userSchema.pick({
  email: true,
  password: true
})

const editSchema = userSchema.pick({
  nick_name: true,
  name: true,
  email: true
})

export {
  userSchema,
  loginSchema,
  editSchema
}