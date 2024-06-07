import React, { useContext, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [strong, setstrong] = useState(false)
  const [error, setError] = useState('');
  const [showPassword, setshowPassword] = useState(false)
  const navigate=useNavigate();
  const {setisLogged}=useContext(UserContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (e.target.name === "password") {
      setstrong(regularExpression.test(e.target.value))
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/user/register', {
        username,
        email,
        password
      }, {
        withCredentials: true
      });
      setisLogged(true);
      navigate('/dashboard')
      console.log('Registration successful', response.data);
    } catch (error) {
      if (error instanceof AxiosError)
        setError(error.response?.data.error)
      else
        setError('Registration failed');
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full h-fit max-w-md p-6 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        {error && <div className="text-red-500">{error}</div>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="w-full flex space-x-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button onClick={() => setshowPassword(!showPassword)} type='button' className={`p-2 border border-gray-200 ${showPassword ? "bg-gray-200" : "bg-gray-50"}  shadow-md`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-6 h-6">
                  <path d="M32 12C16 12 4 32 4 32s12 20 28 20 28-20 28-20S48 12 32 12z" fill="none" stroke="black" strokeWidth="2" />
                  <circle cx="32" cy="32" r="8" fill="black" />
                </svg>
              </button>
            </div>
          </div>
          {strong?null:<p className="text-[12px] px-2">Password shoud contain at least one capital letter,one small letter,one special character and one digit and password length should be at least 6 characters</p>}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <p className={`block text-md font-bold ${strong ? "text-green-400" : "text-red-400"}`}>{strong ? "password strong" : "password weak"}</p>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white  bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;