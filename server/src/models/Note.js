const { Schema, model } = require("mongoose");

const NoteSchema = new Schema({
    content: { type: String, required: true },
    author: { type: String, required: true },
    done: { type: Boolean, required: false, default: false },
}, {
    timestamps: true
});

module.exports = model("Note", NoteSchema);