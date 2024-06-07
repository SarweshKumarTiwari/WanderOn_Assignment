import React, { useContext, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setshowPassword] = useState(false)
  const [error, setError] = useState('');
  const { setisLogged } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email, password)
    try {
      const response = await axios.post('http://localhost:4000/user/authorise', {
        email,
        password,
      }, {
        withCredentials: true
      });
      if (response.data.success) {
        setisLogged(true);
        navigate('/dashboard')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error)
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex  justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 h-fit">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="text-red-500">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email/Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <div className="w-full flex space-x-2">
              <input
                type={showPassword?"text":"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button onClick={()=>setshowPassword(!showPassword)} type='button' className={`p-2 border border-gray-200 ${showPassword?"bg-gray-200":"bg-gray-50"}  shadow-md`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-6 h-6">
                  <path d="M32 12C16 12 4 32 4 32s12 20 28 20 28-20 28-20S48 12 32 12z" fill="none" stroke="black" strokeWidth="2" />
                  <circle cx="32" cy="32" r="8" fill="black" />
                </svg>
            </button>
          </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </button>
    </form>
      </div >
    </div >
  );
};

export default LoginPage;
