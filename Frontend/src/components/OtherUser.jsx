import React from "react";
import User from "./User";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const UsersList = ({ filteredUsers = [] }) => {
  useGetOtherUsers();
  const { otherUsers } = useSelector((state) => state.user);

  const usersToDisplay =
    filteredUsers && filteredUsers.length > 0 ? filteredUsers : otherUsers;

  if (!usersToDisplay || usersToDisplay.length === 0) {
    return <p className="text-gray-400 text-center mt-4">No users found</p>;
  }

  return (
    <div className="overflow-auto">
      {usersToDisplay.map((user) => (
        <User key={user._id} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
