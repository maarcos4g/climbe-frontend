import { Input } from "@/components/input";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import googleLogo from '@/assets/google.svg'
import { useFormState } from "@/hooks/use-form-state";
import { handleAuthenticate } from "./actions";

export function LoginPage() {

  const [showPassword, setShowPassword] = useState(false)

  const [{ errors }, handleSubmit, isPending] = useFormState(
    (data) => handleAuthenticate(data, async (data) => console.log(data))
  )

  return (
    <div
      className="w-full h-full px-40 flex flex-col justify-center items-center gap-4"
    >
      <form className="w-full flex flex-col items-center justify-center gap-4 max-w-79" onSubmit={handleSubmit}>
        <h1 className="font-bold text-lg">Acessar sistema</h1>
        <div className="w-full flex flex-col gap-3">
          <label htmlFor="email" className="text-sm font-bold">
            Seu e-mail
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoCapitalize="none"
            autoComplete="none"
            autoCorrect="off"
            iconLeft={<Mail className="text-zinc-100 stroke-1 size-4" />}
          />

          {errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div className="w-full flex flex-col gap-3">
          <label htmlFor="password" className="text-sm font-bold">
            Sua senha
          </label>
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            iconLeft={<Lock className="text-zinc-100 stroke-1 size-4" />}
            iconRight={
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                {!showPassword ? <EyeOff className="text-zinc-100 stroke-1 size-4" /> : <Eye className="text-zinc-100 stroke-1 size-4" />}
              </button>
            }
          />

          {errors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.password[0]}
            </p>
          )}
        </div>

        <div className="w-full flex justify-end">
          <Link to='/forgot-password' className="underline text-xs font-medium">Esqueceu a senha?</Link>
        </div>

        <button
          type="submit"
          className="w-full bg-[#79C6C0]/30 flex py-2 items-center justify-center gap-3 rounded-md text-sm font-bold cursor-pointer hover:bg-[#79C6C0]/20 transition-all"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Entrar
              <ArrowRight className="text-zinc-100 size-4" />
            </>
          )}
        </button>
      </form>

      <div className="max-w-79 w-full flex items-center gap-2">
        <div className="w-full border-t border-zinc-700" />
        <p className="text-sm font-semibold">ou</p>
        <div className="w-full border-t border-zinc-700" />
      </div>

      <button className="max-w-79 w-full bg-transparent border border-zinc-600 flex items-center justify-center py-2 gap-4 rounded-md cursor-pointer text-sm font-semibold">
        <img src={googleLogo} className="size-6" />
        Continuar com Google
      </button>
    </div>
  )
}