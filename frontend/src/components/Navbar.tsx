import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isLogged,setisLogged } = useContext(UserContext)
  const navigate=useNavigate();
  const logoutUser= ()=>{
    axios.get('http://localhost:4000/user/logout',{withCredentials:true})
       .then(response => {
         if(response.data.success){ 
          setisLogged(false);
          navigate('/login')
        };
       })
       .catch(error => {
        console.error('There was an error fetching the data!', error);
       });
  }
  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex space-x-4">
          {!isLogged&&<>
            <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:text-white hover:bg-gray-700">
              Login
            </Link>
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium  hover:text-white hover:bg-gray-700">
              Sign Up
            </Link>
          </>}
          {isLogged&&<button onClick={logoutUser} className="px-3 py-2 rounded-md text-sm font-medium hover:text-white hover:bg-gray-700">
            Logout
          </button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
