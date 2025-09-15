export const socketController = (io) => {
  io.on("connection", (socket) => {
    console.log("📡 Client connected");

    // Handle seismic data
    socket.on("seismicData", (data) => {
      console.log("📊 Seismic Data Received:", data);
      io.emit("seismicData", data); // broadcast to all
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("📴 Client disconnected");
    });
  });
};