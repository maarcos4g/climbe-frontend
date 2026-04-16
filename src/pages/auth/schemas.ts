import { z } from "zod/v4"

export const signInSchema = z.object({
  email: z.email('Insira um e-mail válido'),
  password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres')
})

export const resetPasswordSchema = z.object({
  email: z.email('Insira um e-mail válido'),
})

export type SignInSchema = z.infer<typeof signInSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>