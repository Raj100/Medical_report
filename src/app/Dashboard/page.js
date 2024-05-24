"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import IconSideMenu from "@/components/IconSideMenu/IconSideMenu";
import BottomBar from "@/components/BottomBar/BottomBar";
import axios from "axios";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/uploadFile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <main className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <div className={`text-center text-white pt-20 pb-4 bg-black text-2xl flex grow`}>
        <div className="hidden lg:block z-10 px-2" onClick={() => setOpen(!open)}>
          <i className={`px-4 cursor-pointer fa-solid ${open ? "fa-arrow-left fixed" : "fa-bars"}`}></i>
        </div>
        <h1 className="grow font-jacquard">Upload/record your voice</h1>
      </div>
      <IconSideMenu isOpen={open} />
      <div className={`${open && "ml-20"} bg-black flex flex-wrap h-full gap-8 p-4 lg:p-8 items-center justify-center`}>
        <div className="grow flex"></div>
        <div className="w-full flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-cyan-500 flex items-center justify-center text-xl text-white hover:border-2 hover:shadow-[0_0px_10px_2px_#06b6d4] transform hover:scale-[1.1]">
            <i className={`fa-solid ${false ? "fa-microphone" : "fa-microphone-slash"}`}></i>
          </div>
          <h1 className="text-white px-2">or</h1>
          <input className="text-white" type="file" accept="audio/*" onChange={handleChange} />
          <button className="p-4 bg-blue-500 txt-white rounded-3xl"  onClick={handleUpload}>Upload</button>
        </div>
      </div>
      <BottomBar />
    </main>
  );
};

export default Page;
