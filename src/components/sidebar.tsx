import logo from '@/assets/logo-climbe.svg'
import { Bell, Bolt, Building, CalendarCheck, FileInput, LayoutDashboard, LogOut, UsersRound } from 'lucide-react'
import { NavLink } from './nav-link'

export function Sidebar() {
  return (
    <aside
      className='h-screen max-h-screen top-0 flex flex-col py-6 border-r border-zinc-700 w-full'
    >
      <div className='flex items-center justify-between px-3 border-b border-zinc-700 pb-3'>
        <img src={logo} alt="Logo da Climbe" className='w-26 h-10' />
        <button className='cursor-pointer'>
          <Bell className='stroke-1 text-zinc-50' />
        </button>
      </div>

      <div className='flex flex-col px-3 border-b border-zinc-700 py-3 space-y-3'>
        <h3 className='text-sm font-medium text-zinc-400 uppercase'>Menu principal</h3>

        <div className='space-y-3'>
          <NavLink to='/'>
            <LayoutDashboard className='size-4 stroke-1 text-zinc-50' />
            Dashboard
          </NavLink>

          <NavLink to='/schedule'>
            <CalendarCheck className='size-4 stroke-1 text-zinc-50' />
            Agenda
          </NavLink>

          <NavLink to='/proposals'>
            <FileInput className='size-4 stroke-1 text-zinc-50' />
            Propostas comerciais
          </NavLink>

          <NavLink to='/companies'>
            <Building className='size-4 stroke-1 text-zinc-50' />
            Clientes / Empresas
          </NavLink>
        </div>
      </div>

      <div className='flex flex-col px-3 border-b border-zinc-700 py-3 space-y-3'>
        <h3 className='text-sm font-medium text-zinc-400 uppercase'>Gestão</h3>

        <div className='space-y-3'>
          <NavLink to='/team'>
            <UsersRound className='size-4 stroke-1 text-zinc-50' />
            Equipe
          </NavLink>
        </div>
      </div>

      <div className='h-full flex flex-col justify-end px-3 py-3 space-y-3'>
        <h3 className='text-sm text-zinc-400'>Conta</h3>

        <div className='space-y-3'>
          <NavLink to='/settings'>
            <Bolt className='size-4 stroke-1 text-zinc-50' />
            Configurações
          </NavLink>

          <button className='flex items-center gap-3 px-3 py-1.5 text-sm font-medium text-zinc-50 transition-all cursor-pointer'>
            <LogOut className="size-4 stroke-1 text-zinc-50" />
            Sair
          </button>
        </div>
      </div>
    </aside>
  )
}