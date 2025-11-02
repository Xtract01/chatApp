import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";
const useGetRealTimeMessage = () => {
  const { socket } = useSelector((state) => state.socket);
  const { messages } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });
  }, [socket, setMessages, messages]);
};
export default useGetRealTimeMessage;
