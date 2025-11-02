import { Server } from "socket.io";

const userSocketMap = {};
let io;

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "https://chatapp-ab62.onrender.com"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;
      console.log(`✅ User connected: ${userId}, Socket: ${socket.id}`);
    }

    // Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      if (userId) {
        delete userSocketMap[userId];
        console.log(`❌ User disconnected: ${userId}`);
      }
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
};

export { io };
