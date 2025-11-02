import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import OtherUser from "./OtherUser";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlics";
const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { otherUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `https://chatapp-ab62.onrender.com/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.msg);

      setTimeout(() => {
        dispatch(setAuthUser(null));
        navigate("/login");
      }, 500);
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout Error:", err);
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    const conversationUser = otherUsers?.find((user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      setFilteredUsers([conversationUser]);
    } else {
      setFilteredUsers([]);
      toast.error("User not found");
    }
  };
  return (
    <div className="w-72 h-full bg-white/10 backdrop-blur-lg border-r border-white/20 p-4 flex flex-col shadow-lg">
      {/* Search Bar */}
      <form
        onSubmit={searchSubmitHandler}
        className="flex items-center gap-2 mb-6"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
      <OtherUser filteredUsers={filteredUsers} />
      <div className="mt-auto">
        <button
          onClick={logoutHandler}
          className="flex items-center justify-center w-full py-1.5 px-3 rounded-md bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
