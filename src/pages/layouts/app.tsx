import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Navigate, Outlet } from "react-router-dom"

import cookie from 'js-cookie'

export function AppLayout() {
  const token = cookie.get('@token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="w-full h-screen overflow-hidden grid grid-cols-[224px_1fr]">

      <Sidebar />

      <div className="w-full h-full flex flex-col overflow-hidden">

        <Header />

        <main className="flex-1 overflow-y-auto mb-4">
          <Outlet />
        </main>

      </div>

    </div>
  )
}