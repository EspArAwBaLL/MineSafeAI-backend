// import express from "express"
// import socketRoute from './routes/socketroutes.js'
// const app=express()
// const PORT=3000
// app.use('/API/data',socketRoute)
// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });

//import express from "express";
//import http from "http";
//import { Server } from "socket.io";
//import { socketController } from "./controllers/socketcontroller.js";

//const app = express();
//const server = http.createServer(app);

//const io = new Server(server, {
//  cors: { origin: "*" },
//});

// Attach controller
//socketController(io);

//server.listen(5000, () => console.log("✅ Server running on port 5000"));
// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// ---------------- Socket.IO ----------------
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins, change for production if needed
    methods: ["GET", "POST"]
  }
});

// Middleware to parse JSON POST data
app.use(express.json());

// ---------------- HTTP POST endpoint for ESP32 ----------------
app.post("/data", (req, res) => {
  const sensorData = req.body;
  console.log("📊 Sensor Data Received:", sensorData);

  // Broadcast to all connected clients
  io.emit("updateData", sensorData);

  res.send("OK");
});

// ---------------- Socket.IO connection ----------------
io.on("connection", (socket) => {
  console.log("📡 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("📴 Client disconnected:", socket.id);
  });
});

// ---------------- Start Server ----------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
