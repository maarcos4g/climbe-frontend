import { CardInfo } from "@/components/card-info";
import { LastContracts } from "@/components/last-contracts-table";
import { Calendar } from "@/components/ui/calendar";
import { UpcomingDueDates } from "@/components/upcoming-due-dates-table";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

export function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined)

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  return (
    <main className="w-full h-full px-6 py-6 space-y-6 flex flex-1 flex-col">
      <h1 className="font-bold text-xl">Bem vindo (a) de volta, Usuário</h1>

      <div className="w-full flex gap-5">
        <CardInfo
          title="Propostas pendentes"
          value="3 propostas"
          description="nos últimos 30 dias"
        />

        <CardInfo
          title="Contratos ativos"
          value="10 contratos"
          description="nos últimos 30 dias"
        />

        <CardInfo
          title="Documentos para validação"
          value="5 restantes"
          description="de 3 empresas diferentes"
        />

        <CardInfo
          title="Reuniões da semana"
          value="13 reuniões"
          description="nos próxios 5 dias"
        />
      </div>

      <div className="flex gap-4">
        <div className="max-w-83.5 w-full">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            fixedWeeks
            className="w-full p-0 bg-zinc-900 border-none"
            timeZone={timeZone}
          />

          <div className="w-full flex flex-col bg-zinc-900 p-3 gap-3 border-t border-zinc-800">
            <h1 className="font-semibold text-sm text-zinc-200">Agenda do dia</h1>
            <div
              className="space-y-2"
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full flex items-center gap-4 pb-2 border-b border-zinc-700"
                >
                  <div className="bg-zinc-800 p-1.5 rounded-full">
                    <Phone className="size-4" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-zinc-100">Reunião de Alinhamento Estratégico</span>
                    <p className="text-xs font-regular text-zinc-500">09:00 AM - 09:45 AM</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="w-full flex flex-col justify-between gap-2.5"
        >
          <LastContracts />
          <UpcomingDueDates />
        </div>
      </div>
    </main>
  )
}