import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const SingleMessage = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isSender = authUser?._id === message?.senderId;

  return (
    <div
      ref={scroll}
      className="flex flex-col px-4 py-2 overflow-y-auto h-full"
    >
      <div className={`chat ${isSender ? "chat-end" : "chat-start"} !m-0`}>
        {/* Profile Image */}
        <div className="chat-image avatar">
          <div className="w-9 rounded-full">
            <img
              alt="User avatar"
              src={
                isSender ? authUser?.profilePhoto : selectedUser?.profilePhoto
              }
            />
          </div>
        </div>

        {/* Message Header */}
        <div className="chat-header text-gray-300 mb-1">
          <time className="text-xs opacity-50 ml-2 text-white/70">12:45</time>
        </div>

        {/* Chat Bubble */}
        <div
          className={`chat-bubble backdrop-blur-md border border-white/10 ${
            isSender ? "bg-blue-500/80 text-white" : "bg-white/20 text-white"
          }`}
        >
          {message?.message}
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
