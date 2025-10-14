import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
const Homepage = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400/20 backdrop-blur-lg border border-white/20 shadow-lg">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Homepage;
