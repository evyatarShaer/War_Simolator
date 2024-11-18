import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectToDatabase } from "./service/database";
import authRouter from "./routes/authRoute";
import userRouter from "./routes/userRoute";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.PORT || 3000;

connectToDatabase();

app.use("/auth", authRouter);
app.use("/api", userRouter);

// socket
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("chat message", (message: string) => {
    console.log("Message received:", message);
    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
