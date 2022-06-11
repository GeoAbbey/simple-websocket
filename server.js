const express = require("express")
const http = require("http")
const socketio = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Runs when client connects
io.on("connection", socket => {
  console.log("New websocket connection...")

  // Welcomes current user
  socket.emit("message", "Welcome to chat app")

  // Broadcasts when a user connects
  socket.broadcast.emit("message", "A user has joined the chat")

  // Runs when client disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat")
  })
})

app.get("/", (req, res) => {
  res.json({ message: "Hello! Welcome to chat app" });
});

const PORT = process.env.PORT || 8000

function closeGracefully(signal) {
  console.log(`Received signal to terminate: ${signal}`);

  server.close(() => {
    // await db.close()
    console.log('Http server closed.');
    process.exit(0);
  });
}

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
process.on('SIGINT', closeGracefully);
process.on('SIGTERM', closeGracefully);