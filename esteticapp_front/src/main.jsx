import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login/Login.jsx'
import NewUser from './NewUser/NewUser'
import NewMedic from './NewMedic/NewMedic'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

window.conexion = "https://localhost:44348/api";

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
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
