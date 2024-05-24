"use client";

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    name: '',
    gender: '',
    age: 0,
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    updateProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
});

export const { setProfile, updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
