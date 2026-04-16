import { Eye, TriangleAlert } from "lucide-react";
import {
  Table,
  TableBody, TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export function UpcomingDueDates() {
  return (
    <div className="w-full bg-zinc-900 rounded-md flex flex-col p-4">
      <div className="space-x-4 flex items-center border-b border-zinc-800 pb-2.5">
        <TriangleAlert className="size-6 text-zinc-300" />
        <h1 className="text-sm font-semibold">Próximos vencimentos</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800 hover:bg-transparent">
            <TableHead className="text-zinc-400 font-medium">Empresa</TableHead>
            <TableHead className="text-zinc-400 font-medium">Referência</TableHead>
            <TableHead className="text-zinc-400 font-medium">Vencimento</TableHead>
            <TableHead className="text-zinc-400 font-medium">Prioridade</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, i) => (
            <TableRow key={i} className="border-zinc-800 hover:bg-zinc-900/40 transition-all group">
              <TableCell>Universidade Tiradentes</TableCell>
              <TableCell>Entrega de balanço</TableCell>
              <TableCell>Em 3 dias</TableCell>
              <TableCell>
                <div
                  className="bg-sky-200 border border-sky-800 px-3 py-1.5 text-sky-800 rounded font-semibold text-[10px] max-w-12.5"
                >
                  Baixa
                </div>
              </TableCell>
              <TableCell>
                <button className="border border-zinc-800 p-1.5 rounded-md cursor-pointer">
                  <Eye className="size-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}