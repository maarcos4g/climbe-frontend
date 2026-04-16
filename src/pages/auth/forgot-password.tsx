import { Input } from "@/components/input";
import { useFormState } from "@/hooks/use-form-state";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { handleResetPassword } from "./actions";

export function ForgotPassword() {

  const [{ errors }, handleSubmit, isPending] = useFormState(
    (data) => handleResetPassword(data, async (data) => console.log(data))
  )

  return (
    <div
      className="w-full h-full px-40 flex flex-col justify-center items-center gap-4"
    >
      <form className="w-full flex flex-col items-center justify-center gap-4 max-w-79" onSubmit={handleSubmit}>
        <h1 className="font-bold text-lg">Recuperar senha</h1>
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

        <button
          type="submit"
          className="w-full bg-[#79C6C0]/30 flex py-2 items-center justify-center gap-3 rounded-md text-sm font-bold cursor-pointer hover:bg-[#79C6C0]/20 transition-all"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Solicitar e-mail
              <ArrowRight className="text-zinc-100 size-4" />
            </>
          )}
        </button>

        <Link to='/login' className="underline text-xs font-medium">Voltar para o login</Link>
        <div className="w-full flex justify-end">
        </div>

      </form>
    </div>
  )
}