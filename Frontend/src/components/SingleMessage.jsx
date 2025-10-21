import React from "react";

const SingleMessage = () => {
  return (
    <div className="flex flex-col px-4 py-2 overflow-y-auto h-full">
      {/* Message from Obi-Wan */}
      <div className="chat chat-start !m-0">
        <div className="chat-image avatar">
          <div className="w-9 rounded-full">
            <img
              alt="Obi-Wan Kenobi"
              src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
            />
          </div>
        </div>
        <div className="chat-header text-gray-300 mb-1">
          <time className="text-xs opacity-50 ml-2 text-white/70">12:45</time>
        </div>
        <div className="chat-bubble bg-white/20 text-white backdrop-blur-md border border-white/10">
          You were the Chosen One!
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
