import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/layouts/app";
import { Dashboard } from "./pages/app/dashboard";
import { LoginPage } from "./pages/auth/login";
import { Proposals } from "./pages/app/proposals";
import { Companies } from "./pages/app/companies";
import { Schedule } from "./pages/app/schedule";
import { Team } from "./pages/app/team";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/schedule',
        element: <Schedule />
      },
      {
        path: '/proposals',
        element: <Proposals />
      },
      {
        path: '/companies',
        element: <Companies />
      },
      {
        path: '/team',
        element: <Team /> // <-- Componente real renderizado aqui!
      },
      {
        path: '/settings',
        element: <h1>Configurações</h1>
      },
    ]
  },
  {
    path: '/',
    children: [
      {
        path: '/login',
        element: <LoginPage />
      }
    ]
  }
])