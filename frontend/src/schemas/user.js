import z from 'zod'

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
})

const loginSchema = userSchema.pick({
  email: true,
  password: true
})

export {
  userSchema,
  loginSchema
}