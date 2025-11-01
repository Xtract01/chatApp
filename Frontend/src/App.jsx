import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useSelector, useDispatch } from "react-redux";
import { setSocket } from "./redux/socketSlice";
import io from "socket.io-client";
import { setOnlineUsers } from "./redux/userSlics";
const ProtectedRoute = ({ children }) => {
  const { authUser } = useSelector((state) => state.user);

  if (!authUser) {
    window.location.href = "/login";
    return null;
  }

  return children;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Homepage />
      </ProtectedRoute>
    ),
  },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

const App = () => {
  const { authUser } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8080", {
        query: { userId: authUser._id },
      });
      dispatch(setSocket(socket));
      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  return (
    <div className="p-4 h-screen items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
