"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import IconSideMenu from "@/components/IconSideMenu/IconSideMenu";
import BottomBar from "@/components/BottomBar/BottomBar";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MedicalReportModal from "@/components/MedicalReportModal";
import AudioUpload from "@/components/AudioUpload";
import AudioRecorder from "@/components/AudioRecorder";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [record, setRecord] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [extractedInfo, setExtractedInfo] = useState({});
  const [transcript, setTranscript] = useState("");

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const loadingToastId = toast.loading("Uploading and Processing file...", {
      position: "top-right",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.update(loadingToastId, {
        render: "File uploaded successfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });

      console.log('File uploaded successfully:', response.data);
      setExtractedInfo(response.data.extracted_info);
      setTranscript(response.data.transcript);
      setModalIsOpen(true);
    } catch (error) {
      toast.update(loadingToastId, {
        render: `Error uploading file: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      console.error(error);
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
        <div className="w-full flex items-center justify-center pb-10">
          <div
            onClick={() => { setRecord(!record); }}
            className="w-16 h-16 rounded-full border-2 border-cyan-500 flex items-center justify-center text-xl text-white hover:border-2 hover:shadow-[0_0px_10px_2px_#06b6d4] transform hover:scale-[1.1]"
          >
            <i className={`fa-solid ${record ? "fa-microphone" : "fa-microphone-slash"}`}></i>
          </div>
          <h1 className="text-white px-2">or</h1>
          <input className="text-white" type="file" accept="audio/*" onChange={handleChange} />
          <button className="p-4 bg-blue-500 text-white rounded-3xl" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
      <ToastContainer />

      <MedicalReportModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        extractedInfo={extractedInfo}
        transcript={transcript}
      />
    </main>
  );
};

export default Page;
