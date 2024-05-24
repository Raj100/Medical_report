'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../lib/features/auth/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '../supabase';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import RotatingImages from '@/components/RotatingImages/RotatingImages';
import Bottombar from '@/components/BottomBar/BottomBar';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (error) {
        throw error;
      }
      // Dispatch action to update user state in Redux store
      dispatch(loginUser(data));
      console.log('User email:', data.user.email);
      console.log('User logged in:', data);
      // Show success toast
      toast.success('Login successful!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error('Login error:', error.message);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-bgdark bg-black'>
        <Navbar/>

    <div className="grid grid-cols-1 lg:grid-cols-2 grow h-full content-center py-12 px-4 sm:px-6 lg:px-8 mt-12 sm gap-32">
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-gray-50 border rounded-lg py-10 px-4 content-center w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      </div>

      <RotatingImages></RotatingImages>
      <ToastContainer />
      <Bottombar></Bottombar>
    </div>
    {/* <Footer></Footer> */}
    </div>
  );
}
