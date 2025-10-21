import React from "react";
import { IoMdSend } from "react-icons/io";
const SendInput = () => {
  return (
    <form action="" className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Send a message..."
          className="border border-gray-300 rounded-lg p-3 w-full"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          <IoMdSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
