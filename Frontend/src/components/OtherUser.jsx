import React from "react";
import Avatar from "boring-avatars";
import User from "./User";

const UsersList = () => {
  return (
    <div className="overflow-auto">
      <User />
      <User />
      <User />
      <User />
      <User />
    </div>
  );
};

export default UsersList;
