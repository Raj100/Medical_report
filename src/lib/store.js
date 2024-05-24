'use client';
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import authReducer from './features/auth/authSlice'
import profileReducer from './features/profile/profileSlice'


export const makeStore = () => {
  return configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        profile: profileReducer,
    }
  })
}