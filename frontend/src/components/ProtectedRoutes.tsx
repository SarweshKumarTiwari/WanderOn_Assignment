import {useContext} from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export default function ProtectedRouted() {
  const {isLogged}=useContext(UserContext)
  if (!isLogged) {
    return <Navigate to="/login" replace/>
  }
  return <Outlet/>
}
