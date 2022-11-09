const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const socketio = require("socket.io");
const sockets = require("./sockets");

//Settings
app.set("port", process.env.PORT || 4000);

const io = socketio(server, {
    cors: true,
    origins: ["localhost:3000"]
});
sockets(io)

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/notes", require("./routes/notes"));
app.use("/api/users", require("./routes/users"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/notepad", require("./routes/notepad"));


module.exports = { server, app };