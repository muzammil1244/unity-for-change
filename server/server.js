import express from "express"
import dotenv from "dotenv"
import  authroutes  from "./routes/authroutes.js"
import { DBconnection } from "./db/DB.js"
import Adminroutes from "./routes/Adminroutes.js"
import clientroutes from "./routes/clientroutes.js"
import followers from "./routes/followers.js"
import API_AI from "./routes/API_AI.js"
import cors from "cors"
import path from "path";
import { Server } from "socket.io";
import http from "http"
import {Message} from "./module/chat.js"

import { fileURLToPath } from "url";
import { ProfileData } from "./module/Profile.js"
import chat_routes from "./routes/chat_routes.js"
import { sendMessage } from "./controller/chat_controller.js"
dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000


app.use(cors({
  origin:"https://unity-for-change-client.onrender.com"
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// uploads folder ko public bana do
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

DBconnection(process.env.MONGO_DB)

app.use("/api/chat", chat_routes);

// global chat 
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

let onlineUsers = {}; // store socket.id -> user_id

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);
//set user detail 
    socket.on("userOnline", async (user_id) => {
    try {
      const userData = await ProfileData.findById(user_id).select("username profileimage email");

      if (!userData) {
        console.log("User not found:", user_id);
        return;
      }

      onlineUsers[socket.id] = {
        user_id,
        username: userData.username,
        profileImage: userData.profileimage,
        email: userData.email,
      };

      io.emit("userlist", Object.values(onlineUsers));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  });


 socket.on("senderMessage", async (data) => {
  await sendMessage(io,data)
});







  socket.on("disconnect", () => {
    delete onlineUsers[socket.id];

    io.emit("userlist", Object.values(onlineUsers)); // sabko update bhejo
  });
});


// middleware 

app.use(express.json())
app.use(express.urlencoded({ extended: true })); // for form submissions

//db connections 


// controllers of auth

app.use("/auth",authroutes)
app.use("/api",Adminroutes)
app.use("/api",clientroutes)
app.use("/api",followers)
app.use("/api",API_AI)

server.listen(PORT,()=>console.log("server started at",PORT))