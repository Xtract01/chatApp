import express from "express";
import dotenv from "dotenv";
import http from "http";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { initializeSocket } from "./socket/socket.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- Middleware ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://chatapp-ab62.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));

// ---------- API Routes FIRST ----------
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// ---------- Static Frontend ----------
const frontendPath = path.join(__dirname, "../Frontend/dist");
app.use(express.static(frontendPath));

// ✅ Catch-all for SPA - Use middleware instead of app.get("*")
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ---------- HTTP + Socket Server ----------
const server = http.createServer(app);
initializeSocket(server);

// ---------- Connect DB + Start Server ----------
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  });
