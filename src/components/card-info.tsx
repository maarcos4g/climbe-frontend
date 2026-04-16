import { CircleAlert, MoreVertical } from "lucide-react";

type CardInfoProps = {
  title: string
  value: string
  description: string
}

export function CardInfo({ title, value, description }: CardInfoProps) {
  return (
    <div
      className="w-full bg-zinc-950 flex flex-col p-2 gap-2.5 rounded-[6px] border border-zinc-500"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CircleAlert className="size-4 stroke-1 text-zinc-100" />
          <span className="text-sm font-semibold">{title}</span>
        </div>

        <button>
          <MoreVertical className="size-4 text-zinc-100" />
        </button>
      </div>
      <div className="bg-zinc-900 flex flex-col px-2 py-6 gap-2.5 rounded">
        <span className="text-lg font-semibold text-center mt-1.5">{value}</span>
        <p className="text-xs text-end text-zinc-500">{description}</p>
      </div>
    </div>
  )
}