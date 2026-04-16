import { resetPasswordSchema, signInSchema, type ResetPasswordSchema, type SignInSchema } from "./schemas";

export async function handleAuthenticate(
  data: FormData,
  authenticate: (variables: SignInSchema) => Promise<void>
) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  try {
    console.log(result.data)
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null
    }
  }

  return { success: true, message: null, errors: null }
}

export async function handleResetPassword(
  data: FormData,
  reset: (variables: ResetPasswordSchema) => Promise<void>
) {
  const result = resetPasswordSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email } = result.data

  try {
    console.log(result.data)
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null
    }
  }

  return { success: true, message: null, errors: null }
}