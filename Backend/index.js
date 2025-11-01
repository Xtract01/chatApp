import express from "express";
import dotenv from "dotenv";
import http from "http";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { initializeSocket } from "./socket/socket.js"; // ✅ Import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Create HTTP server
const server = http.createServer(app);

// ✅ Initialize Socket.IO
initializeSocket(server);

// Start server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
