import React from "react";
import Avatar from "boring-avatars";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedUser, onlineUsers } = useSelector((state) => state.user);
  const user = {
    name: selectedUser?.fullname,
    isOnline: onlineUsers.includes(selectedUser?._id),
  };

  if (!selectedUser)
    return (
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-white text-xl font-semibold text-center">
          Let's start a conversation
        </h1>
      </div>
    );
  return (
    <div className="md:min-w-[300px] flex-1 flex flex-col border-l border-white/30">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center gap-4 p-2 rounded-lg">
          <div className="relative w-12 h-12">
            {selectedUser?.profilePhoto ? (
              <img
                src={selectedUser.profilePhoto}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <Avatar
                size={48}
                name={user.name}
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            )}
            {user.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            )}
          </div>
          <div>
            <p className="font-semibold">{user.name}</p>
            {user.isOnline && (
              <span className="text-sm text-gray-500">Online</span>
            )}
          </div>
        </div>
      </div>

      {/* Messages should grow and fill space */}
      <div className="flex-1 overflow-auto">
        <Messages />
      </div>

      {/* Input */}
      <SendInput />
    </div>
  );
};

export default MessageContainer;
