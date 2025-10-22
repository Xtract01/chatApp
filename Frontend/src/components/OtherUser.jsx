import React from "react";
import Avatar from "boring-avatars";
import User from "./User";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";
const UsersList = () => {
  useGetOtherUsers();
  const { otherUsers } = useSelector((state) => state.user);
  if (!otherUsers || otherUsers.length === 0) {
    return;
  }
  return (
    <div className="overflow-auto">
      {otherUsers.map((user) => {
        return <User key={user._id} user={user} />;
      })}
    </div>
  );
};

export default UsersList;
