import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login/Login.jsx'
import NewUser from './NewUser/NewUser'
import NewMedic from './NewMedic/NewMedic'
import UserPanel from './UserPanel/UserPanel'
import MedicPanel from './MedicPanel/MedicPanel'
import UserHome from './UserHome/UserHome'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//LOCALHOST
window.conexion = "https://localhost:44348/api";

//SERVIDOR
//window.conexion = "https://localhost:44348/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/NewUser",
    element: <NewUser />
  },
  {
    path:"/NewMedic",
    element: <NewMedic />
  },
  {
    path:"/UserPanel",
    element: <UserPanel />
  },
  {
    path:"/MedicPanel",
    element: <MedicPanel />
  },
  {
    path:"/UserHome",
    element: <UserHome />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
