"use client";
import React from "react";
import { useState } from "react";

const ChatBot = () => {
  let [chat, setChat] = useState(false);
  let [chatInput, setChatInput] = useState("");
  let [chats, setChats] = useState([]);
  const handlesent = (e) => {
    e.preventDefault();
    setChats([...chats, chatInput]);
    setChatInput("");
  };
  return (
    <>
      {chat ? (
        <div className="fixed bottom-4 right-4 w-72 p-4 h-96 max-h-full bg-black flex flex-col">
          <div className="flex justify-between text-white">
            <h1>Chatbot</h1>
            <i
              onClick={() => {
                setChat(!chat);
              }}
              className="fa-solid fa-xmark p-1"
            ></i>
          </div>

          <div className="flex flex-col justify-between h-full">
            <div>
              {/* past chats */}
              <div className="flex space-x-1 items-center my-1 text-white">
                <div className="w-8 h-8 bg-white rounded-full shrink-0"></div>
                <p>Hi, How can I help you?</p>
              </div>
              {chats.map((chat) => {
                return (
                  <div className="flex space-x-1 items-center my-1 text-white">
                    <div className="w-8 h-8 bg-white rounded-full shrink-0"></div>
                    <p>{chat}</p>
                  </div>
                );
              })}
            </div>

            <div>
              {/* new chat */}
              <form action="" className="flex space-x-2">
              <input onChange={(e)=>{setChatInput(e.target.value);}} value={chatInput} className="p-2 rounded-lg" type="text" name="" id="" placeholder="Enter Prompt here..." />
              <button onClick={(e)=>{handlesent(e);}} className="bg-blue-500 p-2 rounded-lg" type="Submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            setChat(!chat);
          }}
          className="pointer-cursor w-12 h-12 bg-white fixed bottom-4 right-4 rounded-full flex justify-center items-center text-2xl"
        >
          <i className="fa-regular fa-comment-dots"></i>
        </div>
      )}
    </>
  );
};

export default ChatBot;
