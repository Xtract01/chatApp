import React from "react";
import SingleMessage from "./SingleMessage";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";

const Messages = () => {
  useGetMessages();
  const { messages } = useSelector((state) => state.message);

  return (
    <div>
      {messages?.map((message) => (
        <SingleMessage key={message._id} message={message} />
      ))}
    </div>
  );
};

export default Messages;
