const Chat = require('./controllers/ChatController')
module.exports = (io) => {

    io.on('connection', socket => {
        const { id } = socket.client;
        console.log(`Connected: ${id}`);

        socket.on("join", ({ user, room }) => {
            //socket.broadcast.emit("availableStatus", { user: { user, available: true } })
            socket.join(room)
        })

        socket.on("handleRoom", ({ usersId, admin }) => {
            Chat.handleRoom({ usersId, admin }).then(room => {
                socket.emit("room", room)
            })
        })

        socket.on("getHistoryMessages", (room) => {
            Chat.getChatMessages(room).then((data) => {
                socket.emit("historyMessages", data)
            });
        })

        socket.on('sendMessage', (data) => {
            Chat.createChatMessage(data).then(message => {
                io.to(message.room).emit('message', message)
            })
        });

        socket.on("disconnect", (user) => {
            //socket.broadcast.emit("availableStatus", { user: { user, available: false } })
            console.log("User left")
        })
    })
}