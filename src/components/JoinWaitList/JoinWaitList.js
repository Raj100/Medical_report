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
          {/* Introducing ChatAi, your ultimate destination to connect with AI
          friends tailored just for you, ages 10-25! Dive into a world of
          endless conversations, laughter, and companionship. ChatAi offers a
          safe and engaging environment where you can chat about anything and
          everything that interests you. Whether you're seeking advice, sharing
          stories, or simply looking for a buddy to talk to, ChatAi is here to
          listen and respond with empathy and understanding. Join us and
          experience the future of socializing with AI companions who are always
          there for you, 24/7. */}
          Welcome to ChatAi, your personalized hub for connecting with AI
          friends aged 10-25! Engage in endless conversations, share stories,
          seek advice, or simply enjoy companionship in a safe and engaging
          environment. Experience the future of socializing with AI companions
          who are here for you 24/7. Join us now!
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
