import React from "react";
import Avatar from "boring-avatars";

const User = () => {
  const user = { name: "Oliver Twist", isOnline: true };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-colors duration-200">
        <div className="relative w-12 h-12">
          <Avatar
            size={48}
            name={user.name}
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
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
  );
};

export default User;
