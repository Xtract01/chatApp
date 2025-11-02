import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser?._id) return;

      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/message/${selectedUser._id}`,
          { withCredentials: true }
        );
        dispatch(setMessages(res.data.messages));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser]);
};

export default useGetMessages;
