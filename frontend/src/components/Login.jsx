import React, { useState } from 'react'
import Signup from './Signup'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const login = () => {

  const navigate = useNavigate();

  const [user, SetUser] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetUser({
      ...user,
      [name]: value
    })
  }

  const loginfun = () => {
  axios.post("http://localhost:5000/Login", user)
    .then((res) => {
      if (res.data.user === null) {
        alert(res.data.message);
        navigate('/Signup');
      } else {
        if (res.data.user.password !== user.password) {
          alert(res.data.message);
        } else {
          alert(res.data.message);
          localStorage.setItem('token', res.data.user._id);
          localStorage.setItem('isLoggedin', true);
          navigate('/Home');
          console.log(localStorage.isLoggedin);
        }
      }
    })
    .catch(error => {
      // Handle error
      console.error('Axios request failed:', error);
      alert('Failed to connect to the server. Please try again later.');
    });
}


  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={(event) => { event.preventDefault(); }}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" autoComplete="email" value={user.email} onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" autoComplete="current-password" value={user.password} onChange={handleChange} required className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit" onClick={loginfun} className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link to="/Signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">SignUp here</Link>
        </p>
      </div>
    </div>

  )
}

export default login
