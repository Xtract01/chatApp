import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

const Homepage = () => {
  return (
    <div className="flex items-center justify-center h-screen  bg-cover bg-center">
      <div className="flex sm:h-[450px] md:h-[550px] rounded-xl overflow-hidden bg-white/10 backdrop-blur-2xl border border-white/30 shadow-2xl w-[90%] md:w-[70%] lg:w-[60%]">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Homepage;
