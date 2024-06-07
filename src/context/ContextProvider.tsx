import { useState,useEffect} from 'react'
import { UserContext} from './UserContext'
import axios from 'axios';

export default function ContextProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [isLogged, setisLogged] = useState(false)
  useEffect(() => {
    axios.get('http://localhost:4000/user/userInfo',{withCredentials:true})
      .then(response => {
        if(response.data.success) setisLogged(true);
      })
      .catch(error => {
        setisLogged(false)
      });
  }, []);
  return (
    <UserContext.Provider value={{ isLogged, setisLogged}}>
      {children}
    </UserContext.Provider>
  )
}
