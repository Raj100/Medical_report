import React from "react";
import Meteors from "../ui/Meteors";
const JoinWaitList = () => {
  return (
    <div className=" w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased overflow-hidden">
      <Meteors number={20}></Meteors>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to MedicalReportAssistant, your dedicated platform crafted to
          streamline medical transcription and reporting processes! Seamlessly
          transcribe doctor-patient conversations, organize vital information,
          and generate comprehensive medical reports with ease. Whether it's
          documenting appointments, compiling patient histories, or analyzing
          vital signs, MedicalReportAssistant is your trusted ally. Experience
          the efficiency of AI-powered assistance tailored for medical
          professionals. Join us now and simplify your medical documentation
          tasks!
        </p>
        <input
          type="text"
          placeholder="hi@chatai.in"
          className="p-2 rounded-lg border border-neutral-800 focus:ring-2 text-white focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
        />
      </div>
    </div>
  );
};

export default JoinWaitList;
