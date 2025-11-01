import { Server } from "socket.io";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  const userSocketMap = {};
  io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  console.log("✅ Socket.IO initialized");
};
