import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const SingleMessage = ({ message }) => {
  const scroll = useRef();
  const { authUser } = useSelector((state) => state.user);
  const { selectedUser } = useSelector((state) => state.user);
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  console.log("authUser:", authUser);
  console.log("message:", message);
  return (
    <div
      ref={scroll}
      className="flex flex-col px-4 py-2 overflow-y-auto h-full"
    >
      {/* Message from Obi-Wan */}
      <div
        className={`chat ${
          authUser?._id === message?.senderId ? "chat-end" : "chat-start"
        } !m-0`}
      >
        <div className="chat-image avatar">
          <div className="w-9 rounded-full">
            <img
              alt="Obi-Wan Kenobi"
              src={
                message?.senderId === authUser?._id
                  ? authUser?.profilePhoto
                  : selectedUser?.profilePhoto
              }
            />
          </div>
        </div>
        <div className="chat-header text-gray-300 mb-1">
          <time className="text-xs opacity-50 ml-2 text-white/70">12:45</time>
        </div>
        <div className="chat-bubble bg-white/20 text-white backdrop-blur-md border border-white/10">
          {message?.message}
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
