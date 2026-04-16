import { Link, ReceiptText } from "lucide-react";
import {
  Table,
  TableBody, TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

export function LastContracts() {
  return (
    <div className="w-full bg-zinc-900 rounded-md flex flex-col p-4">
      <div className="space-x-4 flex items-center border-b border-zinc-800 pb-2.5">
        <ReceiptText className="size-6 text-zinc-300" />
        <h1 className="text-sm font-semibold">Últimos contratos gerados</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800 hover:bg-transparent">
            <TableHead className="text-zinc-400 font-medium">Empresa</TableHead>
            <TableHead className="text-zinc-400 font-medium">Serviço</TableHead>
            <TableHead className="text-zinc-400 font-medium">Início do contrato</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, i) => (
            <TableRow key={i} className="border-zinc-800 hover:bg-zinc-900/40 transition-all group">
              <TableCell>Universidade Tiradentes</TableCell>
              <TableCell>BPO Financeiro</TableCell>
              <TableCell>08/03/2026 - 08:32h</TableCell>
              <TableCell>
                <button className="border border-zinc-800 p-1.5 rounded-md cursor-pointer">
                  <Link className="size-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}