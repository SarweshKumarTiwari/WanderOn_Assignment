import  { useContext } from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export default function PublicAuthRoutes() {
    const {isLogged}=useContext(UserContext)
    if (isLogged) {
      return <Navigate to="/dashboard" replace/>
    }
    return <Outlet/>
}
