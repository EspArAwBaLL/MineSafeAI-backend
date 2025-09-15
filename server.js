// import express from "express"
// import socketRoute from './routes/socketroutes.js'
// const app=express()
// const PORT=3000
// app.use('/API/data',socketRoute)
// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });

import express from "express";
import http from "http";
import { Server } from "socket.io";
import { socketController } from "./controllers/socketcontroller.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

// Attach controller
socketController(io);

server.listen(5000, () => console.log("✅ Server running on port 5000"));