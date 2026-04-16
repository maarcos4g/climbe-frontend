import { cn } from "@/lib/utils"
import type { InputHTMLAttributes, ReactNode } from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

export function Input({
  className, type, iconLeft, iconRight, ...props
}: InputProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-full items-center gap-2 rounded-md border border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-100 transition-colors",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-zinc-800 focus-within:ring-offset-2 focus-within:ring-offset-zinc-950",
        className
      )}
    >
      {iconLeft && (
        <div className="flex items-center justify-center text-zinc-500">
          {iconLeft}
        </div>
      )}
      
      <input
        type={type}
        className="flex-1 bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-zinc-500 placeholder:text-xs"
        {...props} 
      />
      
      {iconRight && (
        <div className="flex items-center justify-center text-zinc-500">
          {iconRight}
        </div>
      )}
    </div>
  )
}