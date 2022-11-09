const { Chat, Room } = require("../models/Chat");
const ChatController = {};

//testing
ChatController.getTest = async ({ res }) => {
    const chat = await Chat.find().sort();
    res.json(chat);
}

ChatController.getChatMessages = async (room) => {
    const chat = await Chat.find({ room }).sort();
    return chat;
}

ChatController.createChatMessage = async (data) => {
    const { message, userId, userName, room, gif } = data;
    const NewMessage = await new Chat({
        message, userId, userName, room, gif
    }).save();
    return NewMessage;
}

ChatController.handleRoom = async (data) => {
    const { usersId, admin } = data;
    const possibleArrays = permutator(usersId)
    for (let i = 0; i < possibleArrays.length; i++) {
        const res = await Room.findOne({ users: possibleArrays[i] })
        if (res !== null) {
            return res;
        }
        if (possibleArrays.length - 1 === i && res === null) {
            const NewRoom = await new Room({
                users: usersId, admin
            }).save();
            return NewRoom;
        }
    }
}

const permutator = (inputArr) => {
    let result = [];
    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }
    permute(inputArr)
    return result;
}

module.exports = ChatController;