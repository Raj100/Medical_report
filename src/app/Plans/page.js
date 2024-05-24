"use client";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import Bottombar from "@/components/BottomBar/BottomBar";

const page = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar></Navbar>
        <div className="grid grid-cols-1 w-full h-full  lg:grid-cols-3 my-auto">
          <div className="border rounded-lg max-w-md p-10 m-4 text-white bg-bgdark">
            <h1 className="text-center ">Free</h1>
            <p className="mt-32 flex justify-between">
              <i className="fa-solid fa-check"></i>
              300 Free chats
            </p>
            <p className="mt-5 flex justify-between">
              <i className="fa-solid fa-check"></i>
              Access to prebuild bots
            </p>
            <p className="mt-5 flex justify-between">
              <i className="fa-solid fa-check"></i>
              Access to prebuild bots
            </p>
            <Link href="payment">
              <button className="mt-5 px-10 py-5 bg-blue-500 rounded-lg w-full">
                Start using
              </button>
            </Link>
          </div>
          <div className="border rounded-lg max-w-md p-10 m-4 text-white bg-bgdark">
            <h1 className="text-center ">Standard</h1>
            <p className="mt-32 flex justify-between">
              <i className="fa-solid fa-check"></i>
              300 Free chats
            </p>
            <p className="mt-5 flex justify-between">
              <i className="fa-solid fa-check"></i>
              Access to prebuild bots
            </p>
            <p className="mt-5 flex justify-between">
              <i className="fa-solid fa-check"></i>
              Access to prebuild bots
            </p>
            <Link href="payment">
              <button className="mt-5 px-10 py-5 bg-blue-500 rounded-lg w-full">
                Start using
              </button>
            </Link>
          </div>
          <div className="border rounded-lg max-w-md p-10 m-4  text-white bg-bgdark">
            <h1 className="text-center ">Premium</h1>
            <p className="mt-32 flex justify-between">
              <i className="fa-solid fa-check"></i>
              300 Free chats
            </p>
            <p className="mt-5 flex justify-between">
              <i className="fa-solid fa-check"></i>
              Access to prebuild bots
            </p>
            <p className="mt-5 flex justify-between">
              <i className="fa-solid fa-check"></i>
              Access to prebuild bots
            </p>

            <Link href="payment">
              <button className="mt-5 px-10 py-5 bg-blue-500 rounded-lg w-full">
                Start using
              </button>
            </Link>
          </div>
        </div>
        <Bottombar></Bottombar>
      <Footer></Footer>
    </div>
  );
};

export default page;
