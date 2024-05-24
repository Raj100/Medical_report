"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setProfile,
  updateProfile,
} from "../../lib/features/profile/profileSlice";
import supabase from "../supabase";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const { data: userProfile, error } = await supabase
        .from("Profiles")
        .select()
        .eq("email", user.email)
        .single();
      if (error) {
        throw error;
      }
      dispatch(setProfile(userProfile));
      if (userProfile) {
        setName(userProfile.name);
        setGender(userProfile.gender);
        setAge(userProfile.age.toString());
      }
    } catch (error) {
      console.error("Profile fetch error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = () => {
    const updatedProfile = {
      name,
      gender,
      age: parseInt(age),
    };
    dispatch(updateProfile(updatedProfile));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-black">
        <h2 className="text-white text-center">User Profile</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : profile ? (
          <div className="bg-black grow">
            <div className="p-10 m-10">
              {(user || true) && (
                <form className="bg-white px-10 py-12 rounded-md relative">
                  <label class="block">
                    <span class="block text-sm font-medium text-slate-700">
                      Username
                    </span>
                    <input
                      type="text"
                      value="somename"
                      disabled
                      class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  "
                    />
                  </label>
                  <label class="block">
                    <span class="block text-sm font-medium text-slate-700">
                      Email
                    </span>
                    <input
                      type="email"
                      value="abcd@gmail.com"
                      disabled
                      class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  "
                    />
                  </label>
                  <label class="block">
                    <span class="block text-sm font-medium text-slate-700">
                      Age
                    </span>
                    <input
                      type="number"
                      class="peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  "
                    />
                  </label>

                  <label class="block">
                    <span class="block text-sm font-medium text-slate-700">
                      gender
                    </span>
                    <input
                      type="text"
                      class=" mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  "
                    />
                  </label>
                  
                  <button class="text-white bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 px-4 py-2 rounded-3xl mt-4">
                    Save changes
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <p>No profile available.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
