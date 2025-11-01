import React from "react";
import Avatar from "boring-avatars";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlics";

const User = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((state) => state.user);

  // ✅ Fix: Handle null/undefined onlineUsers
  const isOnline =
    onlineUsers && Array.isArray(onlineUsers) && onlineUsers.includes(user._id);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div className="p-4">
      <div
        onClick={() => selectedUserHandler(user)}
        className={`${
          selectedUser?._id === user._id ? "bg-gray-100 text-gray-900" : ""
        } flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-colors duration-200`}
      >
        <div className="relative w-12 h-12 flex-shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden">
            {user.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt={user.fullname}
                className="w-full h-full object-cover"
              />
            ) : (
              <Avatar
                size={48}
                name={user.fullname}
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            )}
          </div>

          {isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
          )}
        </div>
        <div>
          <p className="font-semibold">{user.fullname}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
