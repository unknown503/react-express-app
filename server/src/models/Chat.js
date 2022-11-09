const { Schema, model } = require("mongoose");

const requiredString = { type: String, required: true };

const ChatSchema = new Schema({
    message: requiredString,
    userId: requiredString,
    userName: requiredString,
    room: requiredString,
    gif: { type: Boolean, required: true, default: false },
}, {
    timestamps: true
});

const RoomSchema = new Schema({
    users: [String],
    name: { type: String, default: null },
    admin: requiredString,
});

module.exports = {
    Chat: model("Chat", ChatSchema),
    Room: model("Room", RoomSchema),

};