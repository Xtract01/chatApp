import React from "react";
import { ImSearch } from "react-icons/im";
import OtherUser from "./OtherUser";
const Sidebar = () => {
  return (
    <div className="w-72 h-full bg-white/10 backdrop-blur-lg border-r border-white/20 p-4 flex flex-col shadow-lg">
      {/* Search Bar */}
      <form className="flex items-center gap-2 mb-6">
        <input
          className="flex-1 p-2 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-white/30"
          type="text"
          placeholder="Search user"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition duration-200"
        >
          <ImSearch className="text-white" />
        </button>
      </form>
      <div className="divider"></div>
      <OtherUser />
      <div className="mt-auto">
        <button className="flex items-center justify-center w-full py-1.5 px-3 rounded-md bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-colors duration-200">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
